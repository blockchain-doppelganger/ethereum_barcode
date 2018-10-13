
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
    let deveryRegistryClient = new DeveryRegistry({address:'0xf3838287aeae92300bd98a4d82ad5b841ff35f58'});
    window.deveryRegistryClient = deveryRegistryClient;
    
	if (typeof web3 !== 'undefined') {
        
	    web3 = new Web3(web3.currentProvider);
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) console.error("An error occurred: "+err);
            else if (accounts.length == 0) {
                console.log("User is not logged in to MetaMask");
                $('#product_warning').html('Please connect to Metamask and refresh page ...');
            
            }
            else {
                console.log("User is logged in to MetaMask");
                $('#product_warning').html();
           }
        });
		
        
	} else {
	  // Set the provider you want from Web3.providers
        $('#product_warning').html('Please connect to Metamask and refresh page ...');
	}

}

$(window).on('load',function(){
    initWeb3();

})
