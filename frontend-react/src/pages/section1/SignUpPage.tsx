import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { appConstants as c, headerLinksNavStyle } from '../../app';
import { RoutePaths } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';

// TODO: use reactFormHooks to create signUp

// use RouteComponentProps to get history props from Route
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	// assign from appConstants
	const defaultUser = c.REGISTER_DEFAULT_USER;
	// hooks: state
	const [id, setId] = useState(uuid())
	const [fiscalNumber, setFiscalNumber] = useState(defaultUser.fiscalNumber)
	const [firstName, setFirstname] = useState(defaultUser.firstName)
	const [lastName, setLastname] = useState(defaultUser.lastName)
	const [email, setEmail] = useState(defaultUser.email);
	const [username, setUsername] = useState(defaultUser.username)
	const [password, setPassword] = useState(defaultUser.password);

	// hooks: apollo
	const [personNewMutation, { loading, error }] = usePersonRegisterMutation();
	// handlers
	const onChangeIdHandler = (e: React.SyntheticEvent) => {
		setId((e.target as HTMLSelectElement).value)
	};
	const onChangeFiscalNumberHandler = (e: React.SyntheticEvent) => {
		setFiscalNumber((e.target as HTMLSelectElement).value)
	};
	const onChangeFirstnameHandler = (e: React.SyntheticEvent) => {
		setFirstname((e.target as HTMLSelectElement).value)
	};
	const onChangeLastnameHandler = (e: React.SyntheticEvent) => {
		setLastname((e.target as HTMLSelectElement).value)
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
				history.push({pathname: '/', state: { message: `user registered successfully! welcome, you can login with ${username}`}});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
      <div style={headerLinksNavStyle}>
        <Link to={RoutePaths.HOME}>login</Link>
      </div>
			<h2>Register</h2>
			<form onSubmit={(e) => onSubmitFormHandler(e)}>
				{/* id */}
				<label>{c.KEYWORDS.id}:</label>
				<div>
					<input
						value={id}
						placeholder='id'
						onChange={(e) => onChangeIdHandler(e)} />
				</div>
				{/* fiscalNumber */}
				<label>{c.KEYWORDS.fiscalNumber}:</label>
				<div>
					<input
						value={fiscalNumber}
						placeholder='fiscalNumber'
						onChange={(e) => onChangeFiscalNumberHandler(e)} />
				</div>
				{/* firstName */}
				<label>{c.KEYWORDS.firstName}:</label>
				<div>
					<input
						value={firstName}
						placeholder='firstName'
						onChange={(e) => onChangeFirstnameHandler(e)} />
				</div>
				{/* lastName */}
				<label>{c.KEYWORDS.lastName}:</label>
				<div>
					<input
						value={lastName}
						placeholder='lastName'
						onChange={(e) => onChangeLastnameHandler(e)} />
				</div>
				{/* email */}
				<label>{c.KEYWORDS.email}:</label>
				<div>
					<input
						value={email}
						placeholder='email'
						onChange={(e) => onChangeEmailHandler(e)} />
				</div>
				{/* username */}
				<label>{c.KEYWORDS.username}:</label>
				<div>
					<input
						value={username}
						placeholder='username'
						onChange={(e) => onChangeUsernameHandler(e)} />
				</div>
				{/* password */}
				<label>{c.KEYWORDS.password}:</label>
				<div>
					<input
						value={password}
						placeholder='password'
						type='password'
						onChange={(e) => onChangePasswordHandler(e)} />
				</div>
				{/* submit */}
				<button type='submit'>register</button>
			</form>
			{error && <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />}
			{loading && <LinearIndeterminate />}
		</Fragment>
	);
}
