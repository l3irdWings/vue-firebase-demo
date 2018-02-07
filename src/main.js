// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyB7SogJw-xO10wsG_iWvNWzH7RQRwsXJ3Y',
  authDomain: 'vue-firebase-demo-52b27.firebaseapp.com',
  databaseURL: 'https://vue-firebase-demo-52b27.firebaseio.com',
  projectId: 'vue-firebase-demo-52b27',
  storageBucket: 'vue-firebase-demo-52b27.appspot.com',
  messagingSenderId: '967017213223'
}

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.prototype.$firebase = firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
