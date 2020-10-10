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
import { FormDefaultValues, FormInputType, FormPropFields } from '../../types';
import { commonControllProps, generateFormDefinition, getGraphQLApolloError, useStyles, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	username: string;
	password: string;
	passwordConfirmation: string;
	fiscalNumber: string;
	firstName: string;
	lastName: string;
	email: string;
};
enum FormFieldNames {
	USERNAME = 'username',
	PASSWORD = 'password',
	PASSWORD_CONFIRMATION = 'passwordConfirmation',
	FISCAL_NUMBER = 'fiscalNumber',
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
	EMAIL = 'email',
};
const defaultValues: FormDefaultValues = {
	firstName: 'John',
	lastName: 'Doe',
	username: 'jonhdoe',
	password: 'Aa123#12',
	passwordConfirmation: 'Aa123#12',
	fiscalNumber: 'PT123123123',
	email: 'johndoe@mail.com',
};

// use RouteComponentProps to get history props from Route
export const ParticipantUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in result state message
	const username = watch(FormFieldNames.USERNAME);
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
				email: data.email,
			};
			const response = await personNewMutation({ variables: { newPersonData } })
				.catch(error => {
					throw error;
				})

			if (response) {
				const payload = { message: `${c.I18N.signUpUserRegisteredSuccessfully} '${username}'` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				debugger;
				history.push({ pathname: routes.SIGNUP_RESULT.path });
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
			fullWidth: true,
			className: classes.spacer,
			rules: validationRuleRegExHelper(FormFieldNames.FIRST_NAME, c.REGEXP.name),
			controllProps: commonControllProps,
		},
		[FormFieldNames.LAST_NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LAST_NAME,
			label: 'Last name',
			placeholder: 'Doe',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.LAST_NAME, c.REGEXP.name),
			controllProps: commonControllProps,
		},
		[FormFieldNames.USERNAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.USERNAME,
			label: 'Username',
			placeholder: 'johndoe',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.USERNAME, c.REGEXP.name),
			controllProps: commonControllProps,
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FISCAL_NUMBER,
			label: 'Fiscal number',
			placeholder: 'PT218269128',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.FISCAL_NUMBER, c.REGEXP.name),
			controllProps: commonControllProps,
		},
		[FormFieldNames.EMAIL]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.EMAIL,
			label: 'Email',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.name),
			controllProps: commonControllProps,
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
