import Vue from 'vue'
import Router from 'vue-router'

// === 首页部分
import Home from './views/Home.vue';
// === 404页面
import NotFound from './views/404.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { 
      path: '*', 
      name:'404',
      component: NotFound 
    }
  ]
})
