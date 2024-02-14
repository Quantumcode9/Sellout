const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
db = require('../../config/db')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()






router.get('/search/:keyword', (req, res, next) => {
	axios.get(`https://api.bestbuy.com/v1/products((search=${req.params.keyword})&onlineAvailability=true)?apiKey=vhVxQOlJ5gdHCaYVN5bkof7P&sort=bestSellingRank.asc&show=bestSellingRank,categoryPath.id,categoryPath.name,color,description,details.name,details.value,dollarSavings,features.feature,freeShipping,image,inStoreAvailability,inStoreAvailabilityText,manufacturer,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,percentSavings,regularPrice,relatedProducts.sku,salePrice,shippingCost,shortDescription,sku,type,upc&facet=bestSellingRank,10&pageSize=3&format=json`)
	.then((response) => {
		res.status(200).json({ products: response.data.products })
	})
	.catch(next)
})


module.exports = router;

