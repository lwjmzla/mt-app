const mongoose = require('mongoose')
// const OrderModule = mongoose.model('Order', new mongoose.Schema({
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  imgs: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  }
})
// module.exports = OrderModule
module.exports = mongoose.model('Order', Order)
