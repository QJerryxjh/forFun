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

const c = new Child('you', 18)
console.log(c, c.constructor)

