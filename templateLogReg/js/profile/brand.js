
function initWeb3(){
    // var deveryLibr = window.Acme || {};
    const createKeccakHash = require('keccak')

    function toChecksumAddress(address) {
        address = address.toLowerCase().replace('0x', '')
        var hash = createKeccakHash('keccak256').update(address).digest('hex')
        var ret = '0x'

        for (var i = 0; i < address.length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase()
            } else {
            ret += address[i]
            }
        }

        return ret
    }

    const devery = require('@devery/devery');
    const DeveryRegistry = devery.DeveryRegistry;
    // let deveryRegistryClient = new DeveryRegistry({address:'0xf3838287aeae92300bd98a4d82ad5b841ff35f58'});
    var deveryRegistryClient = new DeveryRegistry();
    window.deveryRegistryClient = deveryRegistryClient;

    // const devery = require('../../../node_modules/@devery/devery/devery');
    // const devery = require('devery');
    // import DeveryRegistry from '../../../node_modules/@devery/devery/devery';
    // const utils = devery.Utils;
   
    
	if (typeof web3 !== 'undefined') {
        
	    web3 = new Web3(web3.currentProvider);
        console.log('done ...')
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) console.error("An error occurred: "+err);
            else if (accounts.length == 0) {
                console.log("User is not logged in to MetaMask");
                $('#product_warning').html('Please connect to Metamask and refresh page ...');
            
            }
            else {
                console.log("User is logged in to MetaMask");
                $('.warning').html();
                const addressUser = web3.eth.coinbase;
                deveryRegistryClient.getApp(addressUser).then(app => {
                    // console.log(app)
                    //check if app account is empty
                    const emptyAddress = /^0x0+$/.test(app.appAccount);
                    if (emptyAddress){
                        $('#userAddress').html(addressUser);
                        $('#product_warning').html("You didn't register your company. Fill the field below and submit");
                        $('.register_app').show();
                        $('.update_app').hide();
                        $('.brandList').hide();
                        $('.createBrand').hide();
                        
                    }
                    else {
                        $('#product_warning').html('');
                        $('.register_app').hide();
                        $('.update_app').show();
                        $('.brandList').show();
                        $('.createBrand').show();
                        $('#updateCompanyName').val(app.appName);

                        // web3.eth.getAccounts((err, res) => {                   
                        //     console.log();
                        // });
                        // console.log('accounts',accounts);
                        // accounts.forEach(address => {
                        //     deveryRegistryClient.getBrand(address).then(brand => {
                        //         if(brand.active){
                        //             const newRow = $('<tr></tr>')
                        //             $('<th></th>',{
                        //                 html:brand.brandName
                        //             }).appendTo(newRow);
                        //             $('<td></td>',{
                        //                 html:brand.brandAccount
                        //             }).appendTo(newRow);
                        //             newRow.appendTo($('#otherBrandList'));
                        //         }
                        //    })
                        // });
                        const userAddress = toChecksumAddress(web3.eth.coinbase);
                        
                        deveryRegistryClient.brandAccountsLength().then(function(res){
                            console.log(res);
                            for(let i = 0;i< res;i++){
                                deveryRegistryClient.brandAccountsArray(i).then(address => {
                                    deveryRegistryClient.getBrand(address).then(brand => {
                                        console.log(brand.appAccount);
                                        if (brand.appAccount == userAddress) {
                                            const newRow = $('<tr></tr>')
                                            $('<th></th>',{
                                                html:brand.brandName
                                            }).appendTo(newRow);
                                            $('<td></td>',{
                                                html:brand.brandAccount
                                            }).appendTo(newRow);
                                            newRow.appendTo($('#brandList'));
                                            // lengthBrand++;
                                            // $('#userBrandCount').html(String(lengthBrand));
                                            // $('#brandList').append("<p>" + brand.brandName + "  -  " + brand.brandAccount+"</p>");
                                        }
                                        else{
                                            //  console.log('none');
                                        }
                                        //  console.log(brand.brandName);
                                        //... do more stuff
                                    })
                                })
                            }

                            //  console.log(lengthBrand);
                        });  
                        
                        // console.log(lengthBrand); 
                    }
                    // if(app.active){
                    //     console.log(app.appName);
                    //     //... other stuff
                    // }
                })
            }
        });
		// $('.container').show();
        
	} else {
	  // Set the provider you want from Web3.providers
        $('#product_warning').html('Please connect to Metamask and refresh page ...');
        


		// $('.container').hide();
	}

	// var networkId = web3.version.network;
	// var user_address = web3.eth.accounts[0];
	// console.log(user_address);

}

$(window).on('load',function(){
    initWeb3();

})


// $("#submit_app").click(function(event){
//     alert('hi');
//     const AppName = $('#inputCompanyName').val();
//     console.log(AppName);
//     event.stopPropagation();
// });


// document.getElementById("submit_app").addEventListener("click", function(event){
//     event.preventDefault()
// });
// function createApp(event){
//     event.preventDefault();
//     
// }