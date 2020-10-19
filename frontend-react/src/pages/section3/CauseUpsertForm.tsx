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
import { FormDefaultValues, FormInputType, FormPropFields, Tag } from '../../types';
import { commonControlProps, currentFormatedDate, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidJsonObject, useStyles, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	name: string,
	email: string,
	startDate: string;
	endDate: string;
	location?: string
	// input/output entity object
	input: string;
	ambassadors?: string[],
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
	INPUT = 'input',
	AMBASSADORS = 'ambassadors',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	name: 'Save the world now 2020',
	email: 'mail@swn.com',
	ambassadors: ['0466c748-05fd-4d46-b381-4f1bb39458c7', '108f4bb0-2918-4340-a0c8-8b5fb5af249c'],
	// current plus one day/24h
	startDate: currentFormatedDate(new Date(Date.now() + (( 3600 * 1000 * 24) * 0)), false),
	// current plus one day/24h*7
	endDate: currentFormatedDate(new Date(Date.now() + (( 3600 * 1000 * 24) * 7)), false),
	location: '12.1890144,-28.5171909',
	input: '4ea88521-031b-4279-9165-9c10e1839001',
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
	const { handleSubmit, watch, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [causeNewMutation, { loading, error: apolloError }] = useCauseNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in result state message
	const name = watch(FormFieldNames.NAME);
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
				ambassadors: data.ambassadors,
				startDate: data.startDate,
				endDate: data.endDate,
				location: data.location,
				// TODO: must get owner type on chaincode side, from uuid
				input: {
					type: 'com.chain.solidary.model.person',
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
				// TODO: finishe result message
				const payload = { message: `${c.I18N.signUpUserRegisteredSuccessfully} '${name}'` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.SIGNUP_RESULT.path });
			}
		} catch (error) {
			// don't throw here else we ctach react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.causeLabel,
			placeholder: c.I18N.causePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.alphaNumeric),
		},
		[FormFieldNames.EMAIL]: {
			inputRef: useRef(),
			type: FormInputType.EMAIL,
			name: FormFieldNames.EMAIL,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.emailLabel,
			placeholder: c.I18N.emailPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.email),
		},
		[FormFieldNames.START_DATE]: {
			inputRef: useRef(),
			type: FormInputType.DATE,
			name: FormFieldNames.START_DATE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.startDateLabel,
			placeholder: c.I18N.datePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.START_DATE, c.REGEXP.date),
		},
		[FormFieldNames.END_DATE]: {
			inputRef: useRef(),
			type: FormInputType.DATE,
			name: FormFieldNames.END_DATE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.endDateLabel,
			placeholder: c.I18N.datePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.END_DATE, c.REGEXP.date),
		},
		[FormFieldNames.LOCATION]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LOCATION,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.locationLabel,
			placeholder: c.I18N.locationPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.LOCATION, c.REGEXP.location),
		},
		[FormFieldNames.INPUT]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.INPUT,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.INPUT, c.REGEXP.uuid),
		},
		[FormFieldNames.AMBASSADORS]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.AMBASSADORS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ambassadorsLabel,
			placeholder: c.I18N.ambassadorsPlaceHolder,
			helperText: c.I18N.ambassadorsHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.AMBASSADORS, c.REGEXP.uuidArray),
		},
		[FormFieldNames.TAGS]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.TAGS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.tagsLabel,
			placeholder: c.I18N.tagsLabel,
			helperText: c.I18N.tagsPlaceHolder,
			rules: {
				validate: () => (getValues(FormFieldNames.TAGS) as string[]).length > 0
					? true
					: validationMessage('invalid', FormFieldNames.TAGS)
			},
			options: c.TAGS_OPTIONS,
			multipleOptions: true,
		},
		[FormFieldNames.META_DATA]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA,
			controllProps: commonControlProps,
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
			controllProps: commonControlProps,
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
			<PageTitle>{routes[RouteKey.ASSET_UPSERT_FORM].title}</PageTitle>
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
