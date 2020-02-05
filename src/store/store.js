import Vue from 'vue'
import Vuex from 'vuex'
import Users from './modules/user/users'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: '**-jive-data-00-**',
    storage: localStorage
});

export default new Vuex.Store({
    state: {
        RAVEPAY_KEY: 'FLWPUBK-00906931020cf3283c092ba530482172-X'
    },
    getters: {
        GET_RAVEPAY_KEY: (state) => state.RAVEPAY_KEY
    },
    mutations: {},
    actions: {},
    modules: {
        User: Users,
    },
    plugins: [vuexPersist.plugin]
});
