// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/css/aplication.scss'
import rate from 'vue-rate'
import VueScrollTo from 'vue-scrollto'
import VueSimpleUpload from 'vue-simple-file-upload'
import PrettyCheckbox from 'pretty-checkbox-vue';

Vue.use(VueScrollTo)
Vue.use(BootstrapVue)
Vue.use(PrettyCheckbox)
Vue.use(rate)
Vue.use(VueSimpleUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
