const mongoose = require('mongoose')

const OrdertypesSchema = new mongoose.Schema(
    {
  orderType: {
    type: String,
    required: true
  }
},
{ timestamps: true });


module.exports = mongoose.model('Ordertypes', OrdertypesSchema)
