const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()



router.get('/search/:keyword', (req, res, next) => {
  axios.get(`https://api.bestbuy.com/v1/products((search=${req.params.keyword})&onlineAvailability=true)?apiKey=${process.env.BEST_BUY_API_KEY}&&sort=bestSellingRank.asc&show=details.name,dollarSavings,features.feature,image,inStoreAvailability,manufacturer,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,sku,upc,details.value&facet=bestSellingRank,20&pageSize=3&format=json`)
    .then((response) => {
      res.status(200).json({ products: response.data.products })
    })
    .catch(next)
})



router.get('/products/:id', (req, res, next) => {
  axios.get(`https://api.bestbuy.com/v1/products/${req.params.id}.json?apiKey=${process .env.BEST_BUY_API_KEY}`)
    .then((response) => {
      res.status(200).json({ product: response.data })
    })
    .catch(next)
})










module.exports = router;


