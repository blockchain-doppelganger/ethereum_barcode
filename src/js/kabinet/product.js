
function initWeb3(){

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
        $('.warning').html();
        const addressUser = web3.eth.coinbase;
        deveryRegistryClient.getApp(addressUser).then(app => {
            // console.log(app)
            // console.log(app.appAccount);
            // console.log(utils.isAddress(app.appAccount));
            const emptyAddress = /^0x0+$/.test(app.appAccount);
            if (emptyAddress){
                $('#product_warning').html("You didn't register your company and brand. Please go to Brand link and follow the instructions");
            }
            else {
                $('#product_warning').html('');
                const userAddress = toChecksumAddress(web3.eth.coinbase);
                // console.log(userAddress)
                var lengthProduct =0;
                deveryRegistryClient.productAccountsLength().then(function(res){
                    console.log(res);
                    for(let i = 0;i< res;i++){
                         deveryRegistryClient.productAccountsArray(i).then(address => {
                            deveryRegistryClient.getProduct(address).then(product => {
                                // console.log(product.brandAccount);
                                 if (product.brandAccount == userAddress) {
                                    lengthProduct++;
                                    console.log(address);
                                    // lass=c"btn btn-primary" 
                                    //aria-expanded="false
                                    $('</p>').append(
                                        $( "<a/>", {
                                            html: address,
                                            "class":"btn btn-primary ",
                                            href: "."+address,
                                            "data-toggle":"collapse",
                                            "role":"button",
                                            "aria-expanded":"false",
                                            "aria-controls":address
                                        })).
                                    appendTo('.productList');

                                    var newform = $('<form></form>',{
                                        "class":address + ' collapse '
                                    });


                                    var descField = $('<div></div>',{
                                       "class":"form-group col-md-6"
                                    });
                                    $(' <label for="updateProductDesc">Product description *</label>').appendTo(descField);
                                    $('<input></input>',{
                                        "type":"text" ,
                                        "class":"form-control" ,
                                        "id":"updateProductDesc",
                                        "required":true,
                                       "placeholder": product.description
                                     }).appendTo(descField);
                                //    $('<hr/>').appendTo('.productList');

                                   var detailsField = $('<div></div>',{
                                        "class":"form-group col-md-6"
                                    });
                                    $(' <label for="updateProductDet">Product details *</label>').appendTo(detailsField);
                                    $('<input></input>',{
                                        "type":"text" ,
                                        "class":"form-control" ,
                                        "id":"updateProductDet",
                                        "required":true,
                                        "placeholder": product.details
                                    }).appendTo(detailsField);

                                    var yearField = $('<div></div>',{
                                        "class":"form-group col-md-6"
                                    });
                                    $(' <label for="updateProductYear">Year (optional) </label>')
                                    .appendTo(yearField);
                                    $('<input></input>',{
                                        "type":"number" ,
                                        "min":"1900",
                                        "class":"form-control" ,
                                        "id":"updateProductYear",                    
                                        "placeholder": product.year
                                    }).appendTo(yearField);

                                    var originField = $('<div></div>',{
                                        "class":"form-group col-md-6"
                                    });
                                    $(' <label for="updateProductOrigin">Product origin (optional)</label>')
                                    .appendTo(originField);
                                    $('<input></input>',{
                                        "type":"text" ,
                                        "class":"form-control" ,
                                        "id":"updateProductOrigin",
                                        "placeholder": product.origin
                                    }).appendTo(originField);


                                $('<hr/>').appendTo(newform);
                               
                                descField.appendTo(newform);
                                detailsField.appendTo(newform);
                                yearField.appendTo(newform);
                                originField.appendTo(newform);
                                $('<a/>',{
                                    "role":'button',
                                    "class":"btn btn-info",
                                    html:'update info',
                                    "click":function(e){
                                        e.preventDefault;
                                        let desc = $('.'+address +'  #updateProductDesc').val();
                                        let det = $('.'+address +'  #updateProductDet').val();
                                        let year = $('.'+address +'  #updateProductYear').val();
                                        let orig = $('.'+address +'  #updateProductOrigin').val();
                                        
                                        deveryRegistryClient.updateProduct(address,desc,det,year,orig,true).then(transaction => {
                                            // console.log('transaction address',transaction.hash);
                                            //... other stuff
                                        }).catch(err => {
                                            if(err.message.indexOf('User denied')){
                                                alert('some problem. Try after some time ...');
                                                //...
                                            }
                                                ///handle other exceptions here                             
                                       })
                                        // console.log(desc);
                                    }
                                }).appendTo(newform)
                                $('<hr>').appendTo(newform);
                                newform.appendTo('.productList');
                                // $('<br>').appendTo('.productList');
                                
                                $('#userProductCount').html(lengthProduct);
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
            }
            // if(app.active){
            //     console.log(app.appName);
            //     //... other stuff
            // }
        })
	} else {
	  // Set the provider you want from Web3.providers
        $('.product_warning').html('Please connect to Metamask and refresh page ...');
		// $('.container').hide();
	}

	// var networkId = web3.version.network;
	// var user_address = web3.eth.accounts[0];
	// console.log(user_address);

}

$(window).on('load',function(){
    initWeb3();

})