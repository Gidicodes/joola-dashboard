const mutations = {
    SET_USER_DATA: (state, user) => state.USER = user,
    SET_AUTH_TOKEN: (state, authentication) => {
        state.AUTHENTICATION_TOKEN = authentication;
    },
    SET_NOTIFICATION:(state, notification) => state.NOTIFICATION = notification,
    UPDATE_NOTIFICATIOn:(state, notification) => state.NOTIFICATION = [...state.NOTIFICATION, notification],
    REMOVE_AUTH: (state) => {
        state.AUTHENTICATION_TOKEN = '';
        state.USER = '';
    },
};

export {mutations};