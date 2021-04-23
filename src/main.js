import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import vuetify from "./vuetify"
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  //vuetify,
  render: h => h(App),
  created() {
    store.dispatch('loadAll')
  }
}).$mount('#app')
