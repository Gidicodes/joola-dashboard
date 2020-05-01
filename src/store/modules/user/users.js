import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';

const state = {
    USER: '',
    AUTHENTICATION_TOKEN: '',
    NOTIFICATION: [],
    BASE_LOCATION: '',
};

export default {state, getters, mutations, actions}