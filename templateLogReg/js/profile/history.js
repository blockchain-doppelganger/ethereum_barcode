
function initWeb3(){

    const axios = require('axios');
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
    const utils = devery.Utils;
    window.utils = utils;
    let deveryRegistryClient = new DeveryRegistry({address:'0xf3838287aeae92300bd98a4d82ad5b841ff35f58'});
    // let deveryRegistryClient = new DeveryRegistry();
    window.deveryRegistryClient = deveryRegistryClient;

   
	if (typeof web3 !== 'undefined') {
	    web3 = new Web3(web3.currentProvider);
		console.log('done ...')
		// $('.container').show();
        $('#product_warning').html();
        // var appAddr = '';
        // var brandAddr = '';
        // console.log(web3.eth.coinbase);
        deveryRegistryClient.getApp(web3.eth.coinbase).then(app => {
            // console.log('here');
            if(app.active){
                $('#historyItem').html('Company')
                $('#historyAddress').html(app.appAccount);

                axios.post('/getHistory',{
                    app:app.appAccount,
                    brand:''
                })
                .then(function(events){
                    events.data.forEach(event =>{
                        var newRow = $('<tr/>')
                        $('<td/>',{
                            html:event.appAddress
                        }).appendTo(newRow);
                        $('<td/>',{
                            html:event.brandAddress,
                        }).appendTo(newRow);
                        $('<td/>',{
                            html:event.event
                        }).appendTo(newRow);
                        $('<td/>',{
                            html:event.timestamp
                        }).appendTo(newRow);
                        newRow.appendTo('#historyTable');
                    })
                }).catch(function(er){
                    console.log(er);
                })
            }
            else{
                deveryRegistryClient.getBrand(web3.eth.coinbase).then(brand => {
                    console.log('he')
                    if(brand.active){
                        $('#historyItem').html('Brand')
                        $('#historyAddress').html(brand.brandAccount);
                        // brandAddr = brand.brandAccount;
                        axios.post('/getHistory',{
                            app:'',
                            brand:brand.brandAccount
                        })
                        .then(function(events){
                            events.data.forEach(event =>{
                                var newRow = $('<tr/>')
                                $('<td/>',{
                                    html:event.appAddress
                                }).appendTo(newRow);
                                $('<td/>',{
                                    html:event.brandAddress,
                                }).appendTo(newRow);
                                $('<td/>',{
                                    html:event.event
                                }).appendTo(newRow);
                                $('<td/>',{
                                    html:event.timestamp
                                }).appendTo(newRow);
                                newRow.appendTo('#historyTable');
                            })
                            
                            // console.log(res);
                        }).catch(function(er){
                            console.log(er);
                        })
                    } 
                    // consol.log(axios);
                    
            });
            }

        });
	} else {
	  // Set the provider you want from Web3.providers
        $('.product_warning').html('Please connect to Metamask and refresh page ...');
		// $('.container').hide();
	}
}

$(window).on('load',function(){
    initWeb3();

})