import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../components/Layout'

let testPrefix = process.env.NODE_ENV === 'production' ? '/' : '/test';
const routes = [{
  path: '/',
  redirect: '/hitTheList',
  component: Layout,
  children: [{
    path: 'hitTheList',
    name: 'hitTheList',
    component: () => import('../components/HitTheList.vue')
  }, {
    path: 'personalCenter',
    name: 'personalCenter',
    component: () => import('../components/PersonalCenter.vue')
  }, {
    path: 'dream',
    name: 'dream',
    component: () => import('../components/Dream.vue')
  }, {
    path: 'editUserInfo',
    name: 'editUserInfo',
    component: () => import('../components/EditUserInfo.vue')
  }]

  
  
}, {
  path: '/loading',
  name: 'loading',
  component: () => import('../components/Loading.vue')
}, {
  path: '/auth',
  name: 'auth',
  component: () => import('../components/Auth.vue')
}];


const router = new VueRouter({
  mode: 'history',
  base: '',
  scrollBehavior: () => ({
    y: 0
  }),
  routes
});


export default router;
