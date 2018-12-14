import Vue from 'vue';
import page from 'page';
import routes from './config/routes';
// import App from './App.vue';

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

const app = new Vue({
  el: '#app',
  data: {
    ViewComponent: { render: h => h('div', 'loading...') }
  },
  render (h) { return h(this.ViewComponent) }
})

Object.keys(routes).forEach(route => {
  const Component = require('./pages/' + routes[route] + '.vue')
  page(route, () => app.ViewComponent = Component)
})
page('*', () => app.ViewComponent = require('./pages/404.vue'))
page()
