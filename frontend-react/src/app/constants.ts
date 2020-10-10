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
  assetType: 'Asset type',
  physicalAsset: 'Physical Asset',
  digitalAsset: 'Digital Asset',
  // inputs
  causeLabel: 'Cause name',
  causePlaceHolder: 'Save the world today',
  assetLabel: 'Asset description',
  assetPlaceHolder: 'Wheelchair cum bed (Motorized)',
  ambassadorsLabel: 'Ambassadors',
  ambassadorsPlaceHolder: 'PT182692128',
  ambassadorsHelperText: 'required a valid ambassador fiscalNumber',
  ownerLabel: 'Owner',
  ownerPlaceHolder: 'PT182692128',
  ownerHelperText: 'required a valid owner fiscalNumber',
  locationLabel: 'Location',
  locationPlaceHolder: '12.1890144,-28.5171909',
  tagsLabel: 'Tags',
  tagsPlaceHolder: 'required one or more tags',
  metaDataLabel: 'Metadata',
  metaDataInternalLabel: 'Metadata',
  metaDataPlaceHolder: 'arbitrary json object',
};

const VALUES = {
  PHYSICAL_ASSET: 'PHYSICAL_ASSET',
  DIGITAL_ASSET: 'DIGITAL_ASSET',
}

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
  name: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
  // match names with Capitalization after the first character
  // firstAndLastName: /^([A-Z][a-zA-Z]*)$/,
  date: /^((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$/i,
  // latitude/longitude coordinates
  location: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  uuidArray: /^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(,[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})*$/i,
}

export const appConstants = {
  I18N,
  VALUES,
  TAGS_OPTIONS,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
  REGEXP,
};
