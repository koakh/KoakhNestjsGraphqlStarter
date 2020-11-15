import { Box } from '@material-ui/core';
import React, { Fragment, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldGoodsBag, commonFormFieldGoodsBagEan, commonFormFieldGoodsBagQuantity, commonFormFieldTags, envVariables as e, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewTransactionInput, useCausesLazyQuery, useTransactionNewMutation } from '../../generated/graphql';
import { AutocompleteAndSelectOptions, CurrencyCode, EntityType, FormDefaultValues, FormInputType, FormPropFields, GoodsBagItem, ModelType, ResourceType, Tag, TransactionType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, parseTemplate, useStyles, validateRegExpArray, validationMessage, validationRuleRegExHelper } from '../../utils';

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
	outputType: EntityType.cause,
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
	// hooks styles
	const classes = useStyles();
	// hooks state
	const [state, dispatch] = useStateValue();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues, setValue, trigger } = useForm<FormInputs>({
		// required to inject owner from state
		defaultValues: { ...defaultValues, input: state.user.profile.fiscalNumber },
		...formCommonOptions
	})
	// hooks: apollo
	const [transactionNewMutation, { loading, error: apolloError }] = useTransactionNewMutation();
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

	const { fields, append, remove, /*prepend, swap, move, insert*/ } = useFieldArray({
		// control props comes from useForm (optional: if you are using FormContext)
		control,
		// unique name for your Field Array
		name: 'goodsBag',
		// default to "id", you can change the key name
		// keyName: "id"
	});

	// not used anymore
	// // input personOptions: require [] array to be a reference, not a primitive
	// const [personOptions, setPersonOptions] = useState<AutocompleteOption[]>([]);
	// const [personOptionsLoaded, setPersonOptionsLoaded] = useState<boolean>(false);
	// const [personQuery, { data: personQueryData, loading: personQueryLoading, error: personQueryError }] = usePersonsLazyQuery({
	// 	fetchPolicy: e.apolloFetchPolicy,
	// 	variables: { skip: 0, take: 50 }
	// });
	// if (!personQueryData && !personQueryLoading) { personQuery(); };
	// if (!personOptionsLoaded && personQueryData && !personQueryLoading && !personQueryError) {
	// 	setPersonOptions(personQueryData.persons.map((e) => {
	// 		return { title: `${e.fiscalNumber}: ${e.username}`, value: e.id }
	// 	}));
	// 	setPersonOptionsLoaded(true);
	// }
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
	// watch
	const transactionType = watch(FormFieldNames.TRANSACTION_TYPE);
	const resourceType = watch(FormFieldNames.RESOURCE_TYPE);
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);

	// customBag definition
	const goodsBag: any[] = watch('goodsBag');
	// console.log(goodsBag);
	// https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks	
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
	// TODO: cleanup this refactored code
	// // required a key, this belongs to the loop of form components
	// const customGoodsBag = (<Fragment key='goods'>
	// 	{fields.map((item, index) => {
	// 		return (
	// 			<Grid key={item.id} container spacing={3}>
	// 				<Grid item xs={6}>
	// 					{generateTextField({
	// 						...goodsBagEan,
	// 						inputRef: goodsBagEanInputRef[index],
	// 						name: `goodsBag[${index}].barCode`,
	// 						defaultValue: item.barCode,
	// 						rules: validationBarCodeExHelper(`goodsBag[${index}].barCode`, goodsBag[index]),
	// 						helperTextFn: () => errors[FormFieldNames.GOODS_BAG] && errors[FormFieldNames.GOODS_BAG][index] && errors[FormFieldNames.GOODS_BAG][index].barCode !== undefined
	// 							? errors[FormFieldNames.GOODS_BAG][index].barCode.message
	// 							: goodsBagEan.helperText,
	// 						errorFn: () => errors[FormFieldNames.GOODS_BAG] && errors[FormFieldNames.GOODS_BAG][index] && errors[FormFieldNames.GOODS_BAG][index].barCode !== undefined,
	// 						onFocusFn: () => goodsBagEanInputRef[index].current.focus()
	// 					}, control, errors, loading)}
	// 				</Grid>
	// 				<Grid item xs={3}>
	// 					{generateTextField({
	// 						...goodsBagQuantity,
	// 						inputRef: goodsBagQuantityInputRef[index],
	// 						name: `goodsBag[${index}].quantity`,
	// 						defaultValue: item.quantity,
	// 						rules: validationRuleRegExHelper(`goodsBag[${index}].quantity`, c.REGEXP.floatPositive),
	// 						helperTextFn: () => errors[FormFieldNames.GOODS_BAG] && errors[FormFieldNames.GOODS_BAG][index] && errors[FormFieldNames.GOODS_BAG][index].quantity !== undefined
	// 							? errors[FormFieldNames.GOODS_BAG][index].quantity.message
	// 							: '',
	// 						errorFn: () => errors[FormFieldNames.GOODS_BAG] && errors[FormFieldNames.GOODS_BAG][index] && errors[FormFieldNames.GOODS_BAG][index].quantity !== undefined,
	// 						onFocusFn: () => goodsBagQuantityInputRef[index].current.focus()
	// 					}, control, errors, loading)}
	// 				</Grid>
	// 				<Grid item xs={3}>
	// 					<Button
	// 						type='button'
	// 						variant='contained'
	// 						className={classes.buttonGoodsDelete}
	// 						disabled={loading || index === 0}
	// 						onClick={() => remove(index)}
	// 						startIcon={<DeleteIcon />}
	// 						fullWidth
	// 					>
	// 						{c.I18N.delete}
	// 					</Button>
	// 				</Grid>
	// 			</Grid>
	// 		);
	// 	})}
	// 	<Button
	// 		type='button'
	// 		variant='contained'
	// 		className={classes.button}
	// 		disabled={loading || !causeOptionsLoaded || fields.length === maxGoodsItems}
	// 		onClick={() => append({ barCode: '', quantity: 1 })}
	// 	>
	// 		{c.I18N.add}
	// 	</Button>
	// </Fragment>);

	// TODO: share with transactions how? DUPLICATE
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

	// if (lastTransferType !== transactionType) {
	// 	lastTransferType = transactionType;
	// 	setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, c.VALUES.undefined); }, 100);
	// }
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`values:${JSON.stringify(getValues(), undefined, 2)}`);
	// if (errors[FormFieldNames.GOODS_BAG]) console.log('errors', JSON.stringify(errors[FormFieldNames.GOODS_BAG][0].barCode, undefined, 2));
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);
	if (transactionType === TransactionType.transferFunds && resourceType !== ResourceType.funds) {
		setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.funds); }, 100);
	} else if (transactionType === TransactionType.transferVolunteeringHours && resourceType !== ResourceType.volunteeringHours) {
		setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.volunteeringHours); }, 100);
	} else if (transactionType === TransactionType.transferGoods && resourceType !== ResourceType.genericGoods) {
		setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.genericGoods); }, 100);
	} else if (transactionType === TransactionType.transferAsset && resourceType !== ResourceType.physicalAsset) {
		setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.physicalAsset); }, 100);
	} else if (transactionType === c.VALUES.undefined && resourceType !== c.VALUES.undefined) {
		setTimeout(() => { setValue(FormFieldNames.RESOURCE_TYPE, c.VALUES.undefined); }, 100);
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
				]
			default:
				return [];
		}
	}

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// TODO: wip create a map function
			// const keys = Object.values(data);
			// const newTransactionDataTest: any = keys.map((e) => { return { [e]: (data as any)[e] } });
			// debugger;
			// TODO only send data from current transactionType
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
				// old selection box
				// goods: data.goods,
				goods: goodsBag.map((e: GoodsBagItem) => {
					return {
						code: e.barCode, barCode: e.barCode, name: e.barCode, quantity: Number(e.quantity)
					}
				}),
				location: data.location,
				metaData: data.metaData ? JSON.parse(data.metaData) : {},
				metaDataInternal: data.metaDataInternal ? JSON.parse(data.metaDataInternal) : {},
			};
			// TODO cleanup
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newTransactionData, undefined, 2));
			// debugger;
			const response = await transactionNewMutation({ variables: { newTransactionData: newTransactionData } });

			if (response) {
				const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.transaction, id: response.data.transactionNew.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
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
		[FormFieldNames.INPUT_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.INPUT_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputTypeLabel,
			// selection don't use placeHolder
			// placeholder: c.VALUES.PHYSICAL_ASSET,
			rules: {
				validate: () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))
					? true
					: validationMessage('required', FormFieldNames.INPUT_TYPE)
			},
			options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
			disabled: !causeOptionsLoaded,
		},
		[FormFieldNames.INPUT]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.INPUT,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: {
				// validate both regex uuid, fiscalNumber and mobilePhone
				validate: () => validateRegExpArray(getValues(FormFieldNames.INPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone])
					? true
					: validationMessage('required', FormFieldNames.INPUT)
			},
			disabled: !causeOptionsLoaded,
			// AUTOCOMPLETE
			// options: personOptions,
			// disableCloseOnSelect: false,
		},
		[FormFieldNames.OUTPUT_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.OUTPUT_TYPE,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.outputTypeLabel,
			// selection don't use placeHolder
			// placeholder: c.VALUES.PHYSICAL_ASSET,
			rules: {
				validate: () => isValidEnum(EntityType, getValues(FormFieldNames.OUTPUT_TYPE))
					? true
					: validationMessage('required', FormFieldNames.OUTPUT_TYPE)
			},
			options: () => c.ENTITY_TYPE_OPTIONS,
			disabled: true,
		},
		[FormFieldNames.OUTPUT]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.OUTPUT,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.outputLabel,
			placeholder: c.I18N.outputPlaceholder,
			helperText: c.I18N.outputHelperText,
			// AUTOCOMPLETE
			// rules: {
			// 	validate: () => validateRegExpObjectProperty(getValues(FormFieldNames.OUTPUT), 'value', c.REGEXP.uuid)
			// 		? true
			// 		: validationMessage('required', FormFieldNames.OUTPUT)
			// },
			rules: validationRuleRegExHelper(FormFieldNames.OUTPUT, c.REGEXP.uuid),
			options: () => causeOptions,
			disabled: !causeOptionsLoaded,
			// disableCloseOnSelect: false,
		},
		[FormFieldNames.QUANTITY]: {
			inputRef: useRef(),
			type: FormInputType.NUMBER,
			name: FormFieldNames.QUANTITY,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.quantityLabel,
			placeholder: c.I18N.quantityPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.QUANTITY, c.REGEXP.floatPositive),
			disabled: !causeOptionsLoaded,
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) !== TransactionType.transferGoods);
			},
		},
		[FormFieldNames.CURRENCY]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.CURRENCY,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.currencyLabel,
			rules: {
				validate: () => isValidEnum(CurrencyCode, getValues(FormFieldNames.CURRENCY))
					? true
					: validationMessage('required', FormFieldNames.CURRENCY)
			},
			options: () => [
				{ title: c.I18N.currencyCodeEur, value: CurrencyCode.eur },
				{ title: c.I18N.currencyCodeUsd, value: CurrencyCode.usd },
			],
			disabled: !causeOptionsLoaded,
			visible: (control) => {
				// required to check if is undefined and assume true as a default
				return (!control.getValues(FormFieldNames.TRANSACTION_TYPE) || control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferFunds);
			}
		},
		[FormFieldNames.ASSET_ID]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.ASSET_ID,
			controlProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetIdLabel,
			placeholder: c.I18N.assetIdPlaceholder,
			helperText: c.I18N.assetIdHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.ASSET_ID, c.REGEXP.uuid),
			disabled: !causeOptionsLoaded,
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferAsset);
			}
		},
		// add goods here, old goods that use a selection of array goods, used for prototype
		// [FormFieldNames.GOODS]: {
		// 	inputRef: useRef(),
		// 	type: FormInputType.SELECT,
		// 	name: FormFieldNames.GOODS,
		// 	controlProps: commonControlProps,
		// 	fullWidth: true,
		// 	label: c.I18N.goodsLabel,
		// 	placeholder: c.I18N.goodsPlaceHolder,
		// 	rules: {
		// 		validate: () => isValidJsonObject(getValues(FormFieldNames.GOODS))
		// 			? true
		// 			: validationMessage('invalid', FormFieldNames.GOODS)
		// 	},
		// 	options: () => c.GOODS_OPTIONS,
		// 	disabled: !causeOptionsLoaded,
		// 	visible: (control) => {
		// 		return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferGoods);
		// 	}
		// },
		[FormFieldNames.GOODS_BAG]: {
			inputRef: useRef(),
			type: FormInputType.CUSTOM,
			name: FormFieldNames.GOODS_BAG,
			controlProps: commonControlProps,
			fullWidth: true,
			label: 'Goods bag',
			placeholder: 'Goods placeHolder',
			disabled: !causeOptionsLoaded,
			custom: customGoodsBag,
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferGoods);
			}
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
			disabled: !causeOptionsLoaded,
		},
		[FormFieldNames.TAGS]: {
			...commonFormFieldTags(useRef(), FormFieldNames.TAGS, () => (getValues(FormFieldNames.TAGS) as string[]).length > 0),
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
			disabled: !causeOptionsLoaded,
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
			disabled: !causeOptionsLoaded,
		},
	};

	return (
		<Fragment>
			<PageTitle>{routes[RouteKey.TRANSACTION_UPSERT_FORM].title} [{renderCount}]</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					{generateFormButtonsDiv(classes, loading || !causeOptionsLoaded, handleResetHandler)}
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
		</Fragment >
	);
}
