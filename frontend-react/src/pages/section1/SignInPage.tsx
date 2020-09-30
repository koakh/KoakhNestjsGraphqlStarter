import { Grid, Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import React, { Fragment, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, setAccessToken } from '../../app';
import { envVariables as e, formCommonOptions } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert/AlertMessage';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { Copyright, Props as CopyrightProps } from '../../components/material-ui/other/Copyright';
import { LoginPersonInput, PersonProfileDocument, usePersonLoginMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields, validationMessage } from '../../types';
import { recordToArray } from '../../utils';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		// Fix IE 11 issue.
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 1),
	},
	spacer: {
		marginBottom: theme.spacing(2),
	},
}));

type FormInputs = {
	username: string;
	password: string;
};
type FormInputsString = 'password' | 'username';
enum FormFieldNames {
	USERNAME = 'username',
	PASSWORD = 'password',
};
const defaultValues: FormDefaultValues = {
	username: c.DEFAULT_LOGIN_CREDENTIALS.username,
	password: c.DEFAULT_LOGIN_CREDENTIALS.password,
};

const copyrightProps: CopyrightProps = {
	copyrightName: e.appCopyrightName,
	copyrightUri: e.appCopyrightUri,
}

// use RouteComponentProps to get history props from Route
export const SignInPage: React.FC<RouteComponentProps> = ({ history, location }) => {
	// styles
	const classes = useStyles();
	// get hooks
	const [, dispatch] = useStateValue();
	// hooks react form
	const { handleSubmit, errors, control } = useForm<FormInputs>({ defaultValues, ...formCommonOptions });
	const [showPassword, setShowPassword] = useState(false);
	// hooks: apollo
	const [personLoginMutation, { loading, error }] = usePersonLoginMutation();

	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			setShowPassword(false);
			const loginPersonData: LoginPersonInput = {
				username: data.username,
				password: data.password,
			};
			const response = await personLoginMutation({
				variables: { loginPersonData },
				// access data
				update: (store, { data }) => {
					if (!data) {
						return null
					}
					// TODO: used cache her
					// this will update message `You are logged in as: ${username}` that is using apollo cache
					// update apollo cache with new data, this will update usePersonProfileQuery cache
					// warning: for this to work data return fields from personLoginMutation must match usePersonProfileQuery
					// check console warnings for messages like `Missing field personProfile in`
					store.writeQuery({
						// must use postfix Document type gql``
						query: PersonProfileDocument,
						data: {
							// must match personProfile with personLogin.user return objects
							personProfile: data.personLogin.user
						}
					});
				}
			}).catch(error => {
				throw error;
			})

			if (response && response.data.personLogin) {
				// set inMemory global accessToken variable
				setAccessToken(response.data.personLogin.accessToken);
				// dispatch state
				const { user } = response.data.personLogin;
				const payload = {
					profile: {
						id: user.id,
						firstName: user.username,
						lastName: user.lastName,
						username: user.username,
						email: user.email,
						roles: user.roles
					}
				};
				dispatch({ type: ActionType.SIGNED_IN_USER, payload });
				// use history to send user to homepage, after awaiting for response object, 
				history.push('/');
			}
		} catch (error) {
			// TODO
			// setUsername('');
			// setPassword('');
			setShowPassword(false);
			// debug
			// if (error.graphQLErrors[0]) {
			// 	const {status, error: errorMessage, message} = error.graphQLErrors[0].message;
			// 	console.log(`status: ${status}, message: ${message}`);
			// }
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.USERNAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.USERNAME,
			label: 'Username',
			placeholder: 'johndoe',
			fullWidth: true,
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: c.REGEXP.username,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			},
			controllProps: {
				variant: "outlined",
				margin: "normal",
			},
		},
		[FormFieldNames.PASSWORD]: {
			as: <TextField />,
			inputRef: useRef(),
			type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
			// type: FormInputType.PASSWORD,
			name: FormFieldNames.PASSWORD,
			label: 'Password',
			placeholder: '12345678',
			fullWidth: true,
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: c.REGEXP.password,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			},
			controllProps: {
				variant: "outlined",
				margin: "normal",
				// must be capitalized
				InputProps: {
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handlePasswordVisibility}
							>
								{showPassword ? <VisibilityIcon /> : <VisibilityIconOff />}
							</IconButton>
						</InputAdornment>
					)
				},
			},
		},
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.form} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => (
						<Fragment key={e.name}>
							<Controller
								type={e.type}
								control={control}
								as={<TextField inputRef={e.inputRef} {...e.controllProps} />}
								name={(e.name as FormInputsString)}
								error={(errors[(e.name as FormInputsString)] !== undefined)}
								helperText={(errors[(e.name as FormInputsString)] !== undefined) ? errors[(e.name as FormInputsString)].message : e.helperText}
								label={e.label}
								placeholder={e.placeholder}
								className={e.className}
								fullWidth={e.fullWidth}
								rules={e.rules}
								disabled={loading}
								onFocus={() => { e.inputRef.current.focus(); }}
							/>
						</Fragment>
					))}
					<Button
						type='submit'
						variant='contained'
						className={classes.submit}
						disabled={loading}
						fullWidth
					>
						{c.MESSAGES.signIn}
					</Button>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' disabled={loading} />}
						label={c.MESSAGES.rememberMe}
					/>
					<Grid container className={classes.spacer}>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
								</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{c.MESSAGES.nonAccountSignUp}
							</Link>
						</Grid>
					</Grid>
					{loading && <LinearIndeterminate />}
				</form>
			</div>
			{error && <AlertMessage severity={AlertSeverityType.ERROR} message={c.MESSAGES.loginFailed} />}
			<Box mt={8}>
				<Copyright {...copyrightProps} />
			</Box>
		</Container>
	);
}
