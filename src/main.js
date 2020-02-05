import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './store/router'
import 'semantic-ui-css/semantic.min.css';
import SuiVue from 'semantic-ui-vue';

Vue.use(SuiVue);

Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')