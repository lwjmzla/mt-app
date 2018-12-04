const Router = require('koa-router')
// const axios = require('./utils/axios')
const Order = require('../dbs/models/order')
const Cart = require('../dbs/models/cart')
const md5 = require('crypto-js/md5')
// const dbConfig = require('../dbs/config')
// const mongoose = require('mongoose')

const router = new Router({
  prefix: '/order'
})

router.post('/createOrder', async ctx => {
  // mongoose.connect(dbConfig.dbs, {
  //   useNewUrlParser: true
  // })
  let { id, price, count } = ctx.request.body // 这个ID是购物车ID
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let findCart = await Cart.findOne({ cartNo: id }) // 找到name imgs
    let order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0 // 暂时 就一个状态 未付款
    })
    try {
      let result = await order.save()
      if (result) {
        // await findCart.remove() // 删除购物车0
        await Cart.where({ cartNo: id }).remove() // 这样多一步查询
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
})

router.post('/getOrders', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    // console.log('order')
    let result = await Order.find() // !找所有订单 如果要分页 await Order.find().limit(15)
    // console.log('order1')
    if (result) {
      ctx.body = {
        code: 0,
        list: result
      }
    } else {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})
// })

module.exports = router
