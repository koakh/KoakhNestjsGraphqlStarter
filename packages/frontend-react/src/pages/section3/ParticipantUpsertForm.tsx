import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldAmbassadors, commonFormFieldCauseName, commonFormFieldCode, commonFormFieldEmail, commonFormFieldFiscalNumber, commonFormFieldMetadata, commonFormFieldMetadataInternal, formCommonOptions, RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { SnackbarMessage, SnackbarSeverityType } from '../../components/snackbar-message';
import { NewParticipantInput, useParticipantNewMutation } from '../../generated/graphql';
import { FormDefaultValues, FormPropFields } from '../../types';
import { generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidJsonObject, useStyles, validateFiscalNumber, validateRegExpArrayWithValuesArray } from '../../utils';

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
	email: mokeFormData ? 'mail@wfp.com' : '',
	fiscalNumber: mokeFormData ? 'PT500128006' : '',
	ambassadors: mokeFormData ? c.VALUES.mokeAmbassadors : '',
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const ParticipantUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// snackBar state
	const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
	// hooks react form
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useParticipantNewMutation();
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);

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
				// TODO: cleanup old result message
				// const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.participant, id: response.data.participantNew.id }) };
				// dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				// history.push({ pathname: routes.RESULT_PAGE.path });
				setSnackbarOpen(true);
				reset();
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
			// TODO: change to generic name, and use it in all field names
			...commonFormFieldCauseName(useRef(), FormFieldNames.NAME),
			label: c.I18N.participantLabel,
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			...commonFormFieldFiscalNumber(useRef(), FormFieldNames.FISCAL_NUMBER, () => validateFiscalNumber(getValues(FormFieldNames.FISCAL_NUMBER)))
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

	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`assetType:${getValues(FormFieldNames.ASSET_TYPE)}`);

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
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} className={classes.spacer}/>}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
				<SnackbarMessage message={c.I18N.snackbarParticipantUpsertSuccess} severity={SnackbarSeverityType.SUCCESS} open={snackbarOpen} setOpen={setSnackbarOpen} />
			</Box>
		</Fragment >
	);
}
