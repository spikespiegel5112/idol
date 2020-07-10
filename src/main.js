// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
// import wxsdk from './js/wxsdk'

// import moment from 'moment';
import '@/sass/index.scss';

import App from './App'
import router from './router/router'
import service from './js/request'
import util from './js/util';
import {baseURL} from "./js/request";
import './permission'
import store from './store/store'

Vue.use(util);


FastClick.attach(document.body);

Vue.config.productionTip = false;
// Vue.prototype.$moment = moment;
Vue.prototype.$http = service;


Vue.prototype.$baseURL = baseURL;
// Vue.prototype.$domainUrl = process.env.NODE_ENV === 'production' ? 'http://jgxzq.pengpai.nplusgroup.com/production/index.html' : 'http://jgxzq.pengpai.nplusgroup.com/test/index.html:81';

Vue.prototype.$prodEnv = process.env.NODE_ENV === 'production';


Vue.prototype.$webStorage.type = 'sessionStorage';
util.$webStorage.type = 'sessionStorage';

// Vue.prototype.$wxsdk = wxsdk;


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
