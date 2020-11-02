import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewCauseInput, useCauseNewMutation } from '../../generated/graphql';
import { EntityType, FormDefaultValues, FormInputType, FormPropFields, ModelType, Tag } from '../../types';
import { commonControlProps, currentFormatDate, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, getInjected, isValidEnum, isValidJsonObject, useStyles, validateRegExpArrayWithValuesArray, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	name: string,
	email: string,
	startDate: string;
	endDate: string;
	location?: string
	// input/output entity object
	inputType: EntityType;
	input: string;
	ambassadors?: string,
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	NAME = 'name',
	EMAIL = 'email',
	START_DATE = 'startDate',
	END_DATE = 'endDate',
	LOCATION = 'location',
	INPUT_TYPE = 'inputType',
	INPUT = 'input',
	AMBASSADORS = 'ambassadors',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	name: 'Save the world now 2020',
	email: 'mail@swn.com',
	ambassadors: 'PT182692125 PT582692178',
	// current plus one day/24h
	startDate: currentFormatDate(new Date(Date.now() + ((3600 * 1000 * 24) * 0)), false),
	// current plus one day/24h*7
	endDate: currentFormatDate(new Date(Date.now() + ((3600 * 1000 * 24) * 7)), false),
	location: '12.1890144,-28.5171909',
	inputType: c.VALUES.undefined,
	input: '',
	tags: [
		{ title: 'Nature', value: 'NATURE' },
		{ title: 'Economy', value: 'ECONOMY' },
	],
	metaData: '{}',
	metaDataInternal: '{}',
};

// use RouteComponentProps to get history props from Route
export const CauseUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [causeNewMutation, { loading, error: apolloError }] = useCauseNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);
	console.log(`startDate:${getValues(FormFieldNames.START_DATE)}`);
	console.log(`endDate:${new Date(getValues(FormFieldNames.END_DATE)).getTime()}`);

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newCauseData: NewCauseInput = {
				name: data.name,
				email: data.email,
				ambassadors: data.ambassadors.split(' '),
				startDate: data.startDate,
				endDate: data.endDate,
				location: data.location,
				input: {
					type: data.inputType,
					id: data.input,
				},
				tags: data.tags.map((e: Tag) => e.value),
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newCauseData, undefined, 2));
			const response = await causeNewMutation({ variables: { newCauseData: newCauseData } });

			if (response) {
				const payload = { message: getInjected(c.I18N.newModelCreatedSuccessfully, { model: ModelType.cause, id: response.data.causeNew.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.causeLabel,
			placeholder: c.I18N.causePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.alphaNumeric),
		},
		[FormFieldNames.EMAIL]: {
			inputRef: useRef(),
			type: FormInputType.EMAIL,
			name: FormFieldNames.EMAIL,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.emailLabel,
			placeholder: c.I18N.emailPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.email),
		},
		[FormFieldNames.START_DATE]: {
			inputRef: useRef(),
			type: FormInputType.DATE,
			name: FormFieldNames.START_DATE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.startDateLabel,
			placeholder: c.I18N.datePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.START_DATE, c.REGEXP.date),
		},
		[FormFieldNames.END_DATE]: {
			inputRef: useRef(),
			type: FormInputType.DATE,
			name: FormFieldNames.END_DATE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.endDateLabel,
			placeholder: c.I18N.datePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.END_DATE, c.REGEXP.date),
		},
		[FormFieldNames.LOCATION]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LOCATION,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.locationLabel,
			placeholder: c.I18N.locationPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.LOCATION, c.REGEXP.location, false),
		},
		// TODO why causes have input? it is related with BELONGS TO Person, Participant etc
		// [FormFieldNames.INPUT]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.TEXT,
		// 	name: FormFieldNames.INPUT,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.inputLabel,
		// 	placeholder: c.I18N.inputPlaceholder,
		// 	helperText: c.I18N.inputHelperText,
		// 	rules: validationRuleRegExHelper(FormFieldNames.INPUT, c.REGEXP.uuid),
		// },
		[FormFieldNames.INPUT_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.INPUT_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputTypeLabel,
			// selection don't use placeHolder
			// placeholder: c.VALUES.PHYSICAL_ASSET,
			rules: {
				validate: () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))
					? true
					: validationMessage('required', FormFieldNames.INPUT_TYPE)
			},
			disabled: false,
			options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
		},
		[FormFieldNames.INPUT]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.INPUT,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.INPUT, c.REGEXP.fiscalNumber),
			disabled: false,
			// AUTOCOMPLETE
			// options: personOptions,
			// disableCloseOnSelect: false,
		},
		[FormFieldNames.AMBASSADORS]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.AMBASSADORS,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ambassadorsLabel,
			placeholder: c.I18N.ambassadorsPlaceHolder,
			helperText: c.I18N.ambassadorsHelperText,
			rules: {
				// validate both regex uuid, fiscalNumber and mobilePhone
				validate: () => {
					const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
					return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
				}
			},
		},
		[FormFieldNames.TAGS]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.TAGS,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.tagsLabel,
			placeholder: c.I18N.tagsLabel,
			helperText: c.I18N.tagsPlaceHolder,
			rules: {
				validate: () => (getValues(FormFieldNames.TAGS) as string[]).length > 0
					? true
					: validationMessage('invalid', FormFieldNames.TAGS)
			},
			options: () => c.TAGS_OPTIONS,
			multipleOptions: true,
			addToAutocomplete: true,
		},
		[FormFieldNames.META_DATA]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.metaDataLabel,
			placeholder: c.I18N.metaDataPlaceHolder,
			rules: {
				validate: () => isValidJsonObject(getValues(FormFieldNames.META_DATA))
					? true
					: validationMessage('invalid', FormFieldNames.META_DATA)
			},
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA_INTERNAL,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.metaDataInternalLabel,
			placeholder: c.I18N.metaDataPlaceHolder,
			rules: {
				validate: () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL))
					? true
					: validationMessage('invalid', FormFieldNames.META_DATA_INTERNAL)
			},
		},
	};

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.CAUSE_UPSERT_FORM].title}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					{generateFormButtonsDiv(classes, loading, handleResetHandler)}
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
