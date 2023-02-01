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
      name: {
        empty: 'AUTH_SIGN_IN_USER_NAME_EMPTY',
      },
      password: {
        empty: 'AUTH_SIGN_IN_USER_PASSWORD_EMPTY',
        missmatch: 'AUTH_SIGN_IN_PASSWORD_MISSMATCH',
      },
    },
  },
  refresAuthToken: {
    validation: {
      refreshToken: {
        notUUID4: 'AUTH_REFRESH_AUTH_TOKEN_ID_NOT_UUID4',
      },
    },
    notFound: 'AUTH_REFRESH_AUTH_TOKEN_NOT_FOUND',
  },
};
