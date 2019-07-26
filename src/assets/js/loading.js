/**
 * 自定义 loading 组件
 */
import '../style/loading.less'; // 导入loading样式
let hasLoading = false; // 是否含有loading（避免重复loading）

// let loadingId = 'selfLoadingModel';
const loading = {
    show(){
        if (!hasLoading){
            let loadEle = document.createElement('div');
            loadEle.setAttribute('id', 'selfLoadingModel');

            let loadAnimation = document.createElement('div');
            loadAnimation.setAttribute('class', 'loader');

            loadEle.appendChild(loadAnimation);
            document.body.appendChild(loadEle);

            hasLoading = true;
        }
    },
    hide(){
        let loadEle = document.getElementById('selfLoadingModel');
        // 移除 loading
        if (loadEle){
            document.body.removeChild(loadEle);
            hasLoading = false;
        }
    }
};

export default loading