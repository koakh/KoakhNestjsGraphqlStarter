const I18N: { [key: string]: string } = {
  // keywords
  error: 'Error',
  register: 'Register',
  username: 'Username',
  password: 'Password',
  reset: 'Reset',
  create: 'Create',
  update: 'Update',
  required: 'Required',
  invalid: 'Invalid',
  none: 'none',
  // messages
  loginFailed: 'login failed please try again...',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  nonAccountSignUp: 'Don\'t have an account? Sign Up',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  signUpUserRegisteredSuccessfully: 'User registered successfully! You can login with',
  // input options
  assetTypeOptionPhysicalAsset: 'Physical asset',
  assetTypeOptionDigitalAsset: 'Digital asset',
  transactionTypeTransferFunds: 'Transfer funds',
  transactionTypeTransferVolunteeringHours: 'Transfer volunteering hours',
  transactionTypeTransferGoods: 'Transfer goods',
  transactionTypeTransferAsset: 'Transfer asset',
  resourceTypeFunds: 'Funds',
  resourceTypeVolunteeringHours: 'Volunteering hours',
  resourceTypeGenericGoods: 'Generic goods',
  resourceTypePhysicalAsset: 'Physical asset',
  resourceTypeDigitalAsset: 'Digital asset',
  // inputs
  assetTypeLabel: 'Asset type',
  causeLabel: 'Cause name',
  causePlaceHolder: 'Save the world today',
  assetIdLabel: 'Asset Id',
  assetIdPlaceholder: '16834df0-766d-4cc8-8baa-b0c37338ca34',
  assetIdHelperText: 'valid asset id',
  assetLabel: 'Asset description',
  assetPlaceHolder: 'Wheelchair cum bed (Motorized)',
  ambassadorsLabel: 'Ambassadors',
  // TODO: uuid
  ambassadorsPlaceHolder: 'PT182692128',
  ambassadorsHelperText: 'valid ambassador fiscalNumber',
  ownerLabel: 'Owner',
  // TODO: uuid
  ownerPlaceHolder: 'PT182692128',
  ownerHelperText: 'valid owner fiscalNumber',
  locationLabel: 'Location',
  locationPlaceHolder: '12.1890144,-28.5171909',
  tagsLabel: 'Tags',
  tagsPlaceHolder: 'one or more tags',
  metaDataLabel: 'Metadata',
  metaDataInternalLabel: 'Metadata',
  metaDataPlaceHolder: 'arbitrary json object',
  emailLabel: 'Email',
  emailPlaceHolder: 'valid email',
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  datePlaceHolder: 'valid date format YYYY/MM/DD ',
  inputLabel: 'Input',
  // TODO: uuid
  inputPlaceHolder: 'PT182692128',
  inputHelperText: 'valid input fiscalNumber',
  outputLabel: 'Output',
  // TODO: uuid
  outputPlaceHolder: 'PT182692128',
  outputHelperText: 'valid output fiscalNumber',
  codeLabel: 'code',
  codePlaceHolder: 'valid alfanumeric code format',
  transferTypeLabel: 'Transfer type',
  resourceTypeLabel: 'Resource type',
  quantityLabel: 'Quantity',
  quantityPlaceHolder: '28.82',
  currencyLabel: 'Currency',
  goodsLabel: 'Goods',
  goodsPlaceHolder: 'valid goods array',
  currencyCodeEur: 'EUR',
  currencyCodeUsd: 'USD',
};

const TAGS_OPTIONS = [
  { title: 'Nature', value: 'NATURE' },
  { title: 'Planet', value: 'PLANET' },
  { title: 'Economy', value: 'ECONOMY' },
]

const DEFAULT_LOGIN_CREDENTIALS = {
  username: 'admin',    // johndoe
  password: 'Aa123#12', // 12345678
};

const COOKIES = {
  jid: 'jid',
};

const DRAWER_WIDTH: number = 240;

const REGEXP: { [key: string]: RegExp; } = {
  fiscalNumber: /^[A-Z]{2}[0-9]{9}$/i,
  // Email
  // http://emailregex.com/
  // eslint-disable-next-line 
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  // comma separated array of emails: https://www.thetopsites.net/article/52527605.shtml
  emalArray: /^([\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})(,[\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})*$/i,
  // username 4 to 16 chars
  username: /^([a-zA-Z]{4,16})$/i,
  // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
  // https://medium.com/@ikhsanudinhakim/most-used-regex-pattern-for-password-validation-314645912cec
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/i,
  // multi lingual, you'd probably be better off validating against characters you don't want to allow
  // match names with Capitalization after the first character
  // firstAndLastName: /^([A-Z][a-zA-Z]*)$/,
  name: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
  alphaNumeric: /^[ A-Za-z0-9_@./#&+-:]*$/i,
  date: /^((?:19|20)\d\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$/i,
  // latitude/longitude coordinates
  location: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  uuidArray: /^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(,[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})*$/i,
  // positive and negative
  float: /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/,
  floatPositive: /^((\d+(\.\d*)?)|(\.\d+))$/i,
  // currency code
  // currencyCode: /^(?:[A-Z]{3} [0-9]+(?:\.[0-9]+)?)|(?:[0-9]+(?:\.[0-9]+)? [A-Z]{3})$/i,
}

export const appConstants = {
  I18N,
  TAGS_OPTIONS,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
  REGEXP,
};
