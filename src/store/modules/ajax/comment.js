// 评论相关的接口
const login = {
    // 获取评论 get
    getComment({ state }, params) {
        return state.Request({
            url: '/comment/get',
            params: params,
            showErrorMsg: true, // 是否展示错误提示
        });
    },
    // 添加、取消 点赞
    likedComment({ state }, params) {
        return state.Request({
            url: '/comment/like',
            params: params,
            showErrorMsg: true, // 是否展示错误提示
        });
    },
    // 删除评论
    delComment({ state }, params) {
        return state.Request({
            url: '/comment/del',
            params: params,
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