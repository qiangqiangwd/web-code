// 评论相关的接口
const login = {
    // 判断是否登录
    getComment({ state }) {
        return state.Request({
            url: '/comment/get',
            showErrorMsg: true, // 是否展示错误提示
        });
    },
}
export default login