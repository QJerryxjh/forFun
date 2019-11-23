const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 9999
})

const socket = {}


wss.on('connection', function(ws, req) {
  const id = req.url.slice(4)
  socket[id] = ws
  wss.broadcast(`${id}进入房间`)
  ws.on('message', function(data) {
    data =  JSON.parse(data)
    const { type, toUser, msg } = data
    if (type === 'sendMsg') {
      console.log(toUser)
      socket[toUser].send(JSON.stringify({
        type: 'sendMsg',
        from: 'user',
        msg
      }))
    }

  })
})

wss.broadcast = function(message) {
  try {
    wss.clients.forEach(ws => {
      const dataStr = JSON.stringify({
        type: 'broadcast',
        from: 'server',
        msg: message
      })
      console.log('广播数据')
      ws.send(dataStr)
    })
  } catch (e) {
    console.error(e)
  }
}

// wss.on('open', function(ws) {
//   console.log()
// })
