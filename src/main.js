import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './config/axios';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
