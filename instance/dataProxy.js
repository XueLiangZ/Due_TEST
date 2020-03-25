/**
 * 数组代理
 * @param {*} vm
 * @param {*} obj
 * @param {*} namespace
 */
function arrayProxy(vm, obj, namespace) {
  let proxyArr = [];
	


  return proxyArr;
}

/**
 * 对象代理
 * @param {*} vm
 * @param {*} obj
 * @param {*} namespace
 */
function objectProxy(vm, obj, namespace) {
  let proxyObj = {};
  for (let prop in obj) {
    Object.defineProperty(proxyObj, prop, {
      configurable: true,
      get() {
        return obj[prop];
      },
      set(val) {
        obj[prop] = val;
      }
    });
    //代理到 vm 实例上可以直接调用
    Object.defineProperty(vm, prop, {
      configurable: true,
      get() {
        console.log("get:", getNameSpace(namespace, prop));
        return obj[prop];
      },
      set(val) {
        // console.log("设置属性", prop, val);
        console.log("set:", getNameSpace(namespace, prop), val);
        obj[prop] = val;
      }
    });

    // 递归 代理内部对象
    if (obj[prop] instanceof Object) {
      proxyObj[prop] = dataProxy(vm, obj[prop], getNameSpace(namespace, prop));
    }
  }
  return proxyObj;
}

/**
 * 获取命名空间
 * @param {*} curNameSpace
 * @param {*} prop
 */
function getNameSpace(curNameSpace, prop) {
	if (!curNameSpace) {
		return prop;
} else if (!prop) {
		return curNameSpace;
} else {
		return curNameSpace + "." + prop;
}
}

/**
 * 数据代理
 * @param {instance} vm Due实例
 * @param {object} obj 要代理的对象
 * @param {*} namespace	命名空间
 */
function dataProxy(vm, obj, namespace) {
  let proxyObj = null;
  if (obj instanceof Array) {
    // 要代理的对象 为 数组
    proxyObj = arrayProxy(vm, obj, namespace);
  } else if (obj instanceof Object) {
    // 要代理的数据 为 对象
    proxyObj = objectProxy(vm, obj, namespace);
  } else {
    throw new Error(`"data":类型必须为数组或对象`);
  }
  return proxyObj;
}

export {dataProxy};
