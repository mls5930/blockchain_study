const SocketIO = require('socket.io');

module.exports = (http) => {
  const io = SocketIO(http);

  io.on('connection', (socket) => {
    // data 이벤트 발생시
    socket.on('chat', (data) => {
      console.log(data);
      // data: 긴 설 연휴 보내느라 힘들었죠 ㅠ
      const json = {
        userId: 'wnqudgus1234',
        data
      }
      // 본인을 제외한 나머지 호스트에게 스트링타입으로 데이터를 보냄
      // client.send(`${msg}`)
      socket.broadcast.emit('chat', JSON.stringify(json));
    })
 
    socket.on('disconnect', (data) => {
      console.log(data);
    })
  })
}