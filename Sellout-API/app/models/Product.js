const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
  name: String,
  value: String,
  values: [String]
});

const FeaturesSchema = new mongoose.Schema({
  feature: String
});

const ProductSchema = new mongoose.Schema({
  details: [DetailsSchema],
  dollarSavings: Number,
  features: [FeaturesSchema],
  frequentlyPurchasedWith: [String],
  image: String,
  manufacturer: String,
  modelNumber: String,
  name: String,
  onlineAvailabilityText: String,
  onSale: Boolean,
  percentSavings: String,
  regularPrice: Number,
  relatedProducts: [String],
  salePrice: Number,
  sku: Number,
  type: String,
  upc: String,
  url: String
});


module.exports = mongoose.model('Product', ProductSchema);

// const TVSchema = new mongoose.Schema({
//   products: [ProductSchema]
// });

// module.exports = mongoose.model('TV', TVSchema);