/**
 * 在进行操作的地方生成一个div节点
 */
import '../style/components.less'; // 导入公共样式
class posAddElem {
    constructor(dom) {
        this.dom = dom;
    }
    init(name) {
        // 创建最外层的div  
        let outerDiv = document.createElement('div');
        outerDiv.setAttribute('id', name);
        document.body.appendChild(outerDiv);
        this.outerDiv = outerDiv;
    }
    // 打开表情包弹框
    openFaceBao(callback) {
        let eleName = 'self-faceBao-box'; // 弹框最外层的id
        // 同时只能存在一个弹框
        if (document.getElementById(eleName)){
            return
        }
        let posClient = this.dom.getBoundingClientRect();
        this.init(eleName);
        // this.callback = callback; // 保存回调函数
        // 设置宽高
        // 网页可见区域宽： document.body.clientWidth
        // 网页可见区域高： document.body.clientHeight
        let width = 300;
        this.outerDiv.style.width = width + 'px';
        // 设置定位
        this.outerDiv.style.left = (posClient.left - width / 2) + 'px';
        this.outerDiv.style.top = (posClient.top + posClient.height + 10) + 'px';

        // 开始罗列对应表情
        let faceBox = document.createElement('ul');

        // 循环添加图片
        this.liEvent = []; 
        for (let i = 1; i <= 7; i++) {
            let li = document.createElement('li');
            li.callback = callback; // 强行添加回调函数？？！！
            li.innerHTML = `<img src="${process.env.BASE_URL}img/${i}.gif" data="${i}" />`;
            faceBox.appendChild(li);
            li.addEventListener('click', this.faceBaoAddEvent);
            this.liEvent.push(li);
        }

        this.outerDiv.appendChild(faceBox);
    }
    // 给。。。添加事件
    faceBaoAddEvent(){
        let imgHtml = this.innerHTML;
        this.callback(imgHtml);
        // console.log(this,this.callback);
    }
    // 关闭表情包弹框
    hideFaceBao(){
        // 清除对应事件
        for (let i = 0; i < this.liEvent.length;i++){
            this.liEvent[i].removeEventListener('click', this.faceBaoAddEvent);
        }
        // console.log(this.liEvent);
        document.body.removeChild(this.outerDiv); // 清除最外层
    }
}

export default posAddElem