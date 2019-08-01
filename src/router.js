import Vue from 'vue'
import Router from 'vue-router'

// === 首页部分
import Home from './views/Home.vue';
import comment from './views/Home/comment.vue';
import article from './views/Home/article.vue';
// === 404页面
import NotFound from './views/404.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: '首页',
          component: article,
          meta: {
            index:0, // 当前导航栏选中数值
          },
        },
        {
          path: '/comment',
          name: '评论区',
          component: comment,
          meta: {
            index: 1,
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});
