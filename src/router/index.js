import Vue from 'vue'
import Router from 'vue-router'
import Database from './../components/Database'
import Storage from './../components/Storage'
import Firestore from './../components/Firestore'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/database'
    },
    {
      path: '/',
      redirect: '/database'
    },
    {
      path: '/database',
      name: 'database',
      component: Database
    },
    {
      path: '/storage',
      name: 'storage',
      component: Storage
    },
    {
      path: '/firestore',
      name: 'firestore',
      component: Firestore
    }
  ]
})
