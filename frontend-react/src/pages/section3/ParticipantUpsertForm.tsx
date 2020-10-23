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
import { NewParticipantInput, useParticipantNewMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields } from '../../types';
import { commonControlProps, generateFormDefinition, generateFormButtonsDiv, getGraphQLApolloError, isValidJsonObject, useStyles, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	code: string,
	name: string,
	email: string,
	ambassadors?: string[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	CODE = 'code',
	NAME = 'name',
	EMAIL = 'email',
	AMBASSADORS = 'ambassadors',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	code: 'wfp',
	name: 'World Food Program',
	email: 'mail@efp.com',
	ambassadors: ['0466c748-05fd-4d46-b381-4f1bb39458c7', '108f4bb0-2918-4340-a0c8-8b5fb5af249c'],
	metaData: '{}',
	metaDataInternal: '{}',
};

// use RouteComponentProps to get history props from Route
export const ParticipantUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useParticipantNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in result state message
	const name = watch(FormFieldNames.NAME);
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`assetType:${getValues(FormFieldNames.ASSET_TYPE)}`);

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newParticipantData: NewParticipantInput = {
				code: data.code,
				name: data.name,
				email: data.email,
				ambassadors: data.ambassadors,
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			const response = await assetNewMutation({ variables: { newParticipantData: newParticipantData } });

			if (response) {
				// TODO: finishe result message
				const payload = { message: `${c.I18N.signUpUserRegisteredSuccessfully} '${name}'` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.SIGNUP_RESULT.path });
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.CODE]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.CODE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.codeLabel,
			placeholder: c.I18N.codePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.CODE, c.REGEXP.alphaNumeric),
		},
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetLabel,
			placeholder: c.I18N.assetPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.name),
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
			<PageTitle>{routes[RouteKey.PARTICIPANT_UPSERT_FORM].title}</PageTitle>
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
