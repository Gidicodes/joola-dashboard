// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import store from './store/store'
import {ApiService} from './services/api.service'
import BootstrapVue from 'bootstrap-vue'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import VModal from 'vue-js-modal'
import App from './App'
import router from './router'


// todo
// cssVars()

window.toastr = require('toastr');

Vue.use(VModal, {dialog: true, dynamic: true, injectModalsContainer: true});
Vue.use(VueToastr2);
Vue.use(BootstrapVue)

ApiService.init(process.env.VUE_APP_API_URL);

if (store.dispatch('isLoggedIn'))
  ApiService.setHeader(store.getters.GET_AUTH_TOKEN);
else
  store.dispatch('UNSET_USER').then(() => {
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
