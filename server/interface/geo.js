const Router = require('koa-router')
const axios = require('./utils/axios')
const Menu = require('../dbs/models/menu')
// const Province = require('../dbs/models/province')

let router = new Router({
  prefix: '/geo'
})

const sign = 'bb9afbba667fd0deb80ea7faea3f1c5f'

router.get('/getPosition', async (ctx) => {
  let { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne() // !用find()的话 就是数组  result[0]
  ctx.body = {
    menu: result.menu
  }
  // !线上接口
  // let { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     menu
  //   }
  // } else {
  //   ctx.body = {
  //     menu: []
  //   }
  // }
})

router.get('/province', async (ctx) => {
  // const result = await Province.find()
  // const province = result.map((item) => { // !这里其实就是改造数据传递格式
  //   return {
  //     id: item.id,
  //     name: item.value[0]
  //   }
  // })
  // ctx.body = {
  //   province
  // }
  // !线上的省份信息完整一些
  let { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

module.exports = router
