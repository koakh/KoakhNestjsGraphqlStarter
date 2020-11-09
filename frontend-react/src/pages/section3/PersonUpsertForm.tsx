import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { commonFormFieldEmail, commonFormFieldFirstName, commonFormFieldFiscalNumber, commonFormFieldLastName, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldMobilePhone, commonFormFieldPassword, commonFormFieldPasswordConfirmation, commonFormFieldUsername, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { FormDefaultValues, FormPropFields, ModelType } from '../../types';
import { generateFormDefinition, getGraphQLApolloError, isValidJsonObject, parseTemplate, useStyles } from '../../utils';

type FormInputs = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	passwordConfirmation: string;
	fiscalNumber: string;
	mobilePhone: string;
	email: string;
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
	USERNAME = 'username',
	PASSWORD = 'password',
	PASSWORD_CONFIRMATION = 'passwordConfirmation',
	FISCAL_NUMBER = 'fiscalNumber',
	MOBILE_PHONE = 'mobilePhone',
	EMAIL = 'email',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	firstName: 'John',
	lastName: 'Doe',
	username: 'johndoe',
	password: 'Aa456#45',
	passwordConfirmation: 'Aa456#45',
	fiscalNumber: 'PT123123123',
	mobilePhone: '+351936101188',
	email: 'johndoe@mail.com',
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const PersonUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	const [showPassword, setShowPassword] = useState(false);
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	console.log(`metaData:${getValues(FormFieldNames.META_DATA)}`);
	console.log(`metaDataInternal:${getValues(FormFieldNames.META_DATA_INTERNAL)}`);

	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			setShowPassword(false);
			const newPersonData: NewPersonInput = {
				username: data.username,
				password: data.password,
				fiscalNumber: data.fiscalNumber,
				mobilePhone: data.mobilePhone,
				email: data.email,
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			const response = await personNewMutation({ variables: { newPersonData } })
				.catch(error => {
					throw error;
				});

			if (response) {
				const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.person, id: response.data.personRegister.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			setShowPassword(false);
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.FIRST_NAME]: {
			...commonFormFieldFirstName(useRef(), FormFieldNames.FIRST_NAME)
		},
		[FormFieldNames.LAST_NAME]: {
			...commonFormFieldLastName(useRef(), FormFieldNames.LAST_NAME)
		},
		[FormFieldNames.USERNAME]: {
			...commonFormFieldUsername(useRef(), FormFieldNames.USERNAME)
		},
		[FormFieldNames.PASSWORD]: {
			...commonFormFieldPassword(useRef(), FormFieldNames.PASSWORD, showPassword, handlePasswordVisibility)
		},
		[FormFieldNames.PASSWORD_CONFIRMATION]: {
			...commonFormFieldPasswordConfirmation(useRef(), FormFieldNames.PASSWORD_CONFIRMATION, showPassword, () => getValues(FormFieldNames.PASSWORD) === getValues(FormFieldNames.PASSWORD_CONFIRMATION))
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			...commonFormFieldFiscalNumber(useRef(), FormFieldNames.FISCAL_NUMBER)
		},
		[FormFieldNames.MOBILE_PHONE]: {
			...commonFormFieldMobilePhone(useRef(), FormFieldNames.MOBILE_PHONE)
		},
		[FormFieldNames.EMAIL]: {
			...commonFormFieldEmail(useRef(), FormFieldNames.EMAIL)
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
			<PageTitle>{routes[RouteKey.PERSON_UPSERT_FORM].title}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					<div className={classes.spacer}>
						<Button
							type='submit'
							variant='contained'
							className={classes.button}
							disabled={loading}
						>
							{c.I18N.create}
						</Button>
						<Button
							type='reset'
							variant='contained'
							className={classes.button}
							disabled={loading}
							onClick={() => handleResetHandler()}
						>
							Reset
					</Button>
					</div>
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
