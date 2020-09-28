import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useRef, useState } from 'react';
import { Controller, useForm, Validate, ValidationRule, ValidationValueMessage } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, regExp } from '../../app';
import { RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { getGraphQLApolloError, recordToArray } from '../../utils';
import { useStateValue, ActionType } from '../../app/state';

// TODO: check if passwords ae equal

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		width: 'fullWidth',
	},
	spacer: {
		marginBottom: theme.spacing(2),
	},
	button: {
		marginRight: theme.spacing(2),
	},
}));

type FormInputs = {
	username: string;
	password: string;
	passwordConfirmation: string;
	fiscalNumber: string;
	firstName: string;
	lastName: string;
	email: string;
};

enum FormKeyFields {
	USERNAME = 'USERNAME',
	PASSWORD = 'PASSWORD',
	PASSWORD_CONFIRMATION = 'PASSWORD_CONFIRMATION',
	FISCAL_NUMBER = 'FISCAL_NUMBER',
	FIRST_NAME = 'FIRST_NAME',
	LAST_NAME = 'LAST_NAME',
	EMAIL = 'EMAIL',
}

const inputProps: Record<string, { name: string, label: string, default: string | number | boolean }> = {
	[FormKeyFields.USERNAME]: { name: 'username', label: 'Username', default: 'jonhdoe' },
	[FormKeyFields.PASSWORD]: { name: 'password', label: 'Password', default: 'Aa123#12' },
	[FormKeyFields.PASSWORD_CONFIRMATION]: { name: 'passwordConfirmation', label: 'Password confirmation', default: 'Aa123#12' },
	[FormKeyFields.FISCAL_NUMBER]: { name: 'fiscalNumber', label: 'Fiscal number', default: 'PT123123123' },
	[FormKeyFields.FIRST_NAME]: { name: 'firstName', label: 'First name', default: 'John' },
	[FormKeyFields.LAST_NAME]: { name: 'lastName', label: 'Last name', default: 'Doe' },
	[FormKeyFields.EMAIL]: { name: 'email', label: 'Email', default: 'johndoe@mail.com' },
}

const defaultValues: { [key: string]: string | number | boolean } = {
	username: inputProps[FormKeyFields.USERNAME].default,
	password: inputProps[FormKeyFields.PASSWORD].default,
	passwordConfirmation: inputProps[FormKeyFields.PASSWORD_CONFIRMATION].default,
	fiscalNumber: inputProps[FormKeyFields.FISCAL_NUMBER].default,
	firstName: inputProps[FormKeyFields.FIRST_NAME].default,
	lastName: inputProps[FormKeyFields.LAST_NAME].default,
	email: inputProps[FormKeyFields.EMAIL].default,
};

// TODO
// focus input

// TODO lib
type FormPropFields = {
	as: JSX.Element,
	inputRef: any,
	// TODO : use this type
	type: 'text' | 'password',
	name: 'password' | 'username' | 'passwordConfirmation' | 'fiscalNumber' | 'firstName' | 'lastName' | 'email',
	label: string;
	defaultValue?: string,
	placeholder?: string,
	helperText?: string,
	fullWidth?: boolean,
	className?: any,
	rules?: {
		required?: string | boolean | ValidationValueMessage<boolean>,
		min?: ValidationRule<React.ReactText>,
		max?: ValidationRule<React.ReactText>,
		maxLength?: ValidationRule<React.ReactText>,
		minLength?: ValidationRule<React.ReactText>,
		pattern?: ValidationRule<RegExp>,
		validate?: Validate | Record<string, Validate>
	},
}

// TODO lib
const validationMessage = (message: 'required' | 'invalid', field: FormKeyFields) => `${inputProps[field].name} is ${message}`;

let renderCount = 0;

// use RouteComponentProps to get history props from Route
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks react form
	// eslint-disable-next-line 
	const { register, handleSubmit, watch, errors, control, getValues, reset } = useForm<FormInputs>({ defaultValues, mode: 'onBlur' });
	const [submitting, setSubmitting] = useState(false);
	// hooks styles
	const classes = useStyles();
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();
	// hooks state
	const [,dispatch] = useStateValue();
	// TODO temp
	renderCount++;

	// used in message
	const username = watch('username');
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);

	// debug
	// console.log('password', watch('password'));
	// console.log('passwordConfirmation', watch('passwordConfirmation'));
	// console.log('errors', JSON.stringify(errors, undefined, 2));

	const onResetHandler = async () => { reset(defaultValues, {}) };
	const onSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			setSubmitting(true);
			const newPersonData: NewPersonInput = {
				username: data.username,
				password: data.password,
				fiscalNumber: data.fiscalNumber,
				email: data.email,
			};
			debugger;
			const response = await personNewMutation({ variables: { newPersonData } })
				.catch(error => {
					throw error;
				})

			if (response) {
				// TODO: put message into i18n
				const payload = { message: `User registered successfully! You can login with ${username}` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				debugger;
				history.push({ pathname: routes.SIGNUP_RESULT.path});
			}
		} catch (error) {
			debugger;
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message.error, undefined, 2) : error);
		} finally {
			setSubmitting(false);
		}
	};

	// TODO: lib shared type
	const formDefinition: Record<string, FormPropFields> = {
		[FormKeyFields.USERNAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: 'text',
			name: 'username',
			label: 'Username',
			// defaultValue: 'johndoe',
			placeholder: 'johndoe',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormKeyFields.USERNAME),
				pattern: {
					value: regExp.username,
					message: validationMessage("invalid", FormKeyFields.USERNAME),
				},
			}
		},
		[FormKeyFields.PASSWORD]: {
			as: <TextField />,
			inputRef: useRef(),
			type: 'password',
			name: 'password',
			label: 'Password',
			// defaultValue: '12345678',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormKeyFields.PASSWORD),
				pattern: {
					value: regExp.password,
					message: validationMessage("invalid", FormKeyFields.PASSWORD),
				},
			}
		},
		[FormKeyFields.PASSWORD_CONFIRMATION]: {
			as: <TextField />,
			inputRef: useRef(),
			type: 'password',
			name: 'passwordConfirmation',
			label: 'Password confirmation',
			// defaultValue: '12345678',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormKeyFields.PASSWORD_CONFIRMATION),
				pattern: {
					value: regExp.passwordConfirmation,
					message: validationMessage("invalid", FormKeyFields.PASSWORD_CONFIRMATION),
				},
				validate: () => {
					return getValues(inputProps[FormKeyFields.PASSWORD].name) === getValues(inputProps[FormKeyFields.PASSWORD_CONFIRMATION].name);
				}
			}
		},
		[FormKeyFields.FISCAL_NUMBER]: {
			as: <TextField />,
			inputRef: useRef(),
			type: 'text',
			name: 'fiscalNumber',
			label: 'Fiscal number',
			// defaultValue: 'PT218269128',
			placeholder: 'PT218269128',
			helperText: 'a valid pt fiscal Number',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormKeyFields.FISCAL_NUMBER),
				pattern: {
					value: regExp.fiscalNumber,
					message: validationMessage("invalid", FormKeyFields.FISCAL_NUMBER),
				},
			}
		},
		[FormKeyFields.EMAIL]: {
			as: <TextField />,
			inputRef: useRef(),
			type: 'text',
			name: 'email',
			label: 'Email',
			// defaultValue: 'johndoe@example.com',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormKeyFields.EMAIL),
				pattern: {
					value: regExp.email,
					message: validationMessage("invalid", FormKeyFields.EMAIL),
				},
			}
		},
	};

	// init inputRef's
	// const inputRef: Record<string, any> = {};
	// recordToArray<FormPropFields>(formDefinition).forEach((e: FormPropFields) => {
	// 	inputRef[e.name] == useRef();
	// })

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.SIGN_UP].title} : {renderCount}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					onSubmit={handleSubmit((data) => onSubmitHandler(data))}
					className={classes.root} noValidate autoComplete='off'>
					{recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => (
						<Fragment key={e.name}>
							{/* <TextField
								type={e.type}
								name={e.name}
								defaultValue={e.defaultValue}
								label={e.label}
								placeholder={e.placeholder}
								helperText={e.helperText}
								className={e.className}
								fullWidth={e.fullWidth}
								inputRef={register({ required: e.rules.required })}
							/> */}
							{/* <section key={e.name}> */}
							<Controller
								as={<TextField inputRef={e.inputRef} />}
								onFocus={() => { e.inputRef.current.focus(); }}
								control={control}
								type={e.type}
								name={e.name}
								label={e.label}
								placeholder={e.placeholder}
								error={(errors[e.name] !== undefined)}
								helperText={(errors[e.name] !== undefined) ? errors[e.name].message : e.helperText}
								className={e.className}
								fullWidth={e.fullWidth}
								rules={e.rules}
								disabled={submitting}
							/>
							{/* </section> */}
						</Fragment>
					))}
					<div className={classes.spacer}>
						<Button
							className={classes.button}
							type='submit'
							variant='contained'
							color='primary'
							disabled={submitting}
						>
							{c.KEYWORDS.register}
						</Button>
						<Button
							className={classes.button}
							type='reset'
							variant='contained'
							color='primary'
							disabled={submitting}
							onClick={() => onResetHandler()}
						>
							Reset
					</Button>
					</div>
				</form>
				{/* {apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={(apolloError.graphQLErrors[0].message as any).error} />} */}
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
