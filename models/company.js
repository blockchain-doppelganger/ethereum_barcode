var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    companyName:{
        type:String,
        unique:true,
        trim:true
    },
    address: {
      type: String,
      unique: false,
      required: false,
      trim: true
    },
    address2: {
      type: String,
      unique: false,
      required: false,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    zip: {
      type: String,
      required: true,
      trim: true
    },
    verified:{
      type:Boolean
    },
    barcodeActive:{
      type:Boolean
    }
  
  });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;