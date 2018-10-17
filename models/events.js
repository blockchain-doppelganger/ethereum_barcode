var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    timestamp:{
       type: Date, default: Date.now
    },
    appName:{
      type:String
    },
    appAddress:{
      type:String
    },
    brandName:{
      type:String
    },
    brandAddress:{
      type:String
    },
    event: {
      type: String,
      unique: false,
      required: true,
      trim: true
    }
  });

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;