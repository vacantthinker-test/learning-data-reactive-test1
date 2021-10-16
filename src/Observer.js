import def from "./utils";
import defineArray from "./defineArray";
import observe from "./observe";
import defineReactive from "./defineReactive";
import Dep from "./Dep";

export default class Observer {
  constructor(value) {
    this.dep = new Dep()
    
    def(value, '__ob__', this, false); // 定义 __ob__ 属性
    
    if (Array.isArray(value)) { // 根据类型分别处理
      defineArray(value) // 处理Array
      this.walkArray(value)
    } else {
      this.walk(value) // 处理obj
    }
    
  }
  
  walk(obj) {
    for (let key in obj) {
      defineReactive(obj, key)
    }
  }
  
  walkArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      observe(item)
    }
  }
}