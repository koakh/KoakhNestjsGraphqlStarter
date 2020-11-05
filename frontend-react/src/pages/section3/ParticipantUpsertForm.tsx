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
import { FormDefaultValues, FormInputType, FormPropFields, ModelType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, parseTemplate, isValidJsonObject, useStyles, validateRegExpArrayWithValuesArray, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	code: string,
	name: string,
	email: string,
	fiscalNumber: string,
	ambassadors?: string,
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	CODE = 'code',
	NAME = 'name',
	EMAIL = 'email',
	FISCAL_NUMBER = 'fiscalNumber',
	AMBASSADORS = 'ambassadors',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	code: 'wfp',
	name: 'World Food Program',
	email: 'mail@efp.com',
	fiscalNumber: 'PT500123001',
	ambassadors: 'PT182692125 PT582692178',
	metaData: '{}',
	metaDataInternal: '{}',
};

// use RouteComponentProps to get history props from Route
export const ParticipantUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useParticipantNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
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
				fiscalNumber: data.fiscalNumber,
				ambassadors: data.ambassadors.split(' '),
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			const response = await assetNewMutation({ variables: { newParticipantData: newParticipantData } });

			if (response) {
				const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.participant, id: response.data.participantNew.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
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
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.codeLabel,
			placeholder: c.I18N.codePlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.CODE, c.REGEXP.alphaNumeric),
		},
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetLabel,
			placeholder: c.I18N.assetPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.name),
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
		[FormFieldNames.FISCAL_NUMBER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FISCAL_NUMBER,
			label: c.I18N.fiscalNumberLabel,
			placeholder: c.I18N.fiscalNumberPlaceHolder,
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.FISCAL_NUMBER, c.REGEXP.fiscalNumber),
			controlProps: commonControlProps,
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
			// TODO clean up
			// rules: validationRuleRegExHelper(FormFieldNames.AMBASSADORS, c.REGEXP.fiscalNumberArray),
			rules: {
				// validate both regex uuid, fiscalNumber and mobilePhone
				validate: () => {
					const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
					return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
				}
			},
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
