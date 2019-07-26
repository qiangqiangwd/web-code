// 登录相关的接口
const login = {
    // 判断是否登录
    isLogin({ state }) {
        return state.Request({
            url: '/user/isLogin'
        });
    },
    // 登录接口
    login({ state }, data) {
        return state.Request({
            type: 'post',
            url: '/user/login',
            data: data,
            showErrorMsg: true, // 是否展示错误提示
        });
    }
}
export default login