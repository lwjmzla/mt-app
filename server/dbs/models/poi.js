const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String// 景点名
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: { // 区县
    type: String
  },
  areaCode: { // 区号
    type: String
  },
  tel: {
    type: String
  },
  area: { // 地区 商圈
    type: String
  },
  addr: {
    type: String
  },
  type: { // 类型  旅游 餐饮 美食
    type: String
  },
  module: { // 子分类
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

module.exports = mongoose.model('Poi', Poi)
