var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  user_id: {type: Schema.ObjectId},
  message: {type: String},
  create_at: {type: Date, default: Date.now}
});

ChatSchema.virtual('nickname').get(function () {
  return this.Nickname;
});
ChatSchema.virtual('nickname').set(function (val) {
  this.Nickname = val;
});

mongoose.model('Chat', ChatSchema);