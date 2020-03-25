import {dataProxy} from "./dataProxy.js";

let uid = 0;

/**
 * 原型上挂载方法
 * @param {*} Due
 */
function init(Due) {
  /**
   * 数据初始化
   */
  Due.prototype._init = function(option) {
    const vm = this;
    vm.uid = uid++;
    vm.isDue = true;

    //数据代理 监听数据变化 及时对页面上的类容进行更新;
    if (option.data) {
      vm.data = dataProxy(vm, option.data, "");
    }
  };
}

export default init;
