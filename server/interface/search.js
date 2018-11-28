const Router = require('koa-router')
const axios = require('./utils/axios')
// const Poi = require('../dbs/models/poi')

let router = new Router({
  prefix: '/search'
})

const sign = 'bb9afbba667fd0deb80ea7faea3f1c5f'
// !搜索的接口
router.get('/top', async (ctx) => {
  let { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : [] }
})

router.get('/hotPlace', async (ctx) => {
  let { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city: ctx.query.city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

module.exports = router
