import def from "./utils";

const arrayPrototype = Array.prototype
const arrayPrototypeNew = Object.create(arrayPrototype)
const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']
arrayMethods.forEach(function (method) {
  const originalMethod = arrayPrototype[method]
  
  def(arrayPrototypeNew, method, function () {
    console.log('响应式数组 执行了');
    const ob = this.__ob__;
    
    const args = [...arguments]
    const result = originalMethod.apply(this, args)
    let inserted = [];
    
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted.length > 0) {
      ob.walkArray(inserted)
    }
    ob.dep.notify();
    
    return result;
  }, false)
})

export default function defineArray(arr) {
  Object.setPrototypeOf(arr, arrayPrototypeNew)
}