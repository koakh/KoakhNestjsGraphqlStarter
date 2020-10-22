import { Box } from '@material-ui/core';
import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { appConstants as c } from '../../app';
import { envVariables as e, formCommonOptions, RouteKey, routes } from '../../app/config';
import { ActionType, useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { NewTransactionInput, useCausesLazyQuery, usePersonsLazyQuery, useTransactionNewMutation } from '../../generated/graphql';
import { AutocompleteOption, CurrencyCode, FormDefaultValues, FormInputType, FormPropFields, ResourceType, Tag, TransactionType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validateRegExpObjectProperty, validationMessage, validationRuleRegExHelper } from '../../utils';

let renderCount = 0;

type FormInputs = {
	transactionType: string;
	resourceType: string,
	// input/output entity object
	input: string;
	output: string;
	quantity: number;
	currency: string;
	assetId: string
	goods: Array<any> //[GoodsInput!]
	location?: string
	tags: Tag[],
	metaData?: any,
	metaDataInternal?: any,
};
enum FormFieldNames {
	TRANSACTION_TYPE = 'transactionType',
	RESOURCE_TYPE = 'resourceType',
	INPUT = 'input',
	OUTPUT = 'output',
	QUANTITY = 'quantity',
	CURRENCY = 'currency',
	ASSET_ID = 'assetId',
	GOODS = 'goods',
	LOCATION = 'location',
	TAGS = 'tags',
	META_DATA = 'metaData',
	META_DATA_INTERNAL = 'metaDataInternal',
};
const defaultValues: FormDefaultValues = {
	transactionType: TransactionType.TransferFunds,
	resourceType: ResourceType.Funds,
	// '4ea88521-031b-4279-9165-9c10e1839001',
	input: '',
	output: '4ea88521-031b-4279-9165-9c10e1838010',
	quantity: 10,
	currency: 'EUR',
	assetId: '16834df0-766d-4cc8-8baa-b0c37338ca34',
	goods: [],
	location: '12.1890144,-28.5171909',
	tags: [],
	metaData: '{}',
	metaDataInternal: '{}',
};

// use RouteComponentProps to get history props from Route
export const TransactionUpsertForm: React.FC<RouteComponentProps> = ({ history }) => {
	// hooks styles
	const classes = useStyles();
	// hooks react form
	const { handleSubmit, watch, errors, control, reset, getValues, setValue } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [causeNewMutation, { loading, error: apolloError }] = useTransactionNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// input personOptions: require [] array to be a reference, not a primitive
	const [personOptions, setPersonOptions] = useState<AutocompleteOption[]>([]);
	const [personOptionsLoaded, setPersonOptionsLoaded] = useState<boolean>(false);
	const [personQuery, { data: personQueryData, loading: personQueryLoading, error: personQueryError }] = usePersonsLazyQuery({
		fetchPolicy: e.apolloFetchPolicy,
		variables: { skip: 0, take: 50 }
	});
	if (!personQueryData && !personQueryLoading) { personQuery(); };
	if (!personOptionsLoaded && personQueryData && !personQueryLoading && !personQueryError) {
		setPersonOptions(personQueryData.persons.map((e) => {
			return { title: `${e.fiscalNumber}: ${e.username}`, value: e.id }
		}));
		setPersonOptionsLoaded(true);
	}
	// output personOptions: require [] array to be a reference, not a primitive
	const [causeOptions, setCauseOptions] = useState<AutocompleteOption[]>([]);
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
	// used in result state message
	const transactionType = watch(FormFieldNames.TRANSACTION_TYPE);
	const resourceType = watch(FormFieldNames.RESOURCE_TYPE);
	// TODO remove after fix forword message
	const name = transactionType;
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	renderCount++;
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);
	// console.log(`goods:${JSON.stringify(getValues(FormFieldNames.GOODS), undefined, 2)}`);
	// console.log(`input:${JSON.stringify(getValues(FormFieldNames.INPUT), undefined, 2)}`);
	// console.log(`transactionType:${getValues(FormFieldNames.TRANSACTION_TYPE)}`);
	// console.log('TRANSACTION_TYPE', name);
	if (transactionType === TransactionType.TransferFunds && resourceType !== ResourceType.Funds) {
		setTimeout(() => {
			// TODO
			// setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.Funds);
		}, 100);
	}
	if (transactionType === TransactionType.TransferVolunteeringHours && resourceType !== ResourceType.VolunteeringHours) {
		setTimeout(() => {
			// TODO
			// setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.VolunteeringHours);
		}, 100);
	}
	if (transactionType === TransactionType.TransferGoods && resourceType !== ResourceType.GenericGoods) {
		setTimeout(() => {
			// TODO
			// setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.GenericGoods);
		}, 100);
	}
	if (transactionType === TransactionType.TransferAsset && resourceType !== ResourceType.PhysicalAsset) {
		setTimeout(() => {
			// TODO
			// setValue(FormFieldNames.RESOURCE_TYPE, ResourceType.PhysicalAsset);
		}, 100);
	}

	const handleResetHandler = async () => { reset(defaultValues, {}) };
	const handleSubmitHandler = async (data: FormInputs) => {
		try {
			// TODO: wip 
			const keys = Object.values(data);
			const newTransactionDataTest: any = keys.map((e) => { return { [e]: (data as any)[e] } });
			debugger;
			const newTransactionData: NewTransactionInput = {
				transactionType: data.transactionType,
				resourceType: data.resourceType,
				// TODO: must get owner type on chaincode side, from uuid
				input: {
					type: 'com.chain.solidary.model.person',
					id: data.input,
				},
				// TODO: must get owner type on chaincode side, from uuid
				output: {
					type: 'com.chain.solidary.model.person',
					id: data.output,
				},
				quantity: data.quantity,
				currency: data.currency,
				assetId: data.assetId,
				goods: data.goods,
				location: data.location,
				tags: data.tags.map((e: Tag) => e.value),
				metaData: JSON.parse(data.metaData),
				metaDataInternal: JSON.parse(data.metaDataInternal),
			};
			debugger;
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newTransactionData, undefined, 2));
			const response = await causeNewMutation({ variables: { newTransactionData: newTransactionData } });

			if (response) {
				// TODO: finish result message
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
		[FormFieldNames.TRANSACTION_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.TRANSACTION_TYPE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.transferTypeLabel,
			rules: {
				validate: () => isValidEnum(TransactionType, getValues(FormFieldNames.TRANSACTION_TYPE))
					? true
					: validationMessage('required', FormFieldNames.TRANSACTION_TYPE)
			},
			// TODO can be object or function, better to always be a function
			options: [
				{ title: c.I18N.transactionTypeTransferFunds, value: TransactionType.TransferFunds },
				{ title: c.I18N.transactionTypeTransferVolunteeringHours, value: TransactionType.TransferVolunteeringHours },
				{ title: c.I18N.transactionTypeTransferGoods, value: TransactionType.TransferGoods },
				{ title: c.I18N.transactionTypeTransferAsset, value: TransactionType.TransferAsset },
			],
			// onChange: () => console.log('here'),
		},
		[FormFieldNames.RESOURCE_TYPE]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.RESOURCE_TYPE,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.resourceTypeLabel,
			rules: {
				validate: () => isValidEnum(ResourceType, getValues(FormFieldNames.RESOURCE_TYPE))
					? true
					: validationMessage('required', FormFieldNames.RESOURCE_TYPE)
			},
			// TODO array or function, to use dynamic options
			options: [
				{ title: c.I18N.resourceTypeFunds, value: ResourceType.Funds },
				{ title: c.I18N.resourceTypeVolunteeringHours, value: ResourceType.VolunteeringHours },
				{ title: c.I18N.resourceTypeGenericGoods, value: ResourceType.GenericGoods },
				{ title: c.I18N.resourceTypePhysicalAsset, value: ResourceType.PhysicalAsset },
				{ title: c.I18N.resourceTypeDigitalAsset, value: ResourceType.DigitalAsset },
			],
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.TransferAsset);
			}
		},
		[FormFieldNames.INPUT]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.INPUT,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: {
				validate: () => validateRegExpObjectProperty(getValues(FormFieldNames.INPUT), 'value', c.REGEXP.uuid)
					? true
					: validationMessage('required', FormFieldNames.INPUT)
			},
			disabled: !causeOptionsLoaded,
			options: causeOptions,
			disableCloseOnSelect: false,
		},
		[FormFieldNames.OUTPUT]: {
			inputRef: useRef(),
			type: FormInputType.AUTOCOMPLETE,
			name: FormFieldNames.OUTPUT,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: {
				validate: () => validateRegExpObjectProperty(getValues(FormFieldNames.OUTPUT), 'value', c.REGEXP.uuid)
					? true
					: validationMessage('required', FormFieldNames.OUTPUT)
			},
			disabled: !personOptionsLoaded,
			options: personOptions,
			disableCloseOnSelect: false,
		},
		[FormFieldNames.QUANTITY]: {
			inputRef: useRef(),
			type: FormInputType.NUMBER,
			name: FormFieldNames.QUANTITY,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.quantityLabel,
			placeholder: c.I18N.quantityPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.QUANTITY, c.REGEXP.floatPositive),
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) !== TransactionType.TransferGoods);
			}
		},
		[FormFieldNames.CURRENCY]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.CURRENCY,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.currencyLabel,
			rules: {
				validate: () => isValidEnum(CurrencyCode, getValues(FormFieldNames.CURRENCY))
					? true
					: validationMessage('required', FormFieldNames.CURRENCY)
			},
			options: [
				{ title: c.I18N.currencyCodeEur, value: CurrencyCode.eur },
				{ title: c.I18N.currencyCodeUsd, value: CurrencyCode.usd },
			],
			visible: (control) => {
				// required to check if is undefined and assume true as a default
				return (!control.getValues(FormFieldNames.TRANSACTION_TYPE) || control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.TransferFunds);
			}
		},
		[FormFieldNames.ASSET_ID]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.ASSET_ID,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.assetIdLabel,
			placeholder: c.I18N.assetIdPlaceholder,
			helperText: c.I18N.assetIdHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.ASSET_ID, c.REGEXP.uuid),
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.TransferAsset);
			}
		},
		// TODO | WIP
		// add goods here
		[FormFieldNames.GOODS]: {
			inputRef: useRef(),
			type: FormInputType.SELECT,
			name: FormFieldNames.GOODS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.goodsLabel,
			placeholder: c.I18N.goodsPlaceHolder,
			rules: {
				validate: () => isValidJsonObject(getValues(FormFieldNames.GOODS))
					? true
					: validationMessage('invalid', FormFieldNames.GOODS)
			},
			options: c.GOODS_OPTIONS,
			visible: (control) => {
				return (control.getValues(FormFieldNames.TRANSACTION_TYPE) === TransactionType.TransferGoods);
			}
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
			<PageTitle>{routes[RouteKey.TRANSACTION_UPSERT_FORM].title} [{renderCount}]</PageTitle>
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
