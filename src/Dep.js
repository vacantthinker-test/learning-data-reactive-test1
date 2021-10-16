let uid = 0;
export default class Dep {
  static target;
  constructor() {
    console.log('我是dep 构造函数');
    this.id = uid++;
    
    this.subs = new Set(); // 用数组存储自己的订阅者, watcher 实例
  }
  
  addSub(sub){ // 添加订阅
    this.subs.add(sub)
  }
  
  depend(){ // 添加依赖
    if(Dep.target) {
        this.addSub(Dep.target)
    }
  }
  
  notify() {
    console.log('我是notify 函数 , 执行了.....')
    // 浅克隆一份
    let setCloned = new Set(this.subs);
    setCloned.forEach(sub => sub.update())
  }
}