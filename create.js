Object.prototype.myCreate = function(proto) {
  function Fn() {}
  Fn.prototype = proto
  Fn.prototype.constructor = Fn
  const fnPro = new Fn()
  return fnPro
}

console.log(Object.myCreate({a: 1, b: 2}))
