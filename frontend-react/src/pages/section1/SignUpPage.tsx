import { Box, Grid, IconButton, InputAdornment, Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { Copyright } from '../../components/material-ui/other/Copyright';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields } from '../../types';
import { commonControllProps, generateFormDefinition, getGraphQLApolloError, validationRuleRegExHelper } from '../../utils';
import { copyrightProps, useStyles } from './SignInPage';

type FormInputs = {
	username: string;
	password: string;
	passwordConfirmation: string;
	fiscalNumber: string;
	firstName: string;
	lastName: string;
	email: string;
};
// TODO: cleanup
type FormInputsString = 'password' | 'username' | 'passwordConfirmation' | 'fiscalNumber' | 'firstName' | 'lastName' | 'email';
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
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles: from signInPage
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, getValues, reset } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	const [showPassword, setShowPassword] = useState(false);
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in rsult state message
	const username = watch(FormFieldNames.USERNAME);
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));

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
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		} finally {
			setShowPassword(false);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.FIRST_NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FIRST_NAME,
			label: 'First name',
			placeholder: 'John',
			helperText: 'a valid first Name',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.FIRST_NAME, c.REGEXP.name),
			controllProps: commonControllProps,
		},
		[FormFieldNames.LAST_NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LAST_NAME,
			label: 'Last name',
			placeholder: 'Doe',
			helperText: 'a valid last name',
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
		[FormFieldNames.PASSWORD]: {
			inputRef: useRef(),
			type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
			// type: FormInputType.PASSWORD,
			name: FormFieldNames.PASSWORD,
			label: 'Password',
			placeholder: '12345678',
			fullWidth: true,
			rules: validationRuleRegExHelper(FormFieldNames.PASSWORD, c.REGEXP.name),
			controllProps: {
				...commonControllProps,
				// must be capitalized
				InputProps: {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handlePasswordVisibility}
							>
								{showPassword ? <VisibilityIcon /> : <VisibilityIconOff />}
							</IconButton>
						</InputAdornment>
					)
				},
			},
		},
		[FormFieldNames.PASSWORD_CONFIRMATION]: {
			inputRef: useRef(),
			type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
			name: FormFieldNames.PASSWORD_CONFIRMATION,
			label: 'Password confirmation',
			placeholder: '12345678',
			fullWidth: true,
			rules: {
				...validationRuleRegExHelper(FormFieldNames.PASSWORD_CONFIRMATION, c.REGEXP.name),
				validate: () => {
					return getValues(FormFieldNames.PASSWORD) === getValues(FormFieldNames.PASSWORD_CONFIRMATION);
				}
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FISCAL_NUMBER,
			label: 'Fiscal number',
			placeholder: 'PT218269128',
			helperText: 'a valid pt fiscal Number',
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
			rules: validationRuleRegExHelper(FormFieldNames.EMAIL, c.REGEXP.name),
			controllProps: commonControllProps,
		},
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{c.I18N.signUp}
				</Typography>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.form} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button
								type='submit'
								variant='contained'
								disabled={loading}
								fullWidth
							>{c.I18N.signUp}</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								type='reset'
								variant='contained'
								disabled={loading}
								fullWidth
								onClick={() => handleResetHandler()}
							>{c.I18N.reset}</Button>
						</Grid>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Link href={routes[RouteKey.SIGN_IN].path} variant='body2'>
								<Typography align='center' variant='subtitle2'>{c.I18N.signIn}</Typography>
							</Link>
						</Grid>
					</Grid>
					{loading && <LinearIndeterminate />}
				</form>
			</div>
			{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
			{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
			<Box mt={8}>
				<Copyright {...copyrightProps} />
			</Box>
		</Container>
	);
}
