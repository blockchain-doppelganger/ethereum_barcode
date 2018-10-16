
function initWeb3(){

    // import module to below function, return hash of string
    const createKeccakHash = require('keccak')

    // to get address in correct format 
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
    let deveryRegistryClient = new DeveryRegistry();
    // add to global variable
    window.utils = utils;
    window.deveryRegistryClient = deveryRegistryClient;

   
	if (typeof web3 !== 'undefined') {
	    web3 = new Web3(web3.currentProvider);
		// console.log('done ...')
		// $('.container').show();
        $('.warning').html();
        const addressUser = web3.eth.coinbase;
        deveryRegistryClient.getApp(addressUser).then(app => {
            // check if we right connect to ethereum via metamask
            const emptyAddress = /^0x0+$/.test(app.appAccount);
            if (emptyAddress){
                $('#product_warning').html("You didn't register your company and brand. Please go to Brand link and follow the instructions");
            }
            else {
                //ok, we're connected, no error ...
                $('#product_warning').html('');
                // get user address in correct format
                const userAddress = toChecksumAddress(web3.eth.coinbase);
                var lengthProduct = 0;

                // get all user product and display they on product page
                deveryRegistryClient.productAccountsLength().then(function(res){
                    for(let i = 0;i< res;i++){
                         deveryRegistryClient.productAccountsArray(i).then(address => {
                            deveryRegistryClient.getProduct(address).then(product => { 
                                 if (product.brandAccount == userAddress) {
                                    lengthProduct++;
                                    
                                    // create button to toggle product information
                                    $('</p>').append(
                                        $( "<a/>", {
                                            html: address,
                                            "style":'color:white',
                                            "class":"btn btn-primary ",
                                            href: "."+address,
                                            "data-toggle":"collapse",
                                            "role":"button",
                                            "aria-expanded":"false",
                                            "aria-controls":address
                                        })).
                                    appendTo('.productList');
                                    
                                    // all product info will be in form input, so user can update info
                                    var newform = $('<form></form>',{
                                        "class":address + ' collapse '
                                    });

                                    // product description fiels
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

                                     // product details fiels
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

                                // create button to update product info
                                $('<a/>',{
                                    "role":'button',
                                    "class":"btn btn-info",
                                    html:'update info',
                                    "click":function(e){

                                        const prodAddress = $(this).parent().attr('class').split(' ')[0];
                                        const desc = $(this).parent().find('#updateProductDesc').val();
                                        const det = $(this).parent().find('#updateProductDet').val();
                                        const year = $(this).parent().find('#updateProductYear').val();
                                        const orig = $(this).parent().find('#updateProductOrigin').val();
                                        const acti = $(this).parent().find('#updateProductActive').is(':checked');
                                        
                                        deveryRegistryClient.updateProduct(prodAddress,desc,det,year,orig,true).then(transaction => {
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
                                
                                //
                                $('#userProductCount').html(lengthProduct);
                                }
                                 else{
                                    
                                 }
                                
                             })
                          })
                     }
                });  
            }
        })
	} else {
	  // Set the provider you want from Web3.providers
        $('.product_warning').html('Please connect to Metamask and refresh page ...');
		// $('.container').hide();
	}


}

$(window).on('load',function(){
    initWeb3();

})