const getters = {
    GET_USER: (state) => state.USER,
    GET_AUTH_TOKEN: (state) => state.AUTHENTICATION_TOKEN,
    IS_AUTHENTICATED: (state) => state.AUTHENTICATION_TOKEN || false,
    GET_NOTIFICATION: (state) => state.NOTIFICATION
};

export {getters};