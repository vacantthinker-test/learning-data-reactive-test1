import observe from "./observe";
import Watcher from "./Watcher";

let data = {
  a: {
    m: {
      n: 5
    }
  },
  b: [1, 2, 3],
  c: 22
}
observe(data)

// data.a.m.n = 88
// console.log(data.a.m.n)
// data.c = 33
// console.log(data.c)
// data.b.push(4)
// console.log(data.b)
new Watcher(data, 'a.m.n', (val)=>{
  console.log('================================================')
  console.log(val)
  console.log('================================================')
})
data.a.m.n = 88
console.log(data)