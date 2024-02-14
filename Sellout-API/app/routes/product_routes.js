const express = require('express');
const axios = require('axios');
const router = express.Router();




// router.post('/tvs', requireToken, (req, res, next) => {
// 	req.body.tv.owner = req.user.id
// 	TV.create(req.body.tv)
// 		.then((tv) => {
// 			res.status(201).json({ tv: tv.toObject(), message: 'Product posted' });
			
	
// 		})
// 		.catch(next)
// })


const BEST_BUY_API_KEY = 'vhVxQOlJ5gdHCaYVN5bkof7P';

// Route to search products by keyword
router.get('/search/:keyword', async (req, res) => {
    const keyword = req.params.keyword;
    const url = `https://api.bestbuy.com/v1/products((search=${keyword}))?apiKey=vhVxQOlJ5gdHCaYVN5bkof7P&sort=bestSellingRank.asc&show=bestSellingRank,categoryPath.id,categoryPath.name,color,description,details.name,details.value,dollarSavings,features.feature,freeShipping,image,inStoreAvailability,inStoreAvailabilityText,manufacturer,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,percentSavings,regularPrice,relatedProducts.sku,salePrice,shippingCost,shortDescription,sku,type,upc&facet=bestSellingRank,10&pageSize=3&format=json`

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data.products); // Send back the list of products
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

module.exports = router;