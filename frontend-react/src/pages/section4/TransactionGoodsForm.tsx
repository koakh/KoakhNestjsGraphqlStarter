import { Box, Button, ButtonGroup, Switch } from '@material-ui/core';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
// import { useBarcodeScanner} from 'react-barcode-reader'
import { useFieldArray, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldGoodsBag, commonFormFieldGoodsBagEan, commonFormFieldGoodsBagQuantity, commonFormFieldLocation, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldOutputEntity, commonFormFieldOutputTypeEntity, envVariables as e, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewTransactionInput, useCausesLazyQuery, useTransactionNewMutation } from '../../generated/graphql';
import { AutocompleteAndSelectOptions, EntityType, FormDefaultValues, FormInputType, FormPropFields, GoodsBagItem, ModelType, ResourceType, Tag, TransactionType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, parseTemplate, useStyles } from '../../utils';

let renderCount = 0;

type FormInputs = {
	outputType: EntityType;
	output: string;
	goodsBag: Array<GoodsBagItem>
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	OUTPUT_TYPE = 'outputType',
	OUTPUT = 'output',
	GOODS_BAG = 'goodsBag',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	outputType: EntityType.cause,
	output: c.VALUES.undefined,
	goodsBag: [{ barCode: '', quantity: 1 }],
	location: mokeFormData ? c.VALUES.mokeLocation : '',
	tags: mokeFormData ? c.VALUES.mokeTags : [],
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const TransactionGoodsForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks state
	const [state, dispatch] = useStateValue();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues, setValue } = useForm<FormInputs>({ defaultValues, ...formCommonOptions });
	// hooks: apollo
	const [transactionNewMutation, { loading, error: apolloError }] = useTransactionNewMutation();
	const { fields, append, remove } = useFieldArray({
		// control props comes from useForm (optional: if you are using FormContext)
		control,
		// unique name for your Field Array
		name: 'goodsBag',
		// default to "id", you can change the key name
		// keyName: "id"
	});
	// useState
	const [barCodeResult, setBarCodeResult] = useState<{ result: string }>({ result: 'no result scanned' })
	const [scanning, setScanning] = useState(false);
	const handleToggleScan = (event: React.ChangeEvent<HTMLInputElement>) => {
		setScanning(event.target.checked);
	};

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
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);

	// customBag definition
	const goodsBag: Array<GoodsBagItem> = watch('goodsBag');
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
	// const goodsBagQuantity: FormPropFields = {
	// 	// inputRef: refs // will be initialized in fieldsMap
	// 	type: FormInputType.TEXT,
	// 	name: null,
	// 	controlProps: commonControlProps,
	// 	fullWidth: true,
	// 	label: c.I18N.quantityLabel,
	// 	placeholder: c.I18N.quantityPlaceHolder,
	// 	disabled: !causeOptionsLoaded,
	// };
	// required a key, this belongs to the loop of form components
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
	// 		className={classes.buttonGoodsAdd}
	// 		disabled={loading || !causeOptionsLoaded || fields.length === maxGoodsItems}
	// 		onClick={() => append({ barCode: '', quantity: 1 })}
	// 	>
	// 		{c.I18N.add}
	// 	</Button>
	// </Fragment>);

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
		// other
		loading || scanning,
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

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newTransactionData: NewTransactionInput = {
				transactionType: TransactionType.transferGoods,
				resourceType: ResourceType.genericGoods,
				input: {
					type: EntityType.person,
					id: state.user.profile.id,
				},
				output: {
					type: EntityType.cause,
					id: data.output,
				},
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
			console.log(JSON.stringify(newTransactionData, undefined, 2));
			const response = await transactionNewMutation({ variables: { newTransactionData: newTransactionData } });

			if (response) {
				const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.transaction, id: response.data.transactionNew.id }) };
				dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				history.push({ pathname: routes.RESULT_PAGE.path });
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	// console.log(`goodsBag: [${JSON.stringify(goodsBag, undefined, 2)}]`);

	// TODO add INC / DEC Buttons useful for Touch Mobile to inc dec/ if (disable - if 1)
	// TODO: add type
	// TODO notes get product info from api in graphql server, store info in neo4j NODE Product
	// TODO : only add if is a valid eancode use lib npm, else show TOAST invalid barCode
	// { barCode: '', quantity: 1 }
	const addToGoodsBag = (goodsBagArg: Array<GoodsBagItem>, barCode: string) => {
		const index = goodsBagArg.findIndex((e: GoodsBagItem) => e.barCode === barCode);
		// add quantity
		if (index > -1) {
			++goodsBagArg[index].quantity;
			setValue(`goodsBag[${index}].quantity`, goodsBagArg[index].quantity);
		} else {
			// get first empty input, useful to fill first, and other empty that was added
			const indexEmpty = goodsBagArg.findIndex((e: GoodsBagItem) => {
				return e.barCode === ''
			});
			console.log(`indexEmpty: [${indexEmpty}]`);
			if (indexEmpty > -1) {
				setValue(`goodsBag[${indexEmpty}].barCode`, barCode);
				setValue(`goodsBag[${indexEmpty}].quantity`, 1);
			} else {
				append({ barCode, quantity: 1 });
			}
		}
	}
	// barcodeReader handlers
	const handleBarcodeReaderError = (error: any) => {
		console.error(error);
	}
	// handleBarcodeReaderScan = handleBarcodeReaderScan.bind(this);
	// hw to use bind in rfc: https://stackoverflow.com/questions/53215067/how-can-i-bind-function-with-hooks-in-react
	const handleBarcodeReaderScan = useCallback(
		(data: any) => {
			console.log(`read data '${data}'`);
			addToGoodsBag(goodsBag, data);
		},
		// TODO: the trick is use [goodsBag] to pass current reference
		// Tells React to memoize regardless of arguments.
		[goodsBag],
	);

	const formDefinition: Record<string, FormPropFields> = {
		[FormFieldNames.OUTPUT_TYPE]: {
			...commonFormFieldOutputTypeEntity(useRef(), FormFieldNames.OUTPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.OUTPUT_TYPE))),
		},
		[FormFieldNames.OUTPUT]: {
			...commonFormFieldOutputEntity(useRef(), FormFieldNames.OUTPUT, () => causeOptions, !causeOptionsLoaded),
		},
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
			// TODO: removed from goodsForm, must exists in transactionForm
			// visible: (control) => {
			// 	return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.transferGoods);
			// }
		},
		[FormFieldNames.LOCATION]: {
			...commonFormFieldLocation(useRef(), FormFieldNames.LOCATION),
			disabled: !causeOptionsLoaded,
			visible: false,
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
			<PageTitle>{routes[RouteKey.TRANSACTION_UPSERT_FORM].title} [{renderCount}]</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					<Switch
						checked={scanning}
						onChange={handleToggleScan}
						name='toggleScan'
					/>
					{generateFormButtonsDiv(classes, loading || !causeOptionsLoaded, handleResetHandler)}
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} />}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			</Box>
			{/* TODO */}
			<BarcodeReader
				timeBeforeScanTest={250}
				onScan={handleBarcodeReaderScan}
				onError={handleBarcodeReaderError}
			/>
		</Fragment >
	);
}
