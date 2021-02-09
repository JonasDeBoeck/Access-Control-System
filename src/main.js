import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueSelect from 'vue'

Vue.config.productionTip = false
Vue.component("v-select", vueSelect)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
