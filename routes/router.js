var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');
var path = require('path');
var createHash = require("string-hash");
// var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

var devery = require('@devery/devery');
var DeveryRegistry = devery.DeveryRegistry;
var utils = devery.Utils;
// var deveryRegistryClient = new DeveryRegistry({address:'0xf3838287aeae92300bd98a4d82ad5b841ff35f58'});
var deveryRegistryClient = new DeveryRegistry();

// var mailgun = require("mailgun-js");
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});


// var transporter = nodemailer.createTransport({
//   service: 'tutanota',
//   auth: {
//     user: 'ether_barcode@tutanota.com',
//     pass: 'eRh?FuUhE5#{CPZR'
//   }
// });


// var dirname = ;
// console.log('__dirname',__dirname);
// GET route for reading data
router.get('/', function (req, res, next) {
  return res.render('home');
});

//POST route for updating data
router.post('/', function (req, res, next) {
  // console.log(req.body.email);
  // console.log(req.body.nickname);
  // console.log(req.body.passwd);
  // console.log(req.body.passwdRepeat);

  // confirm that user typed same password twice
  if (req.body.passwd !== req.body.passwdRepeat) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (
    req.body.nickname &&
    req.body.passwd &&
    req.body.passwdRepeat) {

    var userData ={
      username: req.body.nickname,
      password: bcrypt.hashSync(req.body.passwd,10),
      passwordConf: req.body.passwdRepeat,
      active:true,
      secret: createHash(req.body.email+req.body.nickname)
    };

    // const hash = createHash(req.body.email+req.body.nickname);
    // console.log(hash);
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        console.log('create user');
        res.redirect('/home');
        // var  text =  `To confirm email and activate account please click the link http://46.101.60.189:3000/verify/${user.secret}`
        // console.log(text);
        // console.log(user.email);
        // const data = {
        //   from: 'admin@etherbarcode.com',
        //   to: user.email,
        //   subject: 'Confirm email',
        //   text:  `To confirm email and activate account please click the link http://46.101.60.189:3000/verify/${user.secret}`
        // };
        
        // mailgun.messages().send(data, function (error, body) {
        //   console.log(body);
        // });
        
        // req.session.userId = user._id;
        // alert('Confirm email')
        // return res.redirect('/profile');
      }
    });

  } else if (req.body.logname && req.body.loginPasswd) {
    
    User.authenticate(req.body.logname, req.body.loginPasswd, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }
      else if (!user.active){
        var err = new Error('PLease, confirm your email');
        err.status = 401;
        return next(err);
      }
      else {
        req.session.userId = user._id;
        obj = {
          // email: req.body.logemail,
          username: user.username
        }
        return res.render('profile', obj);
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          obj = {
            // email: user.email,
            username: user.username
          }
          return res.render('profile', obj);
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});


router.get('/brand', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          // obj = {
          //   email: user.email
          // }
          return res.render('brand');
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});


router.get('/brand', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          var companyId = user.companyId;
          console.log(companyId);
          // Company.findById(companyId).exec(function(error,comp){
          //     if (error) {
          //       return next(error);
          //     }
          //     else { 
          //       if (comp === null) {
          //         console.log('company is not register');
          //         // var err = new Error('Not authorized! Go back!');
          //         // err.status = 400;
          //         // return next(err);
          //     }
          //     else{
          //       var obj = {
          //         companyName: comp.companyName,
          //         address: comp.address,
          //         address2: comp.address2,
          //         city:comp.city,
          //         zip:comp.zip
                  
          //       }
          //       console.log(obj);
      
          //       return res.render('brand',obj);
          //     }
           
          //   }
          // });
          
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});


router.get('/check', function (req, res, next) {
    return res.render('check');
});

router.get('/product', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          // obj = {
          //   email: user.email
          // }
          return res.render('product');
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});

router.get('/createBarcode', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          // obj = {
          //   email: user.email
          // }
          return res.render('createBarcode');
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});

router.get('/account', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          // return next(err)
          return res.render('home');
          // return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));

        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          obj = {
            email: user.email
          }
          return res.render('profile');
          // return res.render(path.join(__dirname + '/../templateLogReg/profile.html'), obj);

        }
      }
    });
});

router.get('/home', function (req, res, next) {
    return res.render('home');
});


// for create and upgrade company info 

router.post('/companyUpdate', function (req, res, next) {
  console.log('we here, companyUpdate');
  var CompanyDetails = {
    companyName : req.body.companyName,
    address: req.body.address,
    address2: req.body.address2,
    city:req.body.city,
    zip:req.body.zip
  };


  Company.find({id:User.findById(req.session.userId).companyId}).update(CompanyDetails, function(error,Company){
    if (error) {
      return next(error);
    } else {
      // req.session.userId = user._id;
      console.log('company update');
      res.redirect('/brand');
      // User.findById(req.session.userId).update({companyId: Company._id},{})
      // return res.redirect('/profile');
    }
  });
});

router.post('/companyRegister', function(req,res,next){

  var CompanyDetails = {
    companyName : req.body.companyName,
    address: req.body.address,
    address2: req.body.address2,
    city:req.body.city,
    zip:req.body.zip
  }
  Company.create(CompanyDetails, function(er,Company){
    if (error) {
      return next(error);
    } else {
      // req.session.userId = user._id;
      console.log('company register');
      User.findById(req.session.userId).update({companyId: Company._id},{})
      // return res.redirect('/profile');
    }
  });
});


// for creating product 

router.post('/createProduct', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          
          if (req.body.description && req.body.details){
            const addr = utils.getRandomAddress();
            deveryRegistryClient.addProduct(addr,req.body.description,req.body.details,req.body.year,req.body.origin).then(transaction => {
              
              var eventData ={
                  app: req.body.nickname,
                  brand: 
                };

            Events.create(eventData, function(er,Event){

            })
            // console.log('transaction address',transaction.hash);
            //... other stuff
        }).catch(err => {
            if(err.message.indexOf('User denied')){
                console.log('The user denied the transaction')
                //...
            }

            ///handle other exceptions here

        })
          }




          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          obj = {
            // email: user.email,
            username: user.username
          }
          return res.render('profile', obj);

        }
      }
    });
});









// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// for email confirmating

// router.get('/verify/:userSecret', function (req, res, next) {
  
//    User.findOne({'secret':req.params.userSecret}).exec(function(er,user){
//     if (er || !user){
//       // req.flash("Code isn't corect");
//       res.redirect('/home');
//     }
  
//     user.active = true;
//     user.secret = '';
//     user.save(function(er,result){
//       // req.flash('success','please login');
//       res.redirect('/home');
//     });
//     console.log('success');
  
//   }).catch((error)=>{
//     console.log(error);
//   });
  
  

// });


module.exports = router;