import Vue from 'vue'
import Vuex from 'vuex'

import modules from './getModulesByFolder'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null, // 全局用户信息
    activeNavIndex: 0, // 导航栏当前选中
  },
  modules: {
    ...modules // 引入各个模块
  }
})
