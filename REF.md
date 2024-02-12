TVS
{
  modelNumber: String,
  size: Number,
  type: { type: String, enum: ['OLED', 'Mini LED', 'QLED', 'LED'] },
  refreshRate: { type: Number, enum: [120, 60] },
  highDynamicRangeFormat: { type: String, enum: ['Dolby Vision', 'HDR 10+', 'HDR 10', null] },
  brand: { type: String, enum: ['Samsung', 'LG', 'Sony', 'TCL', 'Roku', 'Hisense', 'other'] },
  audio: {
    type: new mongoose.Schema({
      channels: Number, 
      technology: String,  (Dolby Atmos, DTS, etc.)
    }, { _id: false }) 
  }
}


LAPTOPs
{
  modelNumber: String,
  size: Number, 
  processor: String, (ie Intel i7, AMD Ryzen 7)
  ram: Number, 
  storage: String, 
  graphics: String, 
  brand: { type: String, enum: ['Dell', 'HP', 'Apple', 'Lenovo', 'Asus', 'Acer', 'other'] },
  accessory: {
    type: new mongoose.Schema({

        }, { _id: false }) 
  } 

}