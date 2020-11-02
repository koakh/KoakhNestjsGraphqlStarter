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
import { AssetType, EntityType, FormDefaultValues, FormInputType, FormPropFields, ModelType, Tag } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, getInjected, isValidEnum, isValidJsonObject, useStyles, validateRegExpArrayWithValuesArray, validationMessage, validationRuleRegExHelper } from '../../utils';

type FormInputs = {
	assetType: AssetType,
	name: string,
	ambassadors?: string,
	// input/output entity object
	owner: string,
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	ASSET_TYPE = 'assetType',
	NAME = 'name',
	AMBASSADORS = 'ambassadors',
	OWNER = 'owner',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	assetType: c.VALUES.undefined,
	name: 'Wheel chair',
	ambassadors: 'PT182692125 PT582692178',
	owner: 'PT182692125',
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
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useAssetNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
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
				ambassadors: data.ambassadors.split(' '),
				owner: {
					type: EntityType.person,
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
				const payload = { message: getInjected(c.I18N.newModelCreatedSuccessfully, { model: ModelType.asset, id: response.data.assetNew.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.ASSET_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.ASSET_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetType,
			// selection don't use placeHolder
			// placeholder: c.VALUES.PHYSICAL_ASSET,
			rules: {
				validate: () => isValidEnum(AssetType, getValues(FormFieldNames.ASSET_TYPE))
					? true
					: validationMessage('required', FormFieldNames.ASSET_TYPE)
			},
			options: () => [
				{ title: c.I18N.assetTypeOptionPhysicalAsset, value: AssetType.physicalAsset },
				{ title: c.I18N.assetTypeOptionDigitalAsset, value: AssetType.digitalAsset },
			],
		},
		[FormFieldNames.NAME]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.NAME,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetLabel,
			placeholder: c.I18N.assetPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.NAME, c.REGEXP.name),
		},
		[FormFieldNames.AMBASSADORS]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.AMBASSADORS,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ambassadorsLabel,
			placeholder: c.I18N.ambassadorsPlaceHolder,
			helperText: c.I18N.ambassadorsHelperText,
			rules: {
				// validate both regex uuid, fiscalNumber and mobilePhone
				validate: () => {
					const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
					return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
				}
			},
		},
		[FormFieldNames.OWNER]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.OWNER,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.ownerLabel,
			placeholder: c.I18N.ownerPlaceholder,
			helperText: c.I18N.ownerHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.OWNER, c.REGEXP.fiscalNumber),
		},
		[FormFieldNames.LOCATION]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.LOCATION,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.locationLabel,
			placeholder: c.I18N.locationPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.LOCATION, c.REGEXP.location, false),
		},
		[FormFieldNames.TAGS]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.TAGS,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.tagsLabel,
			placeholder: c.I18N.tagsLabel,
			helperText: c.I18N.tagsPlaceHolder,
			rules: {
				validate: () => (getValues(FormFieldNames.TAGS) as string[]).length > 0
					? true
					: validationMessage('invalid', FormFieldNames.TAGS)
			},
			options: () => c.TAGS_OPTIONS,
			multipleOptions: true,
			addToAutocomplete: true,
		},
		[FormFieldNames.META_DATA]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.META_DATA,
			controlProps: commonControlProps,
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
			controlProps: commonControlProps,
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
