var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

require('./user.js');
require('./chat.js');

exports.User = mongoose.model('User');
exports.Chat = mongoose.model('Chat');