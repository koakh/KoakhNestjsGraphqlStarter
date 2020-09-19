import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, regExp } from '../../app';
import { RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewPersonInput, usePersonRegisterMutation } from '../../generated/graphql';
import { recordToArray } from '../../utils';
import { useForm, Controller, Validate, ValidationValueMessage, ValidationRule } from 'react-hook-form';

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

const defaultValues = {
	// username: '',
	// password: '',
	// passwordConfirmation: '',
	// fiscalNumber: '',
	// firstName: '',
	// lastName: '',
	// email: '',
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

type FormPropFields = {
	as: JSX.Element,
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
	}
	// 	rules?: Partial<{
	// 		required: string | boolean | import('./types').ValidationValueMessage<boolean>;
	// 		min: import('./types').ValidationRule<React.ReactText>;
	// 		max: import('./types').ValidationRule<React.ReactText>;
	// 		maxLength: import('./types').ValidationRule<React.ReactText>;
	// 		minLength: import('./types').ValidationRule<React.ReactText>;
	// 		pattern: import('./types').ValidationRule<RegExp>;
	// 		validate: import('./types').Validate | Record<string, import('./types').Validate>;
	// }> | undefined;	
}

let renderCount = 0;

// use RouteComponentProps to get history props from Route
export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks react form
	const { register, handleSubmit, watch, errors, control, getValues, reset } = useForm<FormInputs>({ defaultValues, mode: 'onBlur' });
	const [submitting, setSubmitting] = useState(false);
	renderCount++;
	// TODO: type data
	// const onSubmit = (data: any) => console.log(data);
	// hooks styles
	const classes = useStyles();
	// hooks: apollo
	const [personNewMutation, { loading, error: apolloError }] = usePersonRegisterMutation();

	// console.log(watch('fiscalNumber'));
	console.log('errors', JSON.stringify(errors, undefined, 2));

	const onSubmitHandler = async (data: FormInputs) => {
		try {
			alert(JSON.stringify(data, undefined, 2));
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
				// use history to send user to homepage, after awaiting for response object
				// history.push('/');
				history.push({ pathname: '/', state: { message: `user registered successfully! welcome, you can login with ${username}` } });
			}
		} catch (error) {
			console.error(error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message.error, undefined, 2) : error);
		} finally {
			setSubmitting(false);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormKeyFields.USERNAME]: {
			as: <TextField />,
			type: 'text',
			name: 'username',
			label: 'Username',
			defaultValue: 'johndoe',
			placeholder: 'johndoe',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: true,
			}
		},
		[FormKeyFields.PASSWORD]: {
			as: <TextField />,
			type: 'password',
			name: 'password',
			label: 'Password',
			defaultValue: '12345678',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
		},
		[FormKeyFields.PASSWORD_CONFIRMATION]: {
			as: <TextField />,
			type: 'password',
			name: 'passwordConfirmation',
			label: 'Password confirmation',
			defaultValue: '12345678',
			placeholder: '12345678',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: true,
				validate: () => {
					return getValues('password') === getValues('passwordConfirmation');
				}
			}
		},
		[FormKeyFields.FISCAL_NUMBER]: {
			as: <TextField />,
			type: 'text',
			name: 'fiscalNumber',
			label: 'Fiscal number',
			defaultValue: 'PT218269128',
			placeholder: 'PT218269128',
			helperText: 'a valid pt fiscal Number',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: true,
				pattern: regExp.fiscalNumber,
			}
		},
		[FormKeyFields.FIRST_NAME]: {
			as: <TextField />,
			type: 'text',
			name: 'firstName',
			label: 'First name',
			defaultValue: 'John',
			placeholder: 'John',
			fullWidth: true,
			className: classes.spacer,
		},
		[FormKeyFields.LAST_NAME]: {
			as: <TextField />,
			type: 'text',
			name: 'lastName',
			label: 'Last name',
			defaultValue: 'Doe',
			placeholder: 'Doe',
			fullWidth: true,
			className: classes.spacer,
		},
		[FormKeyFields.EMAIL]: {
			as: <TextField />,
			type: 'text',
			name: 'email',
			label: 'Email',
			defaultValue: 'johndoe@example.com',
			placeholder: 'johndoe@example.com',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: true,
				pattern: regExp.email,
			}
		},
	};
	const username: string = 'username';
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
								inputRef={register({ required: e.required })}
							/> */}
							{/* <section key={e.name}> */}
							<Controller
								as={<TextField />}
								control={control}
								type={e.type}
								name={e.name}
								label={e.label}
								error={(errors[e.name] !== undefined)}
								defaultValue={e.defaultValue}
								placeholder={e.placeholder}
								helperText={(errors[e.name] !== undefined) ? 'This field is required' : e.helperText}
								className={e.className}
								fullWidth={e.fullWidth}
								rules={e.rules}
							/>
							{/* </section> */}
						</Fragment>
					))}
					<Button
						className={classes.spacer}
						type='submit'
						variant='contained'
						color='primary'
						disabled={submitting}
					>
						{c.KEYWORDS.register}
					</Button>
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={(apolloError.graphQLErrors[0].message as any).error} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
