import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewAssetInput, useAssetNewMutation } from '../../generated/graphql';
import { AssetType, FormDefaultValues, FormInputType, FormPropFields, Tag } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	name: string,
	assetType: string,
	ambassadors?: string[],
	// input/output entity object
	owner: string,
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
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
	name: 'Wheel chair',
	assetType: 'PHYSICAL_ASSET',
	ambassadors: ['0466c748-05fd-4d46-b381-4f1bb39458c7', '108f4bb0-2918-4340-a0c8-8b5fb5af249c'],
	owner: '4ea88521-031b-4279-9165-9c10e1839001',
	location: '12.1890144,-28.5171909',
	tags: [
		{ title: 'Nature', value: 'NATURE' },
		{ title: 'Economy', value: 'ECONOMY' },
	],
	metaData: '{}',
	metaDataInternal: '{}',
};

// use RouteComponentProps to get history props from Route
export const AssetUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
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
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);
	// console.log(`assetType:${getValues(FormFieldNames.ASSET_TYPE)}`);

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newAssetData: NewAssetInput = {
				name: data.name,
				assetType: data.assetType,
				ambassadors: data.ambassadors,
				// TODO: must get owner type on chaincode side, from uuid
				owner: {
					type: 'com.chain.solidary.model.person',
					id: data.owner,
				},
				location: data.location,
				tags: data.tags.map((e: Tag) => e.value),
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newAssetData, undefined, 2));
			const response = await assetNewMutation({ variables: { newAssetData: newAssetData } });

			if (response) {
				// TODO: finishe result message
				const payload = { message: `${c.I18N.signUpUserRegisteredSuccessfully} '${name}'` };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.SIGNUP_RESULT.path });
			}
		} catch (error) {
			// don't throw here else we ctach react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetLabel,
			placeholder: c.I18N.assetPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.name),
		},
		[FormFieldNames.ASSET_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.ASSET_TYPE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetType,
			// selection don't use placeHolder
			// placeholder: c.VALUES.PHYSICAL_ASSET,
			rules: {
				validate: () => isValidEnum(AssetType, getValues(FormFieldNames.ASSET_TYPE))
					? true
					: validationMessage('required', FormFieldNames.ASSET_TYPE)
			},
			options: [
				{ title: c.I18N.assetTypeOptionPhysicalAsset, value: AssetType.physicalAsset },
				{ title: c.I18N.assetTypeOptionDigitalAsset, value: AssetType.digitalAsset },
			],
		},
		[FormFieldNames.AMBASSADORS]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.AMBASSADORS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ambassadorsLabel,
			placeholder: c.I18N.ambassadorsPlaceHolder,
			helperText: c.I18N.ambassadorsHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.AMBASSADORS, c.REGEXP.uuidArray),
		},
		[FormFieldNames.OWNER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.OWNER,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ownerLabel,
			placeholder: c.I18N.ownerPlaceholder,
			helperText: c.I18N.ownerHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.OWNER, c.REGEXP.uuid),
		},
		[FormFieldNames.LOCATION]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LOCATION,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.locationLabel,
			placeholder: c.I18N.locationPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.LOCATION, c.REGEXP.location),
		},
		[FormFieldNames.TAGS]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.TAGS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.tagsLabel,
			placeholder: c.I18N.tagsLabel,
			helperText: c.I18N.tagsPlaceHolder,
			rules: {
				validate: () => (getValues(FormFieldNames.TAGS) as string[]).length > 0
					? true
					: validationMessage('invalid', FormFieldNames.TAGS)
			},
			options: c.TAGS_OPTIONS,
			multipleOptions: true,
		},
		[FormFieldNames.META_DATA]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.metaDataLabel,
			placeholder: c.I18N.metaDataPlaceHolder,
			rules: {
				validate: () => isValidJsonObject(getValues(FormFieldNames.META_DATA))
					? true
					: validationMessage('invalid', FormFieldNames.META_DATA)
			},
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA_INTERNAL,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.metaDataInternalLabel,
			placeholder: c.I18N.metaDataPlaceHolder,
			rules: {
				validate: () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL))
					? true
					: validationMessage('invalid', FormFieldNames.META_DATA_INTERNAL)
			},
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
					{generateFormButtonsDiv(classes, loading, handleResetHandler)}
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
