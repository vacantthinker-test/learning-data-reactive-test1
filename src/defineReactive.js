import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(target, key, val) {
  const ob = target.__ob__;
  // const ob = new Dep();
  if (arguments.length === 2) {
    val = target[key];
  }
  
  // 考虑到嵌套的情况
  let childOb = observe(val)
  
  Object.defineProperty(target, key, {
    get() { // 收集依赖
      console.log('响应式 获取值 执行了')
      console.log(key)
      console.log(val)
      console.log('------------')
  
      if(Dep.target) {
          ob.dep.depend();
          if(childOb) {
              childOb.dep.depend();
          }
          
      }
      
      return val;
    },
    set(newValue) { // 通知依赖
      console.log('响应式 更新值 执行了')
      console.log(key)
      console.log(newValue)
      console.log('-----------')
      if (newValue === val) {
        return;
      }
      val = newValue;
      childOb = observe(val); // 考虑到新值
      
      
      // 发布订阅模式
      ob.dep.notify()
    }
  })
  
}