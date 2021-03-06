import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from './firebase'
import Vuefire from 'vuefire'

Vue.config.productionTip = false

Vue.use(Vuefire)

let app

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
