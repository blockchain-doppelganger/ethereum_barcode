var mailgun = require("mailgun-js");
var api_key = '8c26e9041bca200613884d7a6717a95a-a3d67641-84de70a1';
var DOMAIN = 'sandbox640503b767f84ffca0cd36fc2ab987b0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

// var data = {
//   from: 'admin@etherbarcode.com',
//   to: 'joveee@tutanota.com,',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!'
// };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
// });

const data = {
    from: 'admin@etherbarcode.com',
    to: 'g1148999@nwytg.net',
    subject: 'Confirm email',
    text:  `To confirm email and activate account please click the link http://46.101.60.189:3000/verify/${user.secret}`
  };
  
  mailgun.messages().send(data, function (error, body) {
    // console.log(body);
  });