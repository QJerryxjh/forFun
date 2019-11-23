Object.prototype.myInstanceof = function(par) {
  let thisPro = this.__proto__
  const parPro = par.prototype

  while (true) {
    if (thisPro === null) {
      // 不存在
      return false
    } else if (thisPro === parPro) {
      return true
    } else {
      thisPro = thisPro.__proto__
    }
  }
}


function Parent(name, age) {
  this.name = name
  this.age = age
}

Parent.prototype.sayHello = function () {
  console.log('hello')
}

function Fn() {}
Fn.prototype = new Parent()


function Child(name, age) {

  Parent.call(this, name, age)

  
}

Child.prototype = new Fn()
Child.prototype.constructor = Child

const c = new Child('qjerry', 18)

console.log(
  c.myInstanceof(Object)

)
