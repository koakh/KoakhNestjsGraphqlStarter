import { Box } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldAmbassadors, commonFormFieldAssetName, commonFormFieldAssetOwner, commonFormFieldAssetType, commonFormFieldLocation, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldPersonNdParticipantInputTypeEntity, commonFormFieldTags, formCommonOptions, RouteKey, routes } from '../../app/config';
import { useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { SnackbarMessage, SnackbarSeverityType } from '../../components/snackbar-message';
import { NewAssetInput, useAssetNewMutation } from '../../generated/graphql';
import { AssetType, EntityType, FormDefaultValues, FormPropFields, Tag } from '../../types';
import { generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validateRegExpArray, validateRegExpArrayWithValuesArray } from '../../utils';

type FormInputs = {
	assetType: AssetType,
	name: string,
	// TODO: add, first we need to add it to NewAssetInput GraphQL
	description: string,
	ambassadors?: string,
	// input/output entity object
	inputType: EntityType;
	owner: string,
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	ASSET_TYPE = 'assetType',
	NAME = 'name',
	DESCRIPTION = 'description',
	AMBASSADORS = 'ambassadors',
	INPUT_TYPE = 'inputType',
	OWNER = 'owner',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	assetType: c.VALUES.undefined,
	name: mokeFormData ? 'Wheel chair' : '',
	description: mokeFormData ? 'some useful description' : '',
	ambassadors: mokeFormData ? c.VALUES.mokeAmbassadors : '',
	inputType: EntityType.person,
	// inject by user profile id state
	owner: '',
	location: mokeFormData ? c.VALUES.mokeLocation : '',
	tags: [
		{ title: 'Nature', value: 'NATURE' },
		{ title: 'Economy', value: 'ECONOMY' },
	],
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const AssetUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks state
	const [state] = useStateValue();
	// snackBar state
	const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
	// hooks react form
	const { handleSubmit, errors, control, reset, getValues } = useForm<FormInputs>({
		// required to inject owner from state
		defaultValues: { ...defaultValues, owner: state.user.profile.fiscalNumber },
		...formCommonOptions
	})
	// hooks: apollo
	const [assetNewMutation, { loading, error: apolloError }] = useAssetNewMutation();
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
					type: data.inputType,
					id: data.owner,
				},
				location: data.location,
				tags: data.tags.map((e: Tag) => e.value),
				metaData: data.metaData ? JSON.parse(data.metaData) : {},
				metaDataInternal: data.metaDataInternal ? JSON.parse(data.metaDataInternal) : {},
			};
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newAssetData, undefined, 2));
			const response = await assetNewMutation({ variables: { newAssetData: newAssetData } });

			if (response) {
				// TODO: cleanup old result message
				// const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.asset, id: response.data.assetNew.id }) };
				// dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				// history.push({ pathname: routes.RESULT_PAGE.path });
				setSnackbarOpen(true);
				reset();
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.ASSET_TYPE]: {
			...commonFormFieldAssetType(useRef(), FormFieldNames.ASSET_TYPE, () => isValidEnum(AssetType, getValues(FormFieldNames.ASSET_TYPE))),
		},
		[FormFieldNames.NAME]: {
			...commonFormFieldAssetName(useRef(), FormFieldNames.NAME),
		},
		[FormFieldNames.INPUT_TYPE]: {
			...commonFormFieldPersonNdParticipantInputTypeEntity(useRef(), FormFieldNames.INPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))),
		},
		[FormFieldNames.OWNER]: {
			...commonFormFieldAssetOwner(useRef(), FormFieldNames.OWNER, () => validateRegExpArray(getValues(FormFieldNames.OWNER), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone])),
		},
		[FormFieldNames.AMBASSADORS]: {
			...commonFormFieldAmbassadors(useRef(), FormFieldNames.AMBASSADORS, () => {
				// optional, only uses validation if has values, assets can be created without ambassadors
				if (getValues(FormFieldNames.AMBASSADORS)) {
					const failValues = validateRegExpArrayWithValuesArray((getValues(FormFieldNames.AMBASSADORS) as string).split(' '), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]);
					return (failValues.length > 0) ? `invalid id(s) ${failValues.join(' ')}` : true;
				}
			})
		},
		[FormFieldNames.LOCATION]: {
			...commonFormFieldLocation(useRef(), FormFieldNames.LOCATION)
		},
		[FormFieldNames.TAGS]: {
			...commonFormFieldTags(useRef(), FormFieldNames.TAGS, () => (getValues(FormFieldNames.TAGS) as string[]).length > 0),
		},
		[FormFieldNames.META_DATA]: {
			...commonFormFieldMetadata(useRef(), FormFieldNames.META_DATA, () => isValidJsonObject(getValues(FormFieldNames.META_DATA))),
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			...commonFormFieldMetadataInternal(useRef(), FormFieldNames.META_DATA_INTERNAL, () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL)))
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
				<SnackbarMessage message={c.I18N.snackbarAssetUpsertSuccess} severity={SnackbarSeverityType.SUCCESS} open={snackbarOpen} setOpen={setSnackbarOpen} />
			</Box>
		</Fragment >
	);
}
