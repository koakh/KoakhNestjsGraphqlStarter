import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewAssetInput, useAssetNewMutation } from '../../generated/graphql';
import { FormDefaultValues, FormInputType, FormPropFields, validationMessage, commonControllProps } from '../../types';
import { generateFormDefinition, getGraphQLApolloError, useStyles } from '../../utils';

type FormInputs = {
	name: string,
	assetType: string,
	ambassadors?: string[],
	owner: string,
	location: string
	tags: string[],
	metaData: any,
	metaDataInternal: any,
};
enum FormFieldNames {
	NAME = 'name',
	ASSET_TYPE = 'assetType',
	AMBASSADORS = 'ambassadors',
	OWNER = 'owner',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	name: '',
	ambassadors: [],
	startDate: Date.now(),
	endDate: '',
	location: '',
	tags: [],
	metaData: {},
	metaDataInternal: {},
};

// use RouteComponentProps to get history props from Route
export const AssetUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	const [submitting, setSubmitting] = useState(false);
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useAssetNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in result state message
	const name = watch(FormFieldNames.NAME);
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// alert(JSON.stringify(data, undefined, 2));
			setSubmitting(true);
			const newAssetData: NewAssetInput = {
				name: data.name,
				assetType: data.assetType,
				ambassadors: data.ambassadors,
				owner: data.owner,
				location: data.location,
				tags: data.tags,
				metaData: data.metaData,
				metaDataInternal: data.metaDataInternal,
			};
			const response = await assetNewMutation({ variables: { newAssetData: newAssetData } })
				.catch(error => {
					throw error;
				})

			if (response) {
				const payload = { message: `${c.MESSAGES.signUpUserRegisteredSuccessfully} '${name}'` };
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
		[FormFieldNames.NAME]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			label: 'Cause name',
			placeholder: 'Save the world today',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.NAME),
				pattern: {
					value: c.REGEXP.name,
					message: validationMessage('invalid', FormFieldNames.NAME),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.ASSET_TYPE]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.ASSET_TYPE,
			label: 'Asset type',
			placeholder: 'PHYSICAL_ASSET',
			fullWidth: true,
			// TODO: AssetType enum PHYSICAL_ASSET | DIGITAL_ASSET
			rules: {
				required: validationMessage('required', FormFieldNames.ASSET_TYPE),
				pattern: {
					value: c.REGEXP.name,
					message: validationMessage('invalid', FormFieldNames.ASSET_TYPE),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.AMBASSADORS]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.AMBASSADORS,
			label: 'Ambassadors',
			placeholder: 'add ambassadors',
			fullWidth: true,
			// TODO: valid ambassador fiscalNumber array
			rules: {
				required: validationMessage('required', FormFieldNames.AMBASSADORS),
				pattern: {
					value: c.REGEXP.username,
					message: validationMessage('invalid', FormFieldNames.AMBASSADORS),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.OWNER]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.OWNER,
			label: 'Location',
			placeholder: 'Lisbon',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.OWNER),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage('invalid', FormFieldNames.OWNER),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.LOCATION]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LOCATION,
			label: 'Location',
			placeholder: 'Lisbon',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.LOCATION),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage('invalid', FormFieldNames.LOCATION),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.TAGS]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.TAGS,
			label: 'Tags',
			placeholder: 'nature, plaent',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.TAGS),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage('invalid', FormFieldNames.TAGS),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.META_DATA]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA,
			label: 'Metada',
			placeholder: 'arbitrary object',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.META_DATA),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage('invalid', FormFieldNames.META_DATA),
				},
			},
			controllProps: commonControllProps,
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			as: <TextField />,
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA_INTERNAL,
			label: 'Metada internal',
			placeholder: 'arbitrary object',
			fullWidth: true,
			className: classes.spacer,
			rules: {
				required: validationMessage('required', FormFieldNames.META_DATA_INTERNAL),
				pattern: {
					value: c.REGEXP.email,
					message: validationMessage('invalid', FormFieldNames.META_DATA_INTERNAL),
				},
			},
			controllProps: commonControllProps,
		},
	};

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.ASSET_UPSERT_FORM].title}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					<div className={classes.spacer}>
						<Button
							type='submit'
							variant='contained'
							className={classes.button}
							disabled={submitting}
						>
							{c.KEYWORDS.create}
						</Button>
						<Button
							type='reset'
							variant='contained'
							className={classes.button}
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
