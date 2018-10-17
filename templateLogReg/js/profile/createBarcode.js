
function initWeb3(){

    var FileSaver = require('file-saver');
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
        $('#warning').html();
        const userAddress = toChecksumAddress(web3.eth.coinbase);
        deveryRegistryClient.getBrand(userAddress).then(brand => {
            const emptyAddress = /^0x0+$/.test(brand.appAccount);
            if (emptyAddress){
                $('#product_warning').html("You didn't register your company and brand. Please go to Brand link and follow the instructions");
                $('.register_product').hide();
            }
            else {
                $('#product_warning').html('');
                var lengthProduct =0;
                deveryRegistryClient.productAccountsLength().then(function(res){
                    for(let i = 0;i< res;i++){
                         deveryRegistryClient.productAccountsArray(i).then(address => {
                            deveryRegistryClient.getProduct(address).then(product => {
                                // console.log(product.brandAccount);
                                 if (product.brandAccount == userAddress) {
                                    lengthProduct++;

                                    var row = $('<tr></tr>');
                                    $('<td></td>',{
                                        html:product.description
                                    }).appendTo(row)
                                    $('<td></td>',{
                                        html:product.details
                                    }).appendTo(row)
                                    $('<td></td>',{
                                        html:product.year
                                    }).appendTo(row)
                                    $('<td></td>',{
                                        html:product.origin
                                    }).appendTo(row)

                                    deveryRegistryClient.check(address).then(item => {
                                        if (item.brandAccount == userAddress){
                                            var barcode = $('<td></td>',{
                                                "class":"text-center",
                                                'id':address
                                            }).appendTo(row);
                                            const codeWriter = new ZXing.BrowserQRCodeSvgWriter(address)
                                            // console.log('ZXing code writer initialized')
                                            let svgElement;
                                            svgElement = codeWriter.write(address, 300, 300);
                                            $('<button></button>',{
                                                "class":"btn",
                                                html:'download barcode',
                                                "click":function(){
                                                    const svgData = (new XMLSerializer()).serializeToString(svgElement)
                                                    const blob = new Blob([svgData])
                                                    saveAs(blob, address+'.svg')
                                                }
                                            }).appendTo(barcode);
                                        }
                                        else{
                                            var barcode = $('<td></td>',{
                                                "class":"text-center",
                                                'id':address
                                            }).appendTo(row);
                                            var createbtn = $('<button></button>',{
                                                "class":"btn",
                                                html:'create barcode',
                                                'click':function(){
                                                    deveryRegistryClient.addressHash(address).then(hashRes => {
                                                            deveryRegistryClient.mark(address,hashRes).then(transaction => {
                                                            const codeWriter = new ZXing.BrowserQRCodeSvgWriter(address)
                                                            // console.log('ZXing code writer initialized')
                                                            let svgElement;
                                                            createbtn.hide();
                                                            // const input = document.getElementById('textInput').value
                                                            svgElement = codeWriter.write(address, 300, 300)
                                                            $('<button></button>',{
                                                                "class":"btn",
                                                                html:'download barcode',
                                                                "click":function(){
                                                                    const svgData = (new XMLSerializer()).serializeToString(svgElement)
                                                                    const blob = new Blob([svgData])
                                                                    saveAs(blob, address+'.svg')
                                                                }
                                                            }).appendTo(barcode);
                                                        }).catch(err => {
                                                            if(err.message.indexOf('User denied')){
                                                                console.log('The user denied the transaction')
                                                                //...
                                                            }
                                                        })
                                                    });
                                                    
                                                    
                                                        // document.getElementById('saveButton').removeAttribute('disabled')

                                                    // document.getElementById('saveButton').addEventListener('click', () => {
                                                    //     const svgData = (new XMLSerializer()).serializeToString(svgElement)
                                                    //     const blob = new Blob([svgData])
                                                    //     saveAs(blob, 'zxing-qrcode-example.svg')
                                                }
                                            }).appendTo(barcode);
                                        }
                                        //... other stuff
                                   })
                                    row.appendTo('#myTable');

                                    // $('#userProductCount').html(lengthProduct);

                                }
                                 else{
                                    //  console.log('none');
                                 }
                                //  console.log(brand.brandName);
                                  //... do more stuff
                             })
                          })
                    }

                });  
            }
            // if(app.active){
            //     console.log(app.appName);
            //     //... other stuff
            // }
        });
    } 
    
    else {
	  // Set the provider you want from Web3.providers
        $('.product_warning').html('Please connect to Metamask and refresh page ...');
		// $('.container').hide();
	}

}

$(window).on('load',function(){
    initWeb3();

})