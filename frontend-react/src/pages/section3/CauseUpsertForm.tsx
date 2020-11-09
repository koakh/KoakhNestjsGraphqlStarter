import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { commonFormFieldAmbassadors, commonFormFieldCauseName, commonFormFieldEmail, commonFormFieldEndDate, commonFormFieldInputEntity, commonFormFieldInputTypeEntity, commonFormFieldLocation, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldStartDate, commonFormFieldTags, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewCauseInput, useCauseNewMutation } from '../../generated/graphql';
import { EntityType, FormDefaultValues, FormPropFields, ModelType, Tag } from '../../types';
import { currentFormatDate, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, parseTemplate, useStyles, validateRegExpArray, validateRegExpArrayWithValuesArray } from '../../utils';

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
	metaData: '',
	metaDataInternal: '',
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
	// console.log(`startDate:${getValues(FormFieldNames.START_DATE)}`);
	// console.log(`endDate:${new Date(getValues(FormFieldNames.END_DATE)).getTime()}`);

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
				tags: data.tags ? data.tags.map((e: Tag) => e.value) : [],
				metaData: data.metaData ? JSON.parse(data.metaData) : null,
				metaDataInternal: data.metaData ? JSON.parse(data.metaDataInternal) : null,
			};
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newCauseData, undefined, 2));
			const response = await causeNewMutation({ variables: { newCauseData: newCauseData } });

			if (response) {
				const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.cause, id: response.data.causeNew.id }) };
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
			...commonFormFieldCauseName(useRef(), FormFieldNames.NAME)
		},
		[FormFieldNames.EMAIL]: {
			...commonFormFieldEmail(useRef(), FormFieldNames.EMAIL)
		},
		[FormFieldNames.START_DATE]: {
			...commonFormFieldStartDate(useRef(), FormFieldNames.START_DATE)
		},
		[FormFieldNames.END_DATE]: {
			...commonFormFieldEndDate(useRef(), FormFieldNames.END_DATE)
		},
		[FormFieldNames.LOCATION]: {
			...commonFormFieldLocation(useRef(), FormFieldNames.LOCATION)
		},
		[FormFieldNames.INPUT_TYPE]: {
			...commonFormFieldInputTypeEntity(useRef(), FormFieldNames.INPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE)))
		},
		[FormFieldNames.INPUT]: {
			...commonFormFieldInputEntity(useRef(), FormFieldNames.INPUT, () => validateRegExpArray(getValues(FormFieldNames.INPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]))
		},
		[FormFieldNames.AMBASSADORS]: {
			...commonFormFieldAmbassadors(useRef(), FormFieldNames.AMBASSADORS, () => {
				const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
				return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
			})
		},
		[FormFieldNames.TAGS]: {
			// tags required inputRef outside of function else crash with `TypeError: Cannot read property 'current' of undefined` 
			// inputRef: useRef(),
			...commonFormFieldTags(useRef(), FormFieldNames.TAGS, () => (getValues(FormFieldNames.TAGS) as string[]).length > 0),
		},
		// TODO
		// [FormFieldNames.TAGS]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.AUTOCOMPLETE,
		// 	name: FormFieldNames.TAGS,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.tagsLabel,
		// 	placeholder: c.I18N.tagsLabel,
		// 	helperText: c.I18N.tagsPlaceHolder,
		// 	rules: {
		// 		validate: () => (getValues(FormFieldNames.TAGS) as string[]).length > 0
		// 			? true
		// 			: validationMessage('invalid', FormFieldNames.TAGS)
		// 	},
		// 	options: () => c.TAGS_OPTIONS,
		// 	multipleOptions: true,
		// 	addToAutocomplete: true,
		// },
		[FormFieldNames.META_DATA]: {
			...commonFormFieldMetadata(useRef(), FormFieldNames.META_DATA, () => isValidJsonObject(getValues(FormFieldNames.META_DATA))),
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			...commonFormFieldMetadataInternal(useRef(), FormFieldNames.META_DATA_INTERNAL, () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL)))
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
