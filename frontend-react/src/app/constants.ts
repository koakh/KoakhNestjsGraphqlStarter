/* eslint-disable no-template-curly-in-string */
import { AssetType, EntityType, GoodsOptions } from "../types";

export const mokeFormData = false;

const VALUES: { [key: string]: any } = {
  // used in selection box's, unselected value
  undefined: '',
  defaultCurrency: 'EUR',
  // used in signIn to clear message
  resultMessageTimeOut: 5000,
  // admin, johndoe
  mokeAmbassadors: '4ea88521-031b-4279-9165-9c10e1839000 PT182692124',
  mokeLocation: '12.1890144,-28.5171909',
  mokePassword: 'Aa456#45',
  mokeTags: [
    { title: 'Nature', value: 'NATURE' },
    { title: 'Economy', value: 'ECONOMY' },
  ],
  dataGridPageSize: 6,
}

const I18N: { [key: string]: string } = {
  // keywords
  undefined: 'Undefined',
  error: 'Error',
  register: 'Register',
  username: 'Username',
  password: 'Password',
  reset: 'Reset',
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
  increase: 'Increase',
  decrease: 'Decrease',
  add: 'Add',
  required: 'required',
  invalid: 'invalid',
  none: 'none',
  close: 'Close',
  cancel: 'Cancel',
  donate: 'Donate',
  quickDonateButtons: 'Quick Donate Buttons (WIP)',
  subscriptions: 'Subscriptions',
  waitingForSubscriptions: 'waiting for subscriptions...',
  // messages
  loginFailed: 'login failed please try again...',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  nonAccountSignUp: 'Don\'t have an account? Sign Up',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  snackbarAssetUpsertSuccess: 'asset upsert successful!',
  snackbarCauseUpsertSuccess: 'cause upsert successful!',
  snackbarParticipantUpsertSuccess: 'participant upsert successful!',
  snackbarPersonUpsertSuccess: 'person upsert successful!',
  snackbarTransactionUpsertSuccess: 'transaction upsert successful!',
  // wip: messages
  signInWip: 'wip: required send email activation code, otp code, finish remember me, and other stuff...',
  transactionUpsertFormWip: 'wip: filter causes based on ongoing/active causes',
  transactionGoodsFormWip: 'wip: only show onGoing causes (dateRange), use barCode to get product info from api (graph graphql server), store info in node product, and return it...',
  // template
  signUpUserRegisteredSuccessfully: 'User registered successfully! You can login with \'${username}\'',
  newModelCreatedSuccessfully: 'New ${model} id: \'${id}\' created successfully!',
  // select options
  assetTypeOptionPhysicalAsset: 'Physical asset',
  assetTypeOptionDigitalAsset: 'Digital asset',
  assetTypeOptionPhysicalVoucher: 'Physical voucher',
  assetTypeOptionDigitalVoucher: 'Digital voucher',
  entityTypeOptionPerson: 'Person',
  entityTypeOptionParticipant: 'Organization',
  entityTypeOptionCause: 'Cause',
  transactionTypeOptionTransferFunds: 'Transfer funds',
  transactionTypeOptionTransferVolunteeringHours: 'Transfer volunteering hours',
  transactionTypeOptionTransferGoods: 'Transfer goods',
  transactionTypeOptionTransferAsset: 'Transfer asset',
  resourceTypeOptionFunds: 'Funds',
  resourceTypeOptionVolunteeringHours: 'Volunteering hours',
  resourceTypeOptionGenericGoods: 'Generic goods',
  resourceTypeOptionPhysicalAsset: 'Physical asset',
  resourceTypeOptionDigitalAsset: 'Digital asset',
  resourceTypeOptionPhysicalVoucher: 'Physical voucher',
  resourceTypeOptionDigitalVoucher: 'Digital voucher',
  // inputs
  participantLabel: 'Participant name',
  assetTypeLabel: 'Asset type',
  causeLabel: 'Cause name',
  causePlaceHolder: 'Save the world today',
  causeInputStarterLabel: 'Cause input starter',
  assetIdLabel: 'Asset Id',
  assetIdPlaceholder: '16834df0-766d-4cc8-8baa-b0c37338ca34',
  assetIdHelperText: 'valid asset id',
  assetLabel: 'Description',
  assetPlaceHolder: 'Wheelchair cum bed (Motorized)',
  ambassadorsLabel: 'Ambassadors',
  ambassadorsPlaceHolder: 'PT182692128 +351936208811 a342f19f-9e26-44c1-ae78-6fd8b0955d47',
  ambassadorsHelperText: 'valid ambassador\'s array, can be uuid, fiscalNumber or mobilePhone separated by space',
  ownerLabel: 'Owner',
  ownerPlaceHolder: 'PT182692128',
  ownerHelperText: 'valid owner id, can be uuid, fiscalNumber or mobilePhone',
  locationLabel: 'Location',
  locationPlaceHolder: '12.1890144,-28.5171909',
  tagsLabel: 'Tags',
  tagsPlaceHolder: 'one or more tags',
  metaDataLabel: 'Metadata',
  metaDataInternalLabel: 'Metadata internal',
  metaDataPlaceHolder: 'arbitrary json object ex { "key": "value" }',
  emailLabel: 'Email',
  emailPlaceHolder: 'valid email',
  mobilePhoneLabel: 'Mobile phone',
  mobilePhonePlaceHolder: '+351936101188 ',
  fiscalNumberLabel: 'Fiscal number',
  fiscalNumberPlaceHolder: 'valid fiscal number',
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  datePlaceHolder: 'valid date format YYYY/MM/DD ',
  inputTypeLabel: 'Input type',
  inputLabel: 'Input',
  inputPlaceHolder: 'PT182692128',
  inputHelperText: 'valid input entity id. can be uuid, fiscalNumber or mobilePhone',
  outputTypeLabel: 'Output type',
  outputLabel: 'Output',
  outputPlaceHolder: 'PT182692128',
  outputHelperText: 'valid output entity id. can be uuid, fiscalNumber or mobilePhone',
  codeLabel: 'code',
  codePlaceHolder: 'valid alfa numeric code format',
  transferTypeLabel: 'Transfer type',
  resourceTypeLabel: 'Resource type',
  quantityLabel: 'Quantity',
  quantityPlaceHolder: '28.82',
  currencyLabel: 'Currency',
  goodsLabel: 'Goods',
  goodsPlaceHolder: 'valid goods array',
  currencyCodeEur: 'EUR',
  currencyCodeUsd: 'USD',
  barCodeEan13Label: 'EAN Barcode',
  // https://generate.plus/en/number/ean
  barCodeEan13PlaceHolder: '978020137962',
  barCodeEan13HelperText: 'valid ean13 barcode',
  firstNameLabel: 'First name',
  firstNamePlaceHolder: 'John',
  firstNameHelperText: 'valid first Name',
  lastNameLabel: 'Last name',
  lastNamePlaceholder: 'Doe',
  lastNameHelperText: 'valid last name',
  userNameLabel: 'Username',
  userNamePlaceholder: 'johndoe',
  userNameHelperText: 'valid username',
  passWordLabel: 'Password',
  passWordPlaceholder: 'Ab912#11',
  passWordHelperText: 'valid password',
  passWordConfirmationLabel: 'Password confirmation',
  passWordConfirmationPlaceholder: 'Ab912#11',
  passWordConfirmationHelperText: 'must match password',
};

const ENTITY_TYPE_OPTIONS = [
  { title: I18N.entityTypeOptionPerson, value: EntityType.person },
  { title: I18N.entityTypeOptionParticipant, value: EntityType.participant },
  { title: I18N.entityTypeOptionCause, value: EntityType.cause },
];

const ASSET_TYPE_OPTIONS = [
  { title: I18N.assetTypeOptionPhysicalAsset, value: AssetType.physicalAsset },
  { title: I18N.assetTypeOptionDigitalAsset, value: AssetType.digitalAsset },
  { title: I18N.assetTypeOptionPhysicalVoucher, value: AssetType.physicalVoucher },
  { title: I18N.assetTypeOptionDigitalVoucher, value: AssetType.digitalVoucher },
];

const PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS = [
  { title: I18N.entityTypeOptionPerson, value: EntityType.person },
  { title: I18N.entityTypeOptionParticipant, value: EntityType.participant },
];

const TAGS_OPTIONS = [
  { title: 'Nature', value: 'NATURE' },
  { title: 'Planet', value: 'PLANET' },
  { title: 'Economy', value: 'ECONOMY' },
]

const GOODS_OPTIONS: GoodsOptions[] = [
  {
    // require to pass key
    key: 1,
    title: 'option1: 10x001 + 20x002',
    value: [
      {
        code: '001',
        barCode: 'ean001',
        name: 'name001',
        description: 'description001',
        quantity: 10
      },
      {
        code: '002',
        barCode: 'ean002',
        name: 'name002',
        description: 'description002',
        quantity: 20
      }
    ]
  },
  {
    // require to pass key
    key: 2,
    title: 'option2: 30x003 + 40x004',
    value: [
      {
        code: '005',
        barCode: 'ean005',
        name: 'name005',
        description: 'description005',
        quantity: 50
      },
      {
        code: '004',
        barCode: 'ean004',
        name: 'name004',
        description: 'description004',
        quantity: 40
      }
    ]
  }
];

const DEFAULT_LOGIN_CREDENTIALS = {
  username: 'admin',    // johndoe
  password: 'Aa123#12', // 12345678
};

const COOKIES = {
  jid: 'jid',
};

const DRAWER_WIDTH: number = 240;

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  timeout: 1000 * 60 * 1,
  // 24 hour
  maximumAge: 1000 * 3600 * 24,
};

const REGEXP: { [key: string]: RegExp; } = {
  fiscalNumber: /^[A-Z]{2}[0-9]{9}$/i,
  // split by space `(\s...`  
  fiscalNumberArray: /^([A-Z]{2}[0-9]{9})(\s[A-Z]{2}[0-9]{9})*$/i,
  // Email
  // http://emailregex.com/
  // eslint-disable-next-line 
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  // comma separated array of emails: https://www.thetopsites.net/article/52527605.shtml
  emailArray: /^([\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})(,[\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})*$/i,
  // username 4 to 16 chars
  username: /^([a-zA-Z0-9-_]{4,16})$/i,
  // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
  // https://medium.com/@ikhsanudinhakim/most-used-regex-pattern-for-password-validation-314645912cec
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
  // multi lingual, you'd probably be better off validating against characters you don't want to allow
  // match names with Capitalization after the first character
  // firstAndLastName: /^([A-Z][a-zA-Z]*)$/,
  name: /^[ A-Za-z\u00C0-\u00ff0-9^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{2,100}$/i,
  alphaNumeric: /^[ A-Za-z0-9_@./#&+-:]*$/i,
  date: /^((?:19|20)\d\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$/i,
  // latitude/longitude coordinates
  location: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  // split by space `(\s...`  
  uuidArray: /^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(\s[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})*$/i,
  // positive integer
  integer: /^\d+$/,
  // positive integer excluding 0
  integerPositiveNonZero: /^[1-9]\d*$/,
  // positive and negative
  float: /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/,
  floatPositive: /^((\d+(\.\d*)?)|(\.\d+))$/i,
  // currency code
  // currencyCode: /^(?:[A-Z]{3} [0-9]+(?:\.[0-9]+)?)|(?:[0-9]+(?:\.[0-9]+)? [A-Z]{3})$/i,
  // phone number ex +351936282828
  // mobilePhone: /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/i,
  // https://phoneregex.com/
  mobilePhone: /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/i,
}

export const appConstants = {
  VALUES,
  I18N,
  ENTITY_TYPE_OPTIONS,
  ASSET_TYPE_OPTIONS,
  PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
  TAGS_OPTIONS,
  GOODS_OPTIONS,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
  GEOLOCATION_OPTIONS,
  REGEXP,
};
