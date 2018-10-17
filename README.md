# Ethereum barcode

(live demo - http://46.101.60.189:3000 )
Platform for creating and managing barcodes via Etherereum blockchain


## Getting started

Install mongoDB 

after that type -
```
node app
```

## Start server
When you run starting command (npm run dev), go to localhost:3000 (it must automatically open in browser), you will see next page

Go to registration link and submit form
<br/>
<br/>

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/registration.png)

<br/>
<br/>

then login 
<br/>
<br/>


![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/login.png)

## Go to you account page

Go to localhost:3000/profile. You will see this:

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/profile.png)

## Firstly, register your company and brand

Go to brand link (/brand), fill the form, submit
After that register new brand (for your Ethereum address only one brand ) 

<br/>
<br/>

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/brand.png)

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/brand2.png)


## Secondly, register your product 

Go to product link (localhost:3000/product) , and fill the form, submit 

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/master/git_img/createProduct.png)

## Finally, create barcode for your products

Go to barcode link, firstly activate barcode creating, click the button about. 
<br/>
Wait for transaction confirmation.
<br/>
After that you can find your product in table below and create barcode for it, and download.

<br/>
<br/>

![alt text](https://raw.githubusercontent.com/blockchain-doppelganger/ethereum_barcode/with_registration/v2/barcode.png)

## Check barcode

Go to localhost:3000/check, upload barcode, click decode, you will see company name, brand name, product info 

<br/>
<br/>


# Repository structure 

- config/ (not neccessary )
- misc/ (not neccessary, will be used in future project version)
- models/ (define models for mongoDB)
- node_modes/ (all neccessaries libraries)
- routes/ (define path for our express app, preprocess get and post request) 
- templateLogReg/ (static files - js script for our pages, images, and css) 
    - dist/ (in this repository we will save script preproccess by browserify )
- v2/ (just images for github README.md file, you read this file now )
views/ (here we define our page look, use ejs engine and express )

- app.js (start point for our app, we will use command node app.js to run it )



