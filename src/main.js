import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

Vue.config.productionTip = false;

// 引入全局公共css
import './assets/style/public.less';

// 全局注册 loading 和 提示 message
import loading from './assets/js/loading';
import message from './assets/js/message';
Vue.prototype.$message = message;
Vue.prototype.$loading = loading;
  
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
