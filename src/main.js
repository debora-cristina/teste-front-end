import Vue from 'vue'
import App from './App.vue'
import './config/bootstrap'
import router from './config/router'
import './config/mq'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
