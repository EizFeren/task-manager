export const authErrorMessages = {
  signUp: {
    validation: {
      name: {
        length: 'AUTH_SIGN_UP_NAME_LENGTH',
      },
      password: {
        length: 'AUTH_SIGN_UP_PASSWORD_LENGTH',
        repeat: 'AUTH_SIGN_UP_PASSWORD_REPEAT',
      },
    },
  },
  signIn: {
    user: {
      notConfirmed: 'AUTH_SIGN_IN_USER_NOT_CONFIRMED',
      blocked: 'AUTH_SIGN_IN_USER_BLOCKED',
      password: {
        missmatch: 'AUTH_SIGN_IN_PASSWORD_MISSMATCH',
      },
    },
  },
};
