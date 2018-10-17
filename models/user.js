var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  active:{
    type:Boolean
  },
  secret:{
    type:String
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (nickname, password, callback) {
  User.findOne({ username: nickname })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        // console.log('user didnt find')
        return callback(err);
      }
      // console.log('comparing pws ..');
      // console.log(user.password);
      // console.log(password);
      // bcrypt.hash(password, 10, (er,res)=>{console.log(res)});
      bcrypt.compare(password, user.password, function (err, resultC) {
        // console.log(resultC);
        if (resultC === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   var user = this;
//   console.log(user.password);
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     console.log(user.password);
//     next();
//   })
// });



var User = mongoose.model('User', UserSchema);

module.exports = User;
