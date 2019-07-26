/**
 * === 该部分用于将所有组件整合成一个集合 ===
 */

let modules = {};
const files = require.context('./modules', false, /\.js*$/); // 搜寻所有文件夹

// 由该方法获得 modules 下的js文件，注：只能获取第一级下的js文件，多级以下无法获取
files.keys().forEach(key => {
  // 前面为获取文件名，后面为其内容
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;
