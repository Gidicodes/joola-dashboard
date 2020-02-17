import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';

const state = {
    USER: '',
    AUTHENTICATION_TOKEN: '',
    NOTIFICATION: [],
};

export default {state, getters, mutations, actions}