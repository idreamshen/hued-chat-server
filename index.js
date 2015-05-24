var app = require('http').createServer();
var io = require('socket.io')(app);
var co = require('co');

var Chat = require('./models').Chat;
var User = require('./models').User;

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('login', function (data) {
    co(function *() {
      var userid = data.user_id;
      var user = yield User.findOne({_id: userid}).exec();
      var nickname = user.nickname;
      socket.nickname = nickname;
      socket.userid = userid;
      socket.emit('login', {success: true});
    });
  });

  socket.on('chat', function (data) {
    co(function *() {
      var message = data.message;
      var nickname = socket.nickname;
      var chat = new Chat({
        user_id: socket.userid,
        message: message
      });
      yield chat.save();
      var _data = {};
      _data = chat.toJSON();
      delete _data.user_id;
      delete _data._id;
      _data.nickname = nickname;
      _data.create_at = _data.create_at.toLocaleDateString();
      io.emit('chat', _data);
    });
  });
});

app.listen(9001);