const REGISTER_DEFAULT_USER = {
  fiscalNumber: '282692124',
  firstName: 'Mário',
  lastName: 'Monteiro',
  email: 'mario@koakh.com',
  username: 'mario',
  password: '12345678',
};

const KEYWORDS = {
  id: "id",
  fiscalNumber: "fiscalNumber",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  username: "username",
  password: "password",
  error: 'Error',
};

const MESSAGES = {
  loginFailed: 'login failed please try again...',
  signIn: 'Sign In',
  nonAccountSignUp: 'Don\'t have an account? Sign Up',
  rememberMe: 'Remember me',
};

const DEFAULT_LOGIN_CREDENTIALS = {
  username: 'johndoe',
  password: '12345678',
};
const COOKIES = {
  jid: 'jid',
};

const DRAWER_WIDTH: number = 240;

export const appConstants = {
  KEYWORDS,
  MESSAGES,
  REGISTER_DEFAULT_USER,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
};
