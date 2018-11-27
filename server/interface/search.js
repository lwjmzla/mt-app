const Router = require('koa-router')
const axios = require('./utils/axios')

let router = new Router({
  prefix: '/geo'
})

const sign = 'bb9afbba667fd0deb80ea7faea3f1c5f'

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

module.exports = router
