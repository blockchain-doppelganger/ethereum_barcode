const devery = require('@devery/devery');
const DeveryRegistry = devery.DeveryRegistry;

let deveryRegistryClient = new DeveryRegistry({address:'0xf3838287aeae92300bd98a4d82ad5b841ff35f58'});
// let deveryRegistryClient = new DeveryRegistry();

deveryRegistryClient.check("0x627306090abaB3A6e1400e9345bC60c78a8BEf57").then(item => {
    console.log('product brand',item.brandAccount);
    //other stuff
})



deveryRegistryClient.brandAccountsLength().then(function(totalAccounts){
    for(let i = 0;i< totalAccounts;i++){
         deveryRegistryClient.brandAccountsArray(i).then(address => {
            deveryRegistryClient.getBrand(address).then(brand => {
                 console.log(brand.brandName)
                  //... do more stuff
             })
          })
     }

})

// deveryRegistryClient.appAccountsLength().then(function(totalAccounts){
//     for(let i = 0;i< totalAccounts;i++){
//          deveryRegistryClient.appAccountsArray(i).then(function(addr){
//              console.log(addr);
//              deveryRegistryClient.getApp(addr).then(function(app){
//                  console.log(app);
//                  console.log(app.appName);
//                   //... do more stuff
//              })
//           })
//      }
// })


// $(document).ready(function(){
	
// 	$('input[type=password]').keyup(function() {
// 		var pswd = $(this).val();
		
// 		//validate the length
// 		if ( pswd.length < 8 ) {
// 			$('#length').removeClass('valid').addClass('invalid');
// 		} else {
// 			$('#length').removeClass('invalid').addClass('valid');
// 		}
		
// 		//validate letter
// 		if ( pswd.match(/[A-z]/) ) {
// 			$('#letter').removeClass('invalid').addClass('valid');
// 		} else {
// 			$('#letter').removeClass('valid').addClass('invalid');
// 		}

// 		//validate capital letter
// 		if ( pswd.match(/[A-Z]/) ) {
// 			$('#capital').removeClass('invalid').addClass('valid');
// 		} else {
// 			$('#capital').removeClass('valid').addClass('invalid');
// 		}

// 		//validate number
// 		if ( pswd.match(/\d/) ) {
// 			$('#number').removeClass('invalid').addClass('valid');
// 		} else {
// 			$('#number').removeClass('valid').addClass('invalid');
// 		}
		
// 		//validate space
// 		if ( pswd.match(/[^a-zA-Z0-9\-\/]/) ) {
// 			$('#space').removeClass('invalid').addClass('valid');
// 		} else {
// 			$('#space').removeClass('valid').addClass('invalid');
// 		}
		
// 	}).focus(function() {
// 		$('#pswd_info').show();
// 	}).blur(function() {
// 		$('#pswd_info').hide();
// 	});
	
// });