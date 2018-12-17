import Vue from 'vue';
import Routes from './config/routes';
// import App from './_App.vue';

const app = new Vue({
  router: Routes,
  // render: h => h(App)
}).$mount('#app');