// 评论相关的接口
const login = {
    // 获取评论 get
    getComment({ state }) {
        return state.Request({
            url: '/comment/get',
            showErrorMsg: true, // 是否展示错误提示
        });
    },
    // 新增评论 post
    newComment({ state }, data) {
        return state.Request({
            url: '/comment/new',
            type: 'post',
            data: data,
            showErrorMsg: true, // 是否展示错误提示
        });
    },
}
export default login