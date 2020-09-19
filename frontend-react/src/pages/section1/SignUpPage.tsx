import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuid } from 'uuid';
import { appConstants as c } from '../../app';
import { RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	spacer: {
		marginBottom: theme.spacing(2),
	},
}));

// use RouteComponentProps to get history props from Route
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	// assign from appConstants
	const defaultUser = c.REGISTER_DEFAULT_USER;
	// hooks mui
	// hooks react form
	const classes = useStyles();
	// hooks: state
	const [id, setId] = useState(uuid())
	const [fiscalNumber, setFiscalNumber] = useState(defaultUser.fiscalNumber)
	const [firstName, setFirstName] = useState(defaultUser.firstName)
	const [lastName, setLastName] = useState(defaultUser.lastName)
	const [email, setEmail] = useState(defaultUser.email);
	const [username, setUsername] = useState(defaultUser.username)
	const [password, setPassword] = useState(defaultUser.password);
	const [passwordConfirmation, setPasswordConfirmation] = useState(defaultUser.password);

	// hooks: apollo
	const [personNewMutation, { loading, error }] = usePersonRegisterMutation();
	// handlers
	const onChangeIdHandler = (e: React.SyntheticEvent) => {
		setId((e.target as HTMLSelectElement).value)
	};
	const onChangeFiscalNumberHandler = (e: React.SyntheticEvent) => {
		setFiscalNumber((e.target as HTMLSelectElement).value)
	};
	const onChangeFirstNameHandler = (e: React.SyntheticEvent) => {
		setFirstName((e.target as HTMLSelectElement).value)
	};
	const onChangeLastNameHandler = (e: React.SyntheticEvent) => {
		setLastName((e.target as HTMLSelectElement).value)
	};
	const onChangeEmailHandler = (e: React.SyntheticEvent) => {
		setEmail((e.target as HTMLSelectElement).value)
	};
	const onChangeUsernameHandler = (e: React.SyntheticEvent) => {
		setUsername((e.target as HTMLSelectElement).value)
	};
	const onChangePasswordHandler = (e: React.SyntheticEvent) => {
		setPassword((e.target as HTMLSelectElement).value)
	};
	const onChangePasswordConfirmationHandler = (e: React.SyntheticEvent) => {
		setPasswordConfirmation((e.target as HTMLSelectElement).value)
	};

	const onSubmitFormHandler = async (e: any) => {
		try {
			e.preventDefault();
			const newPersonData: NewPersonInput = {
				id, fiscalNumber, firstName, lastName, email, username, password
			};
			const response = await personNewMutation({ variables: { newPersonData } }).catch(error => {
				throw error;
			})

			if (response) {
				// use history to send user to homepage, after awaiting for response object
				// history.push('/');
				history.push({ pathname: '/', state: { message: `user registered successfully! welcome, you can login with ${username}` } });
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.SIGN_UP].title}</PageTitle>
			<Box component='span' m={1}>
				<form className={classes.root} noValidate autoComplete='off' onSubmit={(e) => onSubmitFormHandler(e)}>
					{/* fiscalNumber */}
					<TextField
						id='fiscalNumber'
						label={c.KEYWORDS.fiscalNumber}
						defaultValue={fiscalNumber}
						placeholder='PT18269128'
						helperText='a valid pt fiscal Number'
						className={classes.spacer}
						fullWidth
						required
						onChange={(e) => onChangeFiscalNumberHandler(e)} />
					{/* firstName */}
					<TextField
						id='firstName'
						label={c.KEYWORDS.firstName}
						defaultValue={firstName}
						placeholder='John'
						className={classes.spacer}
						fullWidth
						required
						onChange={(e) => onChangeFirstNameHandler(e)} />
					{/* lastName */}
					<TextField
						id='lastName'
						label={c.KEYWORDS.lastName}
						defaultValue={lastName}
						placeholder='Doe'
						className={classes.spacer}
						fullWidth
						required
						onChange={(e) => onChangeLastNameHandler(e)} />
					{/* email */}
					<TextField
						id='email'
						label={c.KEYWORDS.email}
						defaultValue={email}
						placeholder='johndoe@example.com'
						className={classes.spacer}
						fullWidth
						required
						onChange={(e) => onChangeEmailHandler(e)} />
					{/* username */}
					<TextField
						id='username'
						label={c.KEYWORDS.username}
						defaultValue={username}
						placeholder='johndoe'
						className={classes.spacer}
						fullWidth
						required
						onChange={(e) => onChangeUsernameHandler(e)} />
					{/* password */}
					<TextField
						id='password'
						label={c.KEYWORDS.password}
						defaultValue={password}
						placeholder='your secret password'
						className={classes.spacer}
						fullWidth
						required
						type='password'
						onChange={(e) => onChangePasswordHandler(e)} />
					{/* password */}
					<TextField
						id='passwordConfirmation'
						label={c.KEYWORDS.passwordConfirmation}
						defaultValue={password}
						placeholder='your secret password'
						className={classes.spacer}
						fullWidth
						required
						type='password'
						onChange={(e) => onChangePasswordConfirmationHandler(e)} />
					{/* submit */}
					<Button
						className={classes.spacer}
						type='submit'
						variant='contained'
						color='primary'>
						{c.KEYWORDS.register}
					</Button>
				</form>
				{error && <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment>
	);
}
