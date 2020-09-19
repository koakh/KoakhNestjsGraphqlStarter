const KEYWORDS = {
  error: 'Error',
  register: 'Register',
  // TODO: remove after clean up from signIn
  username: 'username',
  password: 'password',
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
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
  DRAWER_WIDTH,
};
