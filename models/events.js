var mongoose = require('mongoose');


var CompanySchema = new mongoose.Schema({
    timestamp:{
       type: Date, default: Date.now
    },
    app:{
      type:String
    },
    brand:{
      type:String
    },
    event: {
      type: String,
      unique: false,
      required: true,
      trim: true
    },
    transaction:{
      type: String
    }
  });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;