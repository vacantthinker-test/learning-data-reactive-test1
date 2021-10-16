export default function def(target, key, val, enumerable) {
  Object.defineProperty(target, key, {
    value: val,
    enumerable: enumerable,
    configurable: true,
    writable: true
  })
}