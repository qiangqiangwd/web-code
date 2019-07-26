/**
 * 简单的提示弹出
 * 1、参数可直接为字符串
 * 2、为对象时
 * content: 显示内容
 * time: 显示时间（毫秒、默认 1500）
 * maskLayer: 是否显示遮罩层（默认不显示，暂不启用）
 */
import '../style/message.less';

// let isHasMeaage = null; // 当前是否含有弹出（暂不允许多个提示存在，会挤掉前一个）
let creatOuterDom = null; // 最外层父元素 
let childDomArray = []; // 当前生成的子元素的合集

function message(option) {
    // 显示的文字
    let alertMsg = typeof option === 'object' ? (option.content || '') : option;
    let time = typeof option === 'object' && option.time ? option.time : 1500;

    // 创建最外层父元素
    if (!creatOuterDom) { // 是否已经生成
        creatOuterDom = document.createElement('div');
        creatOuterDom.setAttribute('id', 'message-outer-box');
        document.body.appendChild(creatOuterDom); // 生成
    }

    // 生成内里的子元素
    let creatAlertDom = document.createElement('div');
    creatAlertDom.setAttribute('class', 'message-layer show-message-layer');
    creatAlertDom.innerText = alertMsg; // 显示文字
    creatOuterDom.appendChild(creatAlertDom); // 在父级中生成
    childDomArray.push(creatAlertDom);

    setTimeout(() => {
        clearDomAnimation(creatAlertDom);
    }, time);
}

// 立即清除弹框动画效果
function clearDomAnimation(dom, now) {
    if (now){ // 是否为立刻删除
        deleteDom(dom);
        return
    }
    dom.setAttribute('class', 'message-layer hide-message-layer');
    // 动画消失后清除弹框
    setTimeout(() => {
        deleteDom(dom);
    }, 250);
}

// 删除元素操作
function deleteDom(dom){
    creatOuterDom.removeChild(dom); // 清除当前提示弹出层
    childDomArray.splice(0, 1); // 删除第一个元素
    if (childDomArray.length <= 0){ // 若无子元素则清除父元素
        document.body.removeChild(creatOuterDom);
        creatOuterDom = null;
    }
}

export default message;