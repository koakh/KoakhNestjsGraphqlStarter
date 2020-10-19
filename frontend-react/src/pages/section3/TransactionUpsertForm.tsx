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
import { NewTransactionInput, useTransactionNewMutation } from '../../generated/graphql';
import { CurrencyCode, FormDefaultValues, FormInputType, FormPropFields, ResourceType, Tag, TransactionType } from '../../types';
import { commonControlProps, generateFormButtonsDiv, generateFormDefinition, getGraphQLApolloError, isValidEnum, isValidJsonObject, useStyles, validationMessage, validationRuleRegExHelper } from '../../utils';

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
	input: '4ea88521-031b-4279-9165-9c10e1839001',
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
	const { handleSubmit, watch, errors, control, reset, getValues } = useForm<FormInputs>({ defaultValues, ...formCommonOptions })
	// hooks: apollo
	const [causeNewMutation, { loading, error: apolloError }] = useTransactionNewMutation();
	// hooks state
	const [, dispatch] = useStateValue();
	// used in result state message
	const name = watch(FormFieldNames.TRANSACTION_TYPE);
	// extract error message
	const errorMessage = getGraphQLApolloError(apolloError);
	// debug
	// console.log('errors', JSON.stringify(errors, undefined, 2));
	// console.log(`tags:${JSON.stringify(getValues(FormFieldNames.TAGS), undefined, 2)}`);
	// console.log(`transactionType:${getValues(FormFieldNames.TRANSACTION_TYPE)}`);

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
			// console.log(JSON.stringify(data, undefined, 2));
			// console.log(JSON.stringify(newTransactionData, undefined, 2));
			const response = await causeNewMutation({ variables: { newTransactionData: newTransactionData } });

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
			options: [
				{ title: c.I18N.transactionTypeTransferFunds, value: TransactionType.TransferFunds },
				{ title: c.I18N.transactionTypeTransferVolunteeringHours, value: TransactionType.TransferVolunteeringHours },
				{ title: c.I18N.transactionTypeTransferGoods, value: TransactionType.TransferGoods },
				{ title: c.I18N.transactionTypeTransferAsset, value: TransactionType.TransferAsset },
			],
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
			options: [
				{ title: c.I18N.resourceTypeFunds, value: ResourceType.Funds },
				{ title: c.I18N.resourceTypeVolunteeringHours, value: ResourceType.VolunteeringHours },
				{ title: c.I18N.resourceTypeGenericGoods, value: ResourceType.GenericGoods },
				{ title: c.I18N.resourceTypePhysicalAsset, value: ResourceType.PhysicalAsset },
				{ title: c.I18N.resourceTypeDigitalAsset, value: ResourceType.DigitalAsset },
			],
		},
		[FormFieldNames.INPUT]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.INPUT,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.inputLabel,
			placeholder: c.I18N.inputPlaceholder,
			helperText: c.I18N.inputHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.INPUT, c.REGEXP.uuid),
		},
		[FormFieldNames.OUTPUT]: {
			inputRef: useRef(),
			type: FormInputType.TEXT,
			name: FormFieldNames.OUTPUT,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.outputLabel,
			placeholder: c.I18N.outputPlaceholder,
			helperText: c.I18N.outputHelperText,
			rules: validationRuleRegExHelper(FormFieldNames.OUTPUT, c.REGEXP.uuid),
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
			type: FormInputType.TEXT,
			name: FormFieldNames.GOODS,
			controllProps: commonControlProps,
			fullWidth: true,
			label: c.I18N.goodsLabel,
			placeholder: c.I18N.goodsPlaceHolder,
			rules: validationRuleRegExHelper(FormFieldNames.GOODS, c.REGEXP.alphaNumeric),
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
			<PageTitle>{routes[RouteKey.TRANSACTION_UPSERT_FORM].title}</PageTitle>
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
