import { Box, Grid, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldEmail, commonFormFieldFirstName, commonFormFieldFiscalNumber, commonFormFieldLastName, commonFormFieldMobilePhone, commonFormFieldPassword, commonFormFieldPasswordConfirmation, commonFormFieldUsername, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { Copyright } from '../../components/material-ui/other/Copyright';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { ReactComponent as LogoIcon } from '../../icons/LogoIcon.svg';
import { FormDefaultValues, FormPropFields } from '../../types';
import { generateFormDefinition, getGraphQLApolloError, parseTemplate, validateFiscalNumber } from '../../utils';
import { copyrightProps, useStyles } from './SignInPage';

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
	firstName: mokeFormData ? 'Jake' : '',
	lastName: mokeFormData ? 'Doe' : '',
	username: mokeFormData ? 'jakedoe' : '',
	password: mokeFormData ? c.VALUES.mokePassword : '',
	passwordConfirmation: mokeFormData ? c.VALUES.mokePassword : '',
	fiscalNumber: mokeFormData ? 'PT123123127' : '',
	mobilePhone: mokeFormData ? '+351936101187' : '',
	email: mokeFormData ? 'jakedoe@mail.com' : '',
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
	// used in result state message
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
				mobilePhone: data.mobilePhone,
				email: data.email,
			};
			const response = await personNewMutation({ variables: { newPersonData } })
				.catch(error => {
					throw error;
				})

			if (response) {
				const payload = { message: parseTemplate(c.I18N.signUpUserRegisteredSuccessfully, { username }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		} finally {
			setShowPassword(false);
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
			...commonFormFieldFiscalNumber(useRef(), FormFieldNames.FISCAL_NUMBER, () => validateFiscalNumber(getValues(FormFieldNames.FISCAL_NUMBER)))
		},
		[FormFieldNames.MOBILE_PHONE]: {
			...commonFormFieldMobilePhone(useRef(), FormFieldNames.MOBILE_PHONE)
		},
		[FormFieldNames.EMAIL]: {
			...commonFormFieldEmail(useRef(), FormFieldNames.EMAIL)
		},
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				{/* <Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar> */}
				<LogoIcon width='10vw'/>
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
			{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage}/>}
			{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
			<Box mt={8}>
				<Copyright {...copyrightProps} />
			</Box>
		</Container>
	);
}
