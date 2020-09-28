import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, regExp } from '../../app';
import { RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { FormDefaultValues, FormPropFields, validationMessage, FormInputType } from '../../types';
import { getGraphQLApolloError, nameof, recordToArray } from '../../utils';

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
// init defaultValues
const defaultValues: FormDefaultValues = {
	firstName: 'John',
	lastName: 'Doe',
	username: 'jonhdoe',
	password: 'Aa123#12',
	passwordConfirmation: 'Aa123#12',
	fiscalNumber: 'PT123123123',
	email: 'johndoe@mail.com',
};

// const inputProps: InputProps = {
// 	[FormKeyFields.USERNAME]: { name: 'username', label: 'Username', default: 'jonhdoe' },
// 	[FormKeyFields.PASSWORD]: { name: 'password', label: 'Password', default: 'Aa123#12' },
// 	[FormKeyFields.PASSWORD_CONFIRMATION]: { name: 'passwordConfirmation', label: 'Password confirmation', default: 'Aa123#12' },
// 	[FormKeyFields.FISCAL_NUMBER]: { name: 'fiscalNumber', label: 'Fiscal number', default: 'PT123123123' },
// 	[FormKeyFields.FIRST_NAME]: { name: 'firstName', label: 'First name', default: 'John' },
// 	[FormKeyFields.LAST_NAME]: { name: 'lastName', label: 'Last name', default: 'Doe' },
// 	[FormKeyFields.EMAIL]: { name: 'email', label: 'Email', default: 'johndoe@mail.com' },
// }

// fill defaultValues
// Object.keys(inputProps).forEach((e: string) => {
// 	defaultValues[inputProps[e].name] = inputProps[e].default
// })

let renderCount = 0;

// use RouteComponentProps to get history props from Route
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	renderCount++;
	// hooks react form
	const { handleSubmit, watch, errors, control, getValues, reset } = useForm<FormInputs>({ defaultValues, mode: 'onBlur' });
	const [submitting, setSubmitting] = useState(false);
	// hooks styles
	const classes = useStyles();
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
			const response = await personNewMutation({ variables: { newPersonData } })
				.catch(error => {
					throw error;
				})

			if (response) {
				// TODO: put message into i18n
				const payload = { message: `User registered successfully! You can login with ${username}` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				debugger;
				history.push({ pathname: routes.SIGNUP_RESULT.path });
			}
		} catch (error) {
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		} finally {
			setSubmitting(false);
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
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: regExp.username,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			}
		},
		[nameof<FormInputs>('password')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.PASSWORD,
			name: nameof<FormInputs>('password'),
			label: 'Password',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: regExp.password,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			}
		},
		[nameof<FormInputs>('passwordConfirmation')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.PASSWORD,
			name: nameof<FormInputs>('passwordConfirmation'),
			label: 'Password confirmation',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", nameof<FormInputs>('passwordConfirmation')),
				pattern: {
					value: regExp.passwordConfirmation,
					message: validationMessage("invalid", nameof<FormInputs>('passwordConfirmation')),
				},
				validate: () => {
					return getValues(nameof<FormInputs>('password')) === getValues(nameof<FormInputs>('passwordConfirmation'));
				}
			}
		},
		[nameof<FormInputs>('fiscalNumber')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: nameof<FormInputs>('fiscalNumber'),
			label: 'Fiscal number',
			placeholder: 'PT218269128',
			helperText: 'a valid pt fiscal Number',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", nameof<FormInputs>('fiscalNumber')),
				pattern: {
					value: regExp.fiscalNumber,
					message: validationMessage("invalid", nameof<FormInputs>('fiscalNumber')),
				},
			}
		},
		[nameof<FormInputs>('email')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: 'email',
			label: 'Email',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", nameof<FormInputs>('email')),
				pattern: {
					value: regExp.email,
					message: validationMessage("invalid", nameof<FormInputs>('email')),
				},
			}
		},
		[nameof<FormInputs>('firstName')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: nameof<FormInputs>('firstName'),
			label: 'First name',
			placeholder: 'John',
			helperText: 'a valid first Name',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", nameof<FormInputs>('firstName')),
				pattern: {
					value: regExp.firstAndLastName,
					message: validationMessage("invalid", nameof<FormInputs>('firstName')),
				},
			}
		},
		[nameof<FormInputs>('lastName')]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: nameof<FormInputs>('lastName'),
			label: 'Last name',
			placeholder: 'Doe',
			helperText: 'a valid last name',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage("required", nameof<FormInputs>('lastName')),
				pattern: {
					value: regExp.firstAndLastName,
					message: validationMessage("invalid", nameof<FormInputs>('lastName')),
				},
			}
		},
	};

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
								<Controller
									as={<TextField inputRef={e.inputRef} />}
									onFocus={() => { e.inputRef.current.focus(); }}
									control={control}
									type={e.type}
									name={(e.name as FormInputsString)}
									error={(errors[(e.name as FormInputsString)] !== undefined)}
									helperText={(errors[(e.name as FormInputsString)] !== undefined) ? errors[(e.name as FormInputsString)].message : e.helperText}
									label={e.label}
									placeholder={e.placeholder}
									className={e.className}
									fullWidth={e.fullWidth}
									rules={e.rules}
									disabled={submitting}
								/>
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
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
