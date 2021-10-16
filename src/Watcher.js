import Dep from "./Dep";

let uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    console.log('我是 watcher 构造函数')
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }
  
  update() {
    this.run();
  }
  
  run() {
    this.getAndInvoke(this.callback);
  }
  
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue)
    }
  }
  
  get() {
    // 进入依赖收集阶段
    Dep.target = this
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj);
    } catch (e) {
      console.log(e)
    } finally {
      Dep.target = null;
    }
    return value;
  }
  
}

function parsePath(expression) {
  let segments = expression.split('.');
  return function (obj) {
    console.log('segments')
    console.log(segments)
    console.log('---------------')
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      let item = segments[i];
      obj = obj[item];
    }
    return obj;
  };
}