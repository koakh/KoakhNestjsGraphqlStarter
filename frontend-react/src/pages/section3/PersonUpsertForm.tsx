import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields, ModelType } from '../../types';
import { commonControlProps, generateFormDefinition, getGraphQLApolloError, parseTemplate, useStyles, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	passwordConfirmation: string;
	fiscalNumber: string;
	mobilePhone: string;
	email: string;
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
};
const defaultValues: FormDefaultValues = {
	firstName: 'John',
	lastName: 'Doe',
	username: 'johndoe',
	password: 'Xx673!00',
	passwordConfirmation: 'Xx673!00',
	fiscalNumber: 'PT123123123',
	mobilePhone: '+351936101188',
	email: 'johndoe@mail.com',
};

// use RouteComponentProps to get history props from Route
export const PersonUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, errors, control, reset } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			const newPersonData: NewPersonInput = {
				username: data.username,
				password: data.password,
				fiscalNumber: data.fiscalNumber,
				mobilePhone: data.mobilePhone,
				email: data.email,
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
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.FIRST_NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FIRST_NAME,
			label: 'First name',
			placeholder: 'John',
			// helperText: 'a valid first Name',
			fullWidth: true,
			className: classes.spacer,
			rules: validationRuleRegExHelper(FormFieldNames.FIRST_NAME, c.REGEXP.name),
			controlProps: commonControlProps,
		},
		[FormFieldNames.LAST_NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LAST_NAME,
			label: 'Last name',
			placeholder: 'Doe',
			// helperText: 'a valid last name',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.LAST_NAME, c.REGEXP.name),
			controlProps: commonControlProps,
		},
		[FormFieldNames.USERNAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.USERNAME,
			label: 'Username',
			placeholder: 'johndoe',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.USERNAME, c.REGEXP.username),
			controlProps: commonControlProps,
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FISCAL_NUMBER,
			label: 'Fiscal number',
			placeholder: 'PT218269128',
			// helperText: 'a valid pt fiscal Number',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.FISCAL_NUMBER, c.REGEXP.fiscalNumber),
			controlProps: commonControlProps,
		},
		[FormFieldNames.MOBILE_PHONE]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.MOBILE_PHONE,
			label: c.I18N.mobilePhoneLabel,
			placeholder: c.I18N.mobilePhonePlaceHolder,
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.mobilePhone),
			controlProps: commonControlProps,
		},
		[FormFieldNames.EMAIL]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.EMAIL,
			label: 'Email',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.email),
			controlProps: commonControlProps,
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
