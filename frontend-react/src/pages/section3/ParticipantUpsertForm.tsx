import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldAmbassadors, commonFormFieldCode, commonFormFieldEmail, commonFormFieldFiscalNumber, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldAssetName, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewParticipantInput, useParticipantNewMutation } from '../../generated/graphql';
import { FormDefaultValues, FormPropFields, ModelType } from '../../types';
import { generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidJsonObject, parseTemplate, useStyles, validateRegExpArrayWithValuesArray } from '../../utils';

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
	code: mokeFormData ? 'wfp' : '',
	name: mokeFormData ? 'World Food Program' : '',
	email: mokeFormData ? 'mail@efp.com' : '',
	fiscalNumber: mokeFormData ? 'PT500123005' : '',
	ambassadors: mokeFormData ? c.VALUES.mokeAmbassadors: '',
	metaData: '',
	metaDataInternal: '',
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
				metaData: data.metaData ? JSON.parse(data.metaData) : {},
				metaDataInternal: data.metaDataInternal ? JSON.parse(data.metaDataInternal) : {},
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
			...commonFormFieldCode(useRef(), FormFieldNames.CODE)
		},
		[FormFieldNames.NAME]: {
			...commonFormFieldAssetName(useRef(), FormFieldNames.NAME)
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			...commonFormFieldFiscalNumber(useRef(), FormFieldNames.FISCAL_NUMBER)
		},
		[FormFieldNames.EMAIL]: {
			...commonFormFieldEmail(useRef(), FormFieldNames.EMAIL)
		},
		[FormFieldNames.AMBASSADORS]: {
			...commonFormFieldAmbassadors(useRef(), FormFieldNames.AMBASSADORS, () => {
				const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
				return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
			})
		},
		[FormFieldNames.META_DATA]: {
			...commonFormFieldMetadata(useRef(), FormFieldNames.META_DATA, () => isValidJsonObject(getValues(FormFieldNames.META_DATA))),
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			...commonFormFieldMetadataInternal(useRef(), FormFieldNames.META_DATA_INTERNAL, () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL)))
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
