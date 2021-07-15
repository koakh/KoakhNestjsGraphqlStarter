import { Box, FormControlLabel, Switch } from '@material-ui/core';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
// import { useBarcodeScanner} from 'react-barcode-reader'
import { useFieldArray, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c, mokeFormData } from '../../app';
import { commonFormFieldGoodsBag, commonFormFieldGoodsBagEan, commonFormFieldGoodsBagInput, commonFormFieldGoodsBagQuantity, commonFormFieldLocation, commonFormFieldMetadata, commonFormFieldMetadataInternal, commonFormFieldOutputEntity, commonFormFieldOutputTypeEntity, envVariables as e, formCommonOptions, RouteKey, routes } from '../../app/config';
import { useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { SnackbarMessage, SnackbarSeverityType } from '../../components/snackbar-message';
import { NewTransactionInput, useCausesLazyQuery, useTransactionNewMutation } from '../../generated/graphql';
import { AutocompleteAndSelectOptions, EntityType, FormDefaultValues, FormPropFields, GoodsBagItem, ResourceType, Tag, TransactionType } from '../../types';
import { generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validateRegExpArray } from '../../utils';

// eslint-disable-next-line
let renderCount = 0;

type FormInputs = {
	inputType: EntityType;
	input: string;
	outputType: EntityType;
	output: string;
	goodsBag: Array<GoodsBagItem>
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	INPUT_TYPE = 'inputType',
	INPUT = 'input',
	OUTPUT_TYPE = 'outputType',
	OUTPUT = 'output',
	GOODS_BAG = 'goodsBag',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	inputType: c.VALUES.undefined,
	input: '',
	outputType: c.VALUES.undefined,
	output: c.VALUES.undefined,
	goodsBag: [{ barCode: '', quantity: 1 }],
	location: mokeFormData ? c.VALUES.mokeLocation : '',
	tags: mokeFormData ? c.VALUES.mokeTags : [],
	metaData: '',
	metaDataInternal: '',
};

// use RouteComponentProps to get history props from Route
export const TransactionGoodsForm: React.FC<RouteComponentProps> = ({ history }) => {
	// BOF of `DRY code shared with transactions & goods`

	// hooks styles
	const classes = useStyles();
	// hooks state
	// eslint-disable-next-line
	const [state, dispatch] = useStateValue();
	// state
	const [locked, setLocked] = useState<boolean>(false)
	// snackBar state
	const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues, setValue, trigger } = useForm<FormInputs>({ defaultValues, ...formCommonOptions });
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

	// DRY function shared with transactions & goods, have setValue, trigger, let it be simple
	const handleIncreaseDecreaseGood = (goodsBagArg: Array<GoodsBagItem>, index: number, value: number) => {
		const namePrefix = `goodsBag[${index}]`;
		// increase quantity, require to parseInt ex when user types on input it will be a string
		goodsBagArg[index].quantity = parseInt(goodsBagArg[index].quantity.toString()) + value;
		setValue(`${namePrefix}.quantity`, goodsBagArg[index].quantity);
		// trigger validation
		trigger(`${namePrefix}.barCode`);
		trigger(`${namePrefix}.quantity`);
	}

	// DRY function shared with transactions & goods
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

	// require to use watch else getValues(FormFieldNames.x) don't work has expected
	const inputType = watch(FormFieldNames.INPUT_TYPE);
	const outputType = watch(FormFieldNames.OUTPUT_TYPE);
	const output = watch(FormFieldNames.OUTPUT);

	// TODO
	// console.log(JSON.stringify(data, undefined, 2));
	// console.log(JSON.stringify(newTransactionData, undefined, 2));

	// locked switch
	const handleLockedSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocked(event.target.checked);
	};

	const handleResetHandler = async () => { reset(defaultValues, {}); setLocked(false); };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			const newTransactionData: NewTransactionInput = {
				transactionType: TransactionType.transferGoods,
				resourceType: ResourceType.genericGoods,
				input: {
					// type: EntityType.person,
					// id: state.user.profile.id,
					type: data.inputType,
					id: data.input,
				},
				output: {
					// type: EntityType.cause,
					type: data.outputType,
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

			// fire mutation
			const response = await transactionNewMutation({ variables: { newTransactionData: newTransactionData } });

			if (response) {
				// TODO: cleanUp
				// const payload = { message: parseTemplate(c.I18N.newModelCreatedSuccessfully, { model: ModelType.transaction, id: response.data.transactionNew.id }) };
				// dispatch({ type: ActionType.RESULT_MESSAGE, payload });
				// history.push({ pathname: routes.RESULT_PAGE.path });
				setSnackbarOpen(true);
				// reset();
				// reset();
				setValue(`goodsBag`, defaultValues.goodsBag);
				setValue('input', '');
			}
		} catch (error) {
			// don't throw here else we catch react app, errorMessage is managed in `getGraphQLApolloError(apolloError)`
			// console.error('graphQLErrors' in errors && error.graphQLErrors[0] ? JSON.stringify(error.graphQLErrors[0].message, undefined, 2) : error);
		}
	};

	// barCode handler function
	const addToGoodsBag = (goodsBagArg: Array<GoodsBagItem>, barCode: string) => {
		const index = goodsBagArg.findIndex((e: GoodsBagItem) => e.barCode === barCode);
		const namePrefix = `goodsBag[${index}]`;
		// add quantity
		if (index > -1) {
			handleIncreaseDecreaseGood(goodsBagArg, index, 1);
		} else {
			// get first empty input, useful to fill first, and other empty that was added
			const indexEmpty = goodsBagArg.findIndex((e: GoodsBagItem) => {
				return e.barCode === ''
			});
			// if found an empty slot
			if (indexEmpty > -1) {
				setValue(`goodsBag[${indexEmpty}].barCode`, barCode);
				setValue(`goodsBag[${indexEmpty}].quantity`, 1);
				// trigger validation
				trigger(`${namePrefix}.barCode`);
				trigger(`${namePrefix}.quantity`);
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
	// how to use bind in rfc: https://stackoverflow.com/questions/53215067/how-can-i-bind-function-with-hooks-in-react
	const handleBarcodeReaderScan = useCallback(
		(data: any) => {
			console.log(`read data '${data}'`);
			addToGoodsBag(goodsBag, data);
		},
		// bind of class components is used with useCallback
		// the trick is use [goodsBag] to pass current reference
		// tells React to memoize regardless of arguments.
		// eslint-disable-next-line
		[goodsBag],
	);

	const formDefinition: Record<string, FormPropFields> = {
		// TODO
		// [FormFieldNames.INPUT_TYPE]: {
		// 	...commonFormFieldInputTypeEntity(useRef(), FormFieldNames.INPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))),
		// },
		// [FormFieldNames.INPUT]: {
		// 	...commonFormFieldInputEntity(useRef(), FormFieldNames.INPUT, () => causeOptions, !causeOptionsLoaded),
		// },
		[FormFieldNames.INPUT_TYPE]: {
			...commonFormFieldOutputTypeEntity(useRef(), FormFieldNames.INPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.INPUT_TYPE))),
			disabled: !causeOptionsLoaded || locked,
			// override outputLabel
			label: c.I18N.inputTypeLabel,
		},
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
		[FormFieldNames.OUTPUT_TYPE]: {
			...commonFormFieldOutputTypeEntity(useRef(), FormFieldNames.OUTPUT_TYPE, () => isValidEnum(EntityType, getValues(FormFieldNames.OUTPUT_TYPE))),
			disabled: !causeOptionsLoaded || locked,
		},
		[FormFieldNames.OUTPUT]: {
			...commonFormFieldOutputEntity(useRef(), FormFieldNames.OUTPUT, outputType,
				() => causeOptions,
				// visible
				() => { return (outputType !== c.VALUES.undefined); },
				// validate
				() => { return validateRegExpArray(getValues(FormFieldNames.OUTPUT), [c.REGEXP.uuid, c.REGEXP.fiscalNumber, c.REGEXP.mobilePhone]) }
			),
			disabled: !causeOptionsLoaded || locked,
		},
		[FormFieldNames.GOODS_BAG]: {
			...commonFormFieldGoodsBagInput(useRef(), FormFieldNames.GOODS_BAG, customGoodsBag),
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
			<PageTitle>{routes[RouteKey.TRANSACTION_GOODS_FORM].title}</PageTitle>
			<Box component='span' m={1}>
				{/* 'handleSubmit' will validate your inputs before invoking 'onSubmit' */}
				<form
					className={classes.root} noValidate autoComplete='off'
					onSubmit={handleSubmit((data) => handleSubmitHandler(data))}
				>
					{generateFormDefinition(formDefinition, control, errors, loading)}
					{generateFormButtonsDiv(classes, loading || !causeOptionsLoaded, handleResetHandler)}
					<FormControlLabel control={
						<Switch
							name='toggleLocked'
							checked={locked}
							onChange={handleLockedSwitch}
							disabled={!(causeOptionsLoaded && inputType && outputType && output)}
						/>}
						label="Locked"
					/>
				</form>
				{apolloError && <AlertMessage severity={AlertSeverityType.ERROR} message={errorMessage} className={classes.spacer}/>}
				{/* {apolloError && <pre>{JSON.stringify(apolloError.graphQLErrors[0].message, undefined, 2)}</pre>} */}
				{loading && <LinearIndeterminate />}
			<SnackbarMessage message={c.I18N.snackbarTransactionUpsertSuccess} severity={SnackbarSeverityType.SUCCESS} open={snackbarOpen} setOpen={setSnackbarOpen} />
			{/* <AlertMessage severity={AlertSeverityType.WARNING} message={c.I18N.transactionGoodsFormWip} /> */}
			<BarcodeReader
				timeBeforeScanTest={250}
				onScan={handleBarcodeReaderScan}
				onError={handleBarcodeReaderError}
			/>
			</Box>
		</Fragment >
	);
}
