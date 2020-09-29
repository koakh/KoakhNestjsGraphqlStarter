import { Box, InputAdornment, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields, validationMessage } from '../../types';
import { getGraphQLApolloError, recordToArray } from '../../utils';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';

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
	const [showPassword, setShowPassword] = useState(false);
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

	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			setSubmitting(true);
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
				const payload = { message: `${c.MESSAGES.signUpUserRegisteredSuccessfully} '${username}'` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				debugger;
				history.push({ pathname: routes.SIGNUP_RESULT.path });
			}
		} catch (error) {
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		} finally {
			setSubmitting(false);
			setShowPassword(false);			
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.FIRST_NAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FIRST_NAME,
			label: 'First name',
			placeholder: 'John',
			helperText: 'a valid first Name',
			fullWidth: true,
			className: classes.spacer,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.FIRST_NAME),
				pattern: {
					value: c.REGEXP.firstAndLastName,
					message: validationMessage("invalid", FormFieldNames.FIRST_NAME),
				},
			}
		},
		[FormFieldNames.LAST_NAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LAST_NAME,
			label: 'Last name',
			placeholder: 'Doe',
			helperText: 'a valid last name',
			fullWidth: true,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.LAST_NAME),
				pattern: {
					value: c.REGEXP.firstAndLastName,
					message: validationMessage("invalid", FormFieldNames.LAST_NAME),
				},
			}
		},
		[FormFieldNames.USERNAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.USERNAME,
			label: 'Username',
			placeholder: 'johndoe',
			fullWidth: true,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: c.REGEXP.username,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			}
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
			variant: "outlined",
			margin: "normal",
			inputProps: {
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
			rules: {
				required: validationMessage("required", FormFieldNames.USERNAME),
				pattern: {
					value: c.REGEXP.password,
					message: validationMessage("invalid", FormFieldNames.USERNAME),
				},
			}
		},
		[FormFieldNames.PASSWORD_CONFIRMATION]: {
			as: <TextField />,
			inputRef: useRef(),
			type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
			name: FormFieldNames.PASSWORD_CONFIRMATION,
			label: 'Password confirmation',
			placeholder: '12345678',
			fullWidth: true,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.PASSWORD_CONFIRMATION),
				pattern: {
					value: c.REGEXP.passwordConfirmation,
					message: validationMessage("invalid", FormFieldNames.PASSWORD_CONFIRMATION),
				},
				validate: () => {
					return getValues(FormFieldNames.PASSWORD) === getValues(FormFieldNames.PASSWORD_CONFIRMATION);
				}
			}
		},
		[FormFieldNames.FISCAL_NUMBER]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.FISCAL_NUMBER,
			label: 'Fiscal number',
			placeholder: 'PT218269128',
			helperText: 'a valid pt fiscal Number',
			fullWidth: true,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.FISCAL_NUMBER),
				pattern: {
					value: c.REGEXP.fiscalNumber,
					message: validationMessage("invalid", FormFieldNames.FISCAL_NUMBER),
				},
			}
		},
		[FormFieldNames.EMAIL]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.EMAIL,
			label: 'Email',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			variant: "outlined",
			margin: "normal",
			rules: {
				required: validationMessage("required", FormFieldNames.EMAIL),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage("invalid", FormFieldNames.EMAIL),
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
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
					className={classes.root} noValidate autoComplete='off'>
					{recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => (
						<Fragment key={e.name}>
							<Controller
								as={<TextField
									inputRef={e.inputRef}
									variant={e.variant}
									margin={e.margin}
									// capitalized
									InputProps={e.inputProps}
								/>}
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
							// color='primary'
							disabled={submitting}
						>
							{c.KEYWORDS.register}
						</Button>
						<Button
							className={classes.button}
							type='reset'
							variant='contained'
							// color='primary'
							disabled={submitting}
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
