Function.prototype.myCall = function(context, ...params) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = null
  }
  const funName = Symbol()
  context[funName] = this
  context[funName](...params)
  delete context[funName]
}

Function.prototype.myApply = function(context, params) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = null
  }
  const funName = Symbol()
  context[funName] = this
  context[funName](params)
  delete context[funName]
}

Function.prototype.myBind = function(context) {
  return (...params) => {
    this.myCall(context, ...params)
  }
}

const person = {
  name: 'qjerry',
  age: 22
}

function logName(param) {
  console.log(this.name, param)
}

// logName.myCall(person, 'haha')
// logName.myApply(person, ['haha', 'okey'])
logName.myBind(person)('haha1')
