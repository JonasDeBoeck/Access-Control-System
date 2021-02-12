import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueSelect from 'vue'
import Multiselect from 'vue-multiselect'
import Modal from "@burhanahmeed/vue-modal-2";
import VueSession from 'vue-session'
import Toasted from 'vue-toasted';

// persist so that the session id is stored between tabs
var options = {
  persist: true
}

Vue.use(VueSession, options)
Vue.config.productionTip = false
Vue.component("v-select", vueSelect)
Vue.component('multiselect', Multiselect)
Vue.use(Modal);
Vue.use(Toasted)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
