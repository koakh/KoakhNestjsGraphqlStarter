const KEYWORDS: { [key: string]: string } = {
  error: 'Error',
  register: 'Register',
  username: 'Username',
  password: 'Password',
  create: 'Create',
  update: 'Update',
};

const MESSAGES = {
  loginFailed: 'login failed please try again...',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  nonAccountSignUp: 'Don\'t have an account? Sign Up',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  signUpUserRegisteredSuccessfully: 'User registered successfully! You can login with',
};

const DEFAULT_LOGIN_CREDENTIALS = {
  username: 'admin',    // johndoe
  password: 'Aa123#12', // 12345678
};

const COOKIES = {
  jid: 'jid',
};

const DRAWER_WIDTH: number = 240;

const REGEXP: { [key: string]: RegExp; } = {
  fiscalNumber: /[A-Z]{2}[0-9]{9}/,
  // Email
  // http://emailregex.com/
  // eslint-disable-next-line 
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // username 4 to 16 chars
  username: /^([a-zA-Z]{4,16})$/,
  // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
  // https://medium.com/@ikhsanudinhakim/most-used-regex-pattern-for-password-validation-314645912cec
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/,
  // multi lingual, you'd probably be better off validating against characters you don't want to allow
  firstAndLastName: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/,
  // match names with Capitalization after the first character
  // firstAndLastName: /^([A-Z][a-zA-Z]*)$/,
}

export const appConstants = {
  KEYWORDS,
  MESSAGES,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
  REGEXP,
};
