/**
 * === 用于确认提示弹框
 * title:标题
 * content:提示内容
 * sure:确认的回调函数
 * cancel:取消的回调函数
 * sureBtnTxt：确认按钮的文字（默认确认）
 * cancelBtnTxt：取消按钮的文字（默认取消）
 * maskClose:点击遮罩是否关闭（默认false）
 *  */
import '../style/components.less'; // 导入公共样式

const confirm = {
    init(opts = {}) {
        let ID = 'self-confirm-box';
        if (confirm.outerEle) { // 只允许同时存在一个确认框
            confirm._clearConfirm();
        }

        confirm.outerEle = confirm._createElem({
            attrOpt: {
                id: ID
            }
        });

        confirm.opts = opts; // 保存参数
        confirm.createContentDiv();

        document.body.appendChild(confirm.outerEle);
        confirm.$Vue = this; // 保存 当前vue
    },
    // 创建中间 主要内容
    createContentDiv() {
        // 居中div
        let centerDiv = confirm._createElem({
            attrOpt: { class: 'confirm-center-box' }
        });

        confirm.createTitleEle(centerDiv);
        if (confirm.opts.content){
            confirm.createContentEle(centerDiv);
        }
        confirm.createFooterEle(centerDiv);

        confirm.outerEle.appendChild(centerDiv);
    },
    // 创建标题
    createTitleEle(pEle) {
        // 标题
        let titDiv = confirm._createElem({
            attrOpt: { class: 'confirm-center-title' }
        });
        titDiv.innerText = confirm.opts.title || '提示';
        pEle.appendChild(titDiv);
    },
    // 创建内容
    createContentEle(pEle) {
        // 内容
        let cntDiv = confirm._createElem({
            attrOpt: { class: 'confirm-center-content' }
        });
        cntDiv.innerText = confirm.opts.content;
        pEle.appendChild(cntDiv);
    },
    // 创建底部按钮
    createFooterEle(pEle) {
        // 按钮
        let [ftDiv, sureBtn, cancelBtn] = [
            confirm._createElem({
                attrOpt: { class: 'confirm-center-footer' }
            }),
            confirm._createElem({
                eleName: 'button',
                txt: this.opts.sureBtnTxt ?'this.opts.sureBtnTxt':'确认',
                attrOpt: { class: 'confirm-center-sure' }
            }),
            confirm._createElem({
                eleName: 'button',
                txt: this.opts.cancelBtnTxt ? 'this.opts.sureBtnTxt' : '取消',
                attrOpt: { class: 'confirm-center-cancel' }
            })
        ];

        // 保存确认按钮并添加确认事件
        confirm.sureBtn = sureBtn;
        sureBtn.addEventListener('click', confirm.setSureEvent);
        // 保存确认按钮并添加确认事件
        confirm.cancelBtn = cancelBtn;
        cancelBtn.addEventListener('click', confirm.setCancelEvent);

        ftDiv.appendChild(cancelBtn);
        ftDiv.appendChild(sureBtn);
        pEle.appendChild(ftDiv);
    },
    // 创建确认事件
    setSureEvent(){
        confirm.opts.sure && confirm.opts.sure.bind(confirm.$Vue)();
        confirm._closeConfirm();
    },
    // 创建取消事件
    setCancelEvent() {
        confirm.opts.cancel && confirm.opts.cancel.bind(confirm.$Vue)();
        confirm._closeConfirm();
    },
    // 关闭确认弹框
    _closeConfirm(){
        // 清除确认点击事件
        confirm.sureBtn.removeEventListener('click', confirm.setSureEvent);
        // 清除取消点击事件
        confirm.cancelBtn.removeEventListener('click', confirm.setCancelEvent);
        confirm._clearConfirm();
    },
    // 创建一个节点元素（默认div），并附上相应的属性
    _createElem({ eleName = 'div', attrOpt = null, txt = null }) {
        let cElem = document.createElement(eleName);
        if (attrOpt && typeof attrOpt === 'object') { // 是否添加属性
            Object.keys(attrOpt).forEach(name => {
                cElem.setAttribute(name, attrOpt[name]);
            });
        }
        if (txt){ // 添加内容
            cElem.innerText = txt;
        }
        return cElem
    },
    // 清除确认框（初始化参数）
    _clearConfirm() {
        document.body.removeChild(confirm.outerEle);
        // 释放保存的参数
        confirm.outerEle = null;
        confirm.sureBtn = null;
        confirm.cancelBtn = null;
        confirm.opts = null;
        confirm.$Vue = null;
    }
};

export default confirm.init; // 将confirm的指向绑定为包本身
