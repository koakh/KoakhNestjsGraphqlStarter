import { Box } from '@material-ui/core';
import React, { Fragment, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldAssetId, commonFormFieldCurrency, commonFormFieldGoodsBag, commonFormFieldGoodsBagEan, commonFormFieldGoodsBagInput, commonFormFieldGoodsBagQuantity, commonFormFieldLocation, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldOutputEntity, commonFormFieldOutputTypeEntity, commonFormFieldQuantity, commonFormFieldTags, envVariables as e, formCommonOptions, RouteKey, routes } from '../../app/config';
import { useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { SnackbarMessage, SnackbarSeverityType } from '../../components/snackbar-message/SnackbarMessage';
import { NewTransactionInput, useCausesLazyQuery, useTransactionNewMutation } from '../../generated/graphql';
import { AutocompleteAndSelectOptions, CurrencyCode, EntityType, FormDefaultValues, FormInputType, FormPropFields, GoodsBagItem, ResourceType, Tag, TransactionType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validateRegExpArray, validationMessage } from '../../utils';

// eslint-disable-next-line
let renderCount = 0;

type FormInputs = {
	transactionType: string;
	resourceType: string,
	// input/output entity object
	inputType: EntityType;
	input: string;
	outputType: EntityType;
	output: string;
	quantity: number;
	currency: string;
	assetId: string
	goods: Array<any> //[GoodsInput!]
	goodsBag: Array<GoodsBagItem>
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};

enum FormFieldNames {
	TRANSACTION_TYPE = 'transactionType',
	RESOURCE_TYPE = 'resourceType',
	INPUT_TYPE = 'inputType',
	INPUT = 'input',
	OUTPUT_TYPE = 'outputType',
	OUTPUT = 'output',
	QUANTITY = 'quantity',
	CURRENCY = 'currency',
	ASSET_ID = 'assetId',
	GOODS = 'goods',
	LOCATION = 'location',
	GOODS_BAG = 'goodsBag',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};

const defaultValues: FormDefaultValues = {
	transactionType: c.VALUES.undefined,
	resourceType: c.VALUES.undefined,
	inputType: EntityType.person,
	// inject by user profile id state
	input: '',
	outputType: c.VALUES.undefined,
	output: c.VALUES.undefined,
	quantity: 1,
	currency: 'EUR',
	assetId: '',
	goods: [],
	location: mokeFormData ? c.VALUES.mokeLocation : '',
	goodsBag: [{ barCode: '', quantity: 1 }],
	tags: mokeFormData ? c.VALUES.mokeTags : [],
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const TransactionUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// ----------------------------------------------------------------------------------------------------
	// effects
	// TODO: https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
	// TODO: https://developer.mozilla.org/pt-PT/docs/Web/API/Geolocation/Utilizacao_da_geolocalizacao
	// useEffect(() => {
	// 	navigator.geolocation.getCurrentPosition((position) => {
	// 		console.log("Latitude is :", position.coords.latitude);
	// 		console.log("Longitude is :", position.coords.longitude);
	// 	});
	// }, [])

	// TODO geoLocation
	// eslint-disable-next-line
	// const { location: currentLocation, error: currentError } = useCurrentLocation(c.GEOLOCATION_OPTIONS);
	// console.log(`currentLocation:[${currentLocation}]`);
	// ----------------------------------------------------------------------------------------------------

	// BOF of `DRY code shared with transactions & goods`

	// hooks styles
	const classes = useStyles();
	// hooks state
	// eslint-disable-next-line	
	const [state, dispatch] = useStateValue();
	const [lastTransactionType, setLastTransactionType] = useState<TransactionType>(TransactionType.transferFunds);
	// snackBar state
	const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues, setValue, trigger } = useForm<FormInputs>({
		// required to inject owner from state
		defaultValues: { ...defaultValues, input: state.user.profile.fiscalNumber },
		...formCommonOptions
	})
	// hooks: apollo
	const [transactionNewMutation, { loading, error: apolloError }] = useTransactionNewMutation();
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);

	const { fields, append, remove } = useFieldArray({
		// control props comes from useForm (optional: if you are using FormContext)
		control,
		// unique name for your Field Array
		name: 'goodsBag',
		// default to "id", you can change the key name
		// keyName: "id"
	});

	// output personOptions: require [] array to be a reference, not a primitive
	const [causeOptions, setCauseOptions] = useState<AutocompleteAndSelectOptions[]>([]);
	const [causeOptionsLoaded, setCauseOptionsLoaded] = useState<boolean>(false);
	const [causeQuery, { data: causeQueryData, loading: causeQueryLoading, error: causeQueryError }] = useCausesLazyQuery({
		fetchPolicy: e.apolloFetchPolicy,
		variables: { skip: 0, take: 50 }
	});
	if (!causeQueryData && !causeQueryLoading) { causeQuery(); };
	if (!causeOptionsLoaded && causeQueryData && !causeQueryLoading && !causeQueryError) {
		setCauseOptions(causeQueryData.causes.map((e) => {
			return { title: `${e.name}`, value: e.id }
		}));
		setCauseOptionsLoaded(true);
	}

	// customBag definition
	const goodsBag: any[] = watch('goodsBag');
	const maxGoodsItems = 10;
	// initialize any new refs, required to create refs outside of loop
	const goodsBagEanInputRef: any[] = [];
	goodsBagEanInputRef[0] = useRef(); goodsBagEanInputRef[1] = useRef(); goodsBagEanInputRef[2] = useRef(); goodsBagEanInputRef[3] = useRef(); goodsBagEanInputRef[4] = useRef(); goodsBagEanInputRef[5] = useRef(); goodsBagEanInputRef[6] = useRef(); goodsBagEanInputRef[7] = useRef(); goodsBagEanInputRef[8] = useRef(); goodsBagEanInputRef[9] = useRef();
	const goodsBagQuantityInputRef: any[] = [];
	goodsBagQuantityInputRef[0] = useRef(); goodsBagQuantityInputRef[1] = useRef(); goodsBagQuantityInputRef[2] = useRef(); goodsBagQuantityInputRef[3] = useRef(); goodsBagQuantityInputRef[4] = useRef(); goodsBagQuantityInputRef[5] = useRef(); goodsBagQuantityInputRef[6] = useRef(); goodsBagQuantityInputRef[7] = useRef(); goodsBagQuantityInputRef[8] = useRef(); goodsBagQuantityInputRef[9] = useRef();
	// goodsBagEan
	const goodsBagEan: FormPropFields = {
		...commonFormFieldGoodsBagEan(!causeOptionsLoaded),
	};
	// goodsBagQuantity
	const goodsBagQuantity: FormPropFields = {
		...commonFormFieldGoodsBagQuantity(!causeOptionsLoaded),
	};

	// DRY function shared with transactions & goods, have setValue, trigger, let it be simple
	const handleIncreaseDecreaseGood = (goodsBagArg: Array<GoodsBagItem>, index: number, value: number) => {
		const namePrefix = `goodsBag[${index}]`;
		// increase quantity			
		goodsBagArg[index].quantity = goodsBagArg[index].quantity + value;
		setValue(`${namePrefix}.quantity`, goodsBagArg[index].quantity);
		// trigger validation
		trigger(`${namePrefix}.barCode`);
		trigger(`${namePrefix}.quantity`);
	};

	// call function with all this magic local references
	const customGoodsBag = commonFormFieldGoodsBag(
		// FormFieldNames.GOODS_BAG was replaced with formFieldName
		FormFieldNames.GOODS_BAG,
		// useStyles
		classes,
		// useForm,
		control,
		errors,
		// useFieldArray
		remove,
		append,
		handleIncreaseDecreaseGood,
		// other
		loading,
		fields,
		goodsBag,
		goodsBagEan,
		goodsBagQuantity,
		goodsBagEanInputRef,
		goodsBagQuantityInputRef,
		causeOptionsLoaded,
		maxGoodsItems,
	)

	// debug
	renderCount++;

	// EOF of `DRY code shared with transactions & goods`

	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`values:${JSON.stringify(getValues(), undefined, 2)}`);
	// if (errors[FormFieldNames.GOODS_BAG]) console.log('errors', JSON.stringify(errors[FormFieldNames.GOODS_BAG][0].barCode, undefined, 2));
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);

	// watch
	const transactionType = watch(FormFieldNames.TRANSACTION_TYPE);
	const resourceType = watch(FormFieldNames.RESOURCE_TYPE);
	// require to use watch else getValues(FormFieldNames.x) don't work has expected
	const inputType = watch(FormFieldNames.INPUT_TYPE);
	const outputType = watch(FormFieldNames.OUTPUT_TYPE);

	// if transactionType Changed, reset resourceType to first option
	if (lastTransactionType !== transactionType) {
		//setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, c.VALUES.undefined); }, 100);
		if (transactionType === TransactionType.transferFunds && resourceType !== ResourceType.funds) {
			setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.funds); }, 100);
		} else if (transactionType === TransactionType.transferVolunteeringHours && resourceType !== ResourceType.volunteeringHours) {
			setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.volunteeringHours); }, 100);
		} else if (transactionType === TransactionType.transferGoods && resourceType !== ResourceType.genericGoods) {
			setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.genericGoods); }, 100);
		} else if (transactionType === TransactionType.transferAsset && resourceType !== ResourceType.physicalAsset) {
			setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.physicalAsset); }, 100);
		} else if (transactionType === c.VALUES.undefined) {
			setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, c.VALUES.undefined); }, 100);
		}
		// update lastTransactionType
		setLastTransactionType(transactionType);
	}

	const resourceTypeOptions = () => {
		switch (transactionType) {
			case TransactionType.transferFunds:
				return [
					{ title: c.I18N.resourceTypeOptionFunds, value: ResourceType.funds },
				]
			case TransactionType.transferVolunteeringHours:
				return [
					{ title: c.I18N.resourceTypeOptionVolunteeringHours, value: ResourceType.volunteeringHours },
				]
			case TransactionType.transferGoods:
				return [
					{ title: c.I18N.resourceTypeOptionGenericGoods, value: ResourceType.genericGoods },
				]
			case TransactionType.transferAsset:
				return [
					{ title: c.I18N.resourceTypeOptionPhysicalAsset, value: ResourceType.physicalAsset },
					{ title: c.I18N.resourceTypeOptionDigitalAsset, value: ResourceType.digitalAsset },
					{ title: c.I18N.resourceTypeOptionPhysicalVoucher, value: ResourceType.physicalVoucher },
					{ title: c.I18N.resourceTypeOptionDigitalVoucher, value: ResourceType.digitalVoucher },
				]
			default:
				return [];
		}
	}

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newTransactionData: NewTransactionInput = {
				transactionType: data.transactionType,
				resourceType: data.resourceType,
				input: {
					type: data.inputType,
					id: data.input,
				},
				output: {
					type: data.outputType,
					id: data.output,
				},
				// require to cast to number else fails on server validations
				quantity: Number(data.quantity),
				currency: data.currency,
				assetId: data.assetId,
				goods: goodsBag.map((e: GoodsBagItem) => {
					return {
						code: e.barCode, barCode: e.barCode, name: e.barCode, quantity: Number(e.quantity)
					}
				}),
				location: data.location,
				metaData: data.metaData ? JSON.parse(data.metaData) : {},
				metaDataInternal: data.metaDataInternal ? JSON.parse(data.metaDataInternal) : {},
			};

			// fire mutation
			const response = await transactionNewMutation({ variables: { newTransactionData: newTransactionData } });

			if (response) {
				// TODO: cleanup old result message
				// const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.transaction, id: response.data.transactionNew.id }) };
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
		[FormFieldNames.TRANSACTION_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.TRANSACTION_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.transferTypeLabel,
			rules: {
				// TODO create helper to validate enums
				validate: () => isValidEnum(TransactionType, getValues(FormFieldNames.TRANSACTION_TYPE))
					? true
					: validationMessage('required', FormFieldNames.TRANSACTION_TYPE)
			},
			options: () => [
				{ title: c.I18N.transactionTypeOptionTransferFunds, value: TransactionType.transferFunds },
				{ title: c.I18N.transactionTypeOptionTransferVolunteeringHours, value: TransactionType.transferVolunteeringHours },
				{ title: c.I18N.transactionTypeOptionTransferGoods, value: TransactionType.transferGoods },
				{ title: c.I18N.transactionTypeOptionTransferAsset, value: TransactionType.transferAsset },
			],
			disabled: !causeOptionsLoaded,
			// onChange: () => console.log('here'),
		},
		[FormFieldNames.RESOURCE_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.RESOURCE_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.resourceTypeLabel,
			rules: {
				validate: () => isValidEnum(ResourceType, getValues(FormFieldNames.RESOURCE_TYPE))
					? true
					: validationMessage('required', FormFieldNames.RESOURCE_TYPE)
			},
			options: () => resourceTypeOptions(),
			disabled: !causeOptionsLoaded || transactionType === c.VALUES.undefined,
			// visible: (control) => {
			// 	return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.TransferAsset);
			// }
		},
		[FormFieldNames.ASSET_ID]: {
			...commonFormFieldAssetId(useRef(), FormFieldNames.ASSET_ID, () => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferAsset)
			}),
			disabled: !causeOptionsLoaded,
		},
		// [FormFieldNames.INPUT_TYPE]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.SELECT,
		// 	name: FormFieldNames.INPUT_TYPE,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.inputTypeLabel,
		// 	// selection don't use placeHolder
		// 	// placeholder: c.VALUES.PHYSICAL_ASSET,
		// 	rules: {
		// 		validate: () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))
		// 			? true
		// 			: validationMessage('required', FormFieldNames.INPUT_TYPE)
		// 	},
		// 	options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
		// 	disabled: !causeOptionsLoaded,
		// },
		[FormFieldNames.INPUT_TYPE]: {
			...commonFormFieldOutputTypeEntity(useRef(), FormFieldNames.INPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))),
			// override outputLabel
			label: c.I18N.inputTypeLabel,
			disabled: !causeOptionsLoaded,
		},
		// [FormFieldNames.INPUT]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.TEXT,
		// 	name: FormFieldNames.INPUT,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.inputLabel,
		// 	placeholder: c.I18N.inputPlaceholder,
		// 	helperText: c.I18N.inputHelperText,
		// 	rules: {
		// 		// validate both regex uuid, fiscalNumber and mobilePhone
		// 		validate: () => validateRegExpArray(getValues(FormFieldNames.INPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone])
		// 			? true
		// 			: validationMessage('required', FormFieldNames.INPUT)
		// 	},
		// 	disabled: !causeOptionsLoaded,
		// 	// AUTOCOMPLETE
		// 	// options: personOptions,
		// 	// disableCloseOnSelect: false,
		// },
		[FormFieldNames.INPUT]: {
			...commonFormFieldOutputEntity(useRef(), FormFieldNames.INPUT, inputType,
				() => causeOptions,
				// visible
				() => { return (inputType !== c.VALUES.undefined); },
				// validate
				() => { return validateRegExpArray(getValues(FormFieldNames.INPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]) }
			),
			disabled: !causeOptionsLoaded,
			// override outputLabel
			label: c.I18N.inputLabel,
		},
		// [FormFieldNames.OUTPUT_TYPE]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.SELECT,
		// 	name: FormFieldNames.OUTPUT_TYPE,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.outputTypeLabel,
		// 	// selection don't use placeHolder
		// 	// placeholder: c.VALUES.PHYSICAL_ASSET,
		// 	rules: {
		// 		validate: () => isValidEnum(EntityType, getValues(FormFieldNames.OUTPUT_TYPE))
		// 			? true
		// 			: validationMessage('required', FormFieldNames.OUTPUT_TYPE)
		// 	},
		// 	options: () => c.ENTITY_TYPE_OPTIONS,
		// 	disabled: true,
		// },
		[FormFieldNames.OUTPUT_TYPE]: {
			...commonFormFieldOutputTypeEntity(useRef(), FormFieldNames.OUTPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.OUTPUT_TYPE))),
		},
		// [FormFieldNames.OUTPUT]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.SELECT,
		// 	name: FormFieldNames.OUTPUT,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.outputLabel,
		// 	placeholder: c.I18N.outputPlaceholder,
		// 	helperText: c.I18N.outputHelperText,
		// 	// AUTOCOMPLETE
		// 	// rules: {
		// 	// 	validate: () => validateRegExpObjectProperty(getValues(FormFieldNames.OUTPUT), 'value', c.REGEXP.uuid)
		// 	// 		? true
		// 	// 		: validationMessage('required', FormFieldNames.OUTPUT)
		// 	// },
		// 	rules: validationRuleRegExHelper(FormFieldNames.OUTPUT, c.REGEXP.uuid),
		// 	options: () => causeOptions,
		// 	disabled: !causeOptionsLoaded,
		// 	// disableCloseOnSelect: false,
		// },
		[FormFieldNames.OUTPUT]: {
			...commonFormFieldOutputEntity(useRef(), FormFieldNames.OUTPUT, outputType,
				() => causeOptions,
				// visible
				() => { return (outputType !== c.VALUES.undefined); },
				// validate
				() => { return validateRegExpArray(getValues(FormFieldNames.OUTPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]) }
			),
			disabled: !causeOptionsLoaded,
		},
		// [FormFieldNames.QUANTITY]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.NUMBER,
		// 	name: FormFieldNames.QUANTITY,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.quantityLabel,
		// 	placeholder: c.I18N.quantityPlaceHolder,
		// 	rules: validationRuleRegExHelper(FormFieldNames.QUANTITY, c.REGEXP.integerPositiveNonZero),
		// 	disabled: !causeOptionsLoaded,
		// 	visible: (control) => {
		// 		return (control.getValues(FormFieldNames.TRANSACTION_TYPE) !== TransactionType.transferGoods && control.getValues(FormFieldNames.TRANSACTION_TYPE) !== c.VALUES.undefined);
		// 	},
		// },
		[FormFieldNames.QUANTITY]: {
			...commonFormFieldQuantity(useRef(), FormFieldNames.QUANTITY, () => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) !== c.VALUES.undefined && transactionType !== TransactionType.transferGoods);
			}),
			disabled: !causeOptionsLoaded,
		},
		// [FormFieldNames.CURRENCY]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.SELECT,
		// 	name: FormFieldNames.CURRENCY,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.currencyLabel,
		// 	rules: {
		// 		validate: () => isValidEnum(CurrencyCode, getValues(FormFieldNames.CURRENCY))
		// 			? true
		// 			: validationMessage('required', FormFieldNames.CURRENCY)
		// 	},
		// 	options: () => [
		// 		{ title: c.I18N.currencyCodeEur, value: CurrencyCode.eur },
		// 		{ title: c.I18N.currencyCodeUsd, value: CurrencyCode.usd },
		// 	],
		// 	disabled: !causeOptionsLoaded,
		// 	visible: (control) => {
		// 		// required to check if is undefined and assume true as a default
		// 		return (!control.getValues(FormFieldNames.TRANSACTION_TYPE) || control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferFunds);
		// 	}
		// },
		[FormFieldNames.CURRENCY]: {
			...commonFormFieldCurrency(useRef(), FormFieldNames.CURRENCY,
				() => isValidEnum(CurrencyCode, getValues(FormFieldNames.CURRENCY)),
				// required to check if is undefined and assume true as a default
				() => (transactionType && transactionType === TransactionType.transferFunds),
			),
			disabled: !causeOptionsLoaded,
		},
		// [FormFieldNames.ASSET_ID]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.TEXT,
		// 	name: FormFieldNames.ASSET_ID,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.assetIdLabel,
		// 	placeholder: c.I18N.assetIdPlaceholder,
		// 	helperText: c.I18N.assetIdHelperText,
		// 	rules: validationRuleRegExHelper(FormFieldNames.ASSET_ID, c.REGEXP.uuid),
		// 	disabled: !causeOptionsLoaded,
		// 	visible: (control) => {
		// 		return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferAsset);
		// 	}
		// },
		[FormFieldNames.ASSET_ID]: {
			...commonFormFieldAssetId(useRef(), FormFieldNames.ASSET_ID, () => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferAsset)
			}),
			disabled: !causeOptionsLoaded,
		},
		[FormFieldNames.GOODS_BAG]: {
			...commonFormFieldGoodsBagInput(useRef(), FormFieldNames.GOODS_BAG, customGoodsBag, () => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferGoods);
			}),
			disabled: !causeOptionsLoaded,
		},
		[FormFieldNames.LOCATION]: {
			...commonFormFieldLocation(useRef(), FormFieldNames.LOCATION),
			disabled: !causeOptionsLoaded,
		},
		[FormFieldNames.TAGS]: {
			...commonFormFieldTags(useRef(), FormFieldNames.TAGS, () => (getValues(FormFieldNames.TAGS) as string[]).length > 0),
		},
		[FormFieldNames.META_DATA]: {
			...commonFormFieldMetadata(useRef(), FormFieldNames.META_DATA, () => isValidJsonObject(getValues(FormFieldNames.META_DATA))),
			disabled: !causeOptionsLoaded,
			visible: false,
		},
		[FormFieldNames.META_DATA_INTERNAL]: {
			...commonFormFieldMetadataInternal(useRef(), FormFieldNames.META_DATA_INTERNAL, () => isValidJsonObject(getValues(FormFieldNames.META_DATA_INTERNAL))),
			disabled: !causeOptionsLoaded,
			visible: false,
		},
	};

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.TRANSACTION_UPSERT_FORM].title}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					{generateFormButtonsDiv(classes, loading || !causeOptionsLoaded, handleResetHandler)}
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} className={classes.spacer} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
				<SnackbarMessage message={c.I18N.snackbarTransactionUpsertSuccess} severity={SnackbarSeverityType.SUCCESS} open={snackbarOpen} setOpen={setSnackbarOpen} />
				{/* <AlertMessage severity={AlertSeverityType.WARNING} message={c.I18N.transactionUpsertFormWip} /> */}
			</Box>
		</Fragment >
	);
}
