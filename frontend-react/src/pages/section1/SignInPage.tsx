import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, setAccessToken } from '../../app';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert/AlertMessage';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { Copyright, Props as CopyrightProps } from '../../components/material-ui/other/Copyright';
import { LoginPersonInput, PersonProfileDocument, usePersonLoginMutation } from '../../generated/graphql';
import { Grid, Link } from '@material-ui/core';

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
}));

const copyrightProps: CopyrightProps = {
	copyrightName: process.env.REACT_APP_COPYRIGHT_NAME,
	copyrightUri: process.env.REACT_APP_COPYRIGHT_URI,
}

// use RouteComponentProps to get history props from Route
export const SignInPage: React.FC<RouteComponentProps> = ({ history, location }) => {
	// get hooks
	const [, dispatch] = useStateValue();
	// hooks: state
	const [username, setUsername] = useState(c.DEFAULT_LOGIN_CREDENTIALS.username);
	const [password, setPassword] = useState(c.DEFAULT_LOGIN_CREDENTIALS.password);
	// new hooks from material-ui
	const [showPassword, setShowPassword] = useState(false);
	// hooks: apollo
	const [personLoginMutation, { loading, error }] = usePersonLoginMutation();

	// styles
	const classes = useStyles();

	// handlers
	const handleChangeUsername = (e: React.SyntheticEvent) => {
		setUsername((e.target as HTMLSelectElement).value);
	};
	const handleChangePassword = (e: React.SyntheticEvent) => {
		setPassword((e.target as HTMLSelectElement).value);
	};
	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setShowPassword(false);

			const loginPersonData: LoginPersonInput = {
				username, password
			};
			const response = await personLoginMutation({
				variables: { loginPersonData },
				// access data
				update: (store, { data }) => {
					if (!data) {
						return null
					}
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
			setUsername('');
			setPassword('');
			setShowPassword(false);
			// if (error.graphQLErrors[0]) {
			// 	const {status, error: errorMessage, message} = error.graphQLErrors[0].message;
			// 	console.log(`status: ${status}, message: ${message}`);
			// }
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
					<TextField
						id='username'
						name='username'
						label={c.KEYWORDS.username}
						value={username}
						autoComplete='username'
						variant='outlined'
						margin='normal'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeUsername(event)}
						disabled={loading}
						required
						fullWidth
						autoFocus
					/>
					<TextField
						id='password'
						name='password'
						label={c.KEYWORDS.password}
						value={password}
						autoComplete='current-password'
						variant='outlined'
						margin='normal'
						type={showPassword ? 'text' : 'password'}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangePassword(event)}
						disabled={loading}
						required
						fullWidth
						InputProps={{ // <-- This is where the toggle button is added.
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handlePasswordVisibility}
										onMouseDown={handlePasswordVisibility}
									>
										{showPassword ? <VisibilityIcon /> : <VisibilityIconOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					{/* <FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label={c.MESSAGES.rememberMe}
					/> */}
					<Button
						type='submit'
						variant='contained'
						className={classes.submit}
						disabled={loading}
						fullWidth
					>
						{c.MESSAGES.signIn}
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
								</Link>
						</Grid> */}
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
