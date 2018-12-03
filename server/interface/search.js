const Router = require('koa-router')
const axios = require('./utils/axios')
// const Poi = require('../dbs/models/poi')

let router = new Router({
  prefix: '/search'
})

const sign = 'bb9afbba667fd0deb80ea7faea3f1c5f'
// !搜索的接口
router.get('/top', async (ctx) => {
  // try {
  //   let top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: '三亚'
  //   })
  //   // console.log(top) // 完整的2条数据的数组
  //   ctx.body = {
  //     code: 0,
  //     top: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }
  // !线上
  let { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  // !线上
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

router.get('/resultsByKeywords', async (ctx) => {
  let { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city: ctx.query.city,
      keyword: ctx.query.keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

module.exports = router
