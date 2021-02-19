import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueSelect from 'vue'
import Multiselect from 'vue-multiselect'
import Modal from "@burhanahmeed/vue-modal-2";
import VueSession from 'vue-session'
import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';


Vue.use(VueSession)

Vue.config.productionTip = false

Vue.component("v-select", vueSelect)
Vue.component('multiselect', Multiselect)
Vue.component('pacman-loader', ClipLoader)
Vue.use(Modal);
Vue.use(Toasted)
Vue.use(BootstrapVue)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
