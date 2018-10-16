function initWeb3(){


	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
		console.log('done ...')
		$('.container').show();
		$('.warning').html();
	} else {
	  // Set the provider you want from Web3.providers
		$('.warning').html('Please connect to Metamask and refresh page ...');
		$('.container').hide();
	}

	// var networkId = web3.version.network;
	// var user_address = web3.eth.accounts[0];
	// console.log(user_address);

}

$(window).on('load',function(){
    initWeb3();

})