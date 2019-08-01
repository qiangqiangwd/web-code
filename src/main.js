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
import confirm from './assets/js/confirm';
Vue.prototype.$message = message; // 提示弹框 
Vue.prototype.$loading = loading; // 加载
Vue.prototype.$confirm = confirm; // 确认弹框

// 全局注册 过滤器
Vue.filter('timeFilter', function (value) {
  let date = new Date(value * 1000);
  let [year, month, day, hour, minute, second] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

// 设置安全路由
router.beforeEach((to, from, next) => {
  // console.log(to, store);
  if (to.meta && typeof to.meta.index == 'number'){
    store.state.activeNavIndex = to.meta.index;
  }

  next();
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
