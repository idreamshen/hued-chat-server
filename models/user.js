var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @desc 用户模型
 * @type {Schema}
 */
var UserSchema = new Schema({
  username: {type: String},
  password: {type: String},
  nickname: {type: String},
  email: {type: String},
  is_admin: {type: Boolean, default: false},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
