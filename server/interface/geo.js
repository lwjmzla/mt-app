const Router = require('koa-router')
const axios = require('./utils/axios')
const Menu = require('../dbs/models/menu')
const Province = require('../dbs/models/province')
const City = require('../dbs/models/city')

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
// !左侧菜单栏
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
  const result = await Province.find()
  const province = result.map((item) => { // !这里其实就是改造数据传递格式
    return {
      id: item.id,
      name: item.value[0]
    }
  })
  ctx.body = {
    province
  }
  // !线上的省份信息完整一些
  // let { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  // ctx.body = {
  //   province: status === 200 ? province : []
  // }
})
// !获取省份对应的城市
router.get('/province/:id', async (ctx) => {
  let city = await City.findOne({ id: ctx.params.id })
  // console.log(city) // 首先返回整条数据的对象
  ctx.body = {
    city: city.value.map(item => {
      return { province: item.province, id: item.id, name: item.name }
    })
  }
  // !线上
  // let { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     city: []
  //   }
  // }
})
// !获取所有市
router.get('/city', async (ctx) => {
  let city = []
  let arrCityDb = await City.find()
  arrCityDb.forEach((item) => {
    city = city.concat(item.value)
  })
  city = city.map((item) => {
    return {
      province: item.province,
      id: item.id,
      name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
    }
  })
  ctx.body = {
    city
  }
  // !线上
  // let { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     city: []
  //   }
  // }
})
// !热门城市
router.get('/hotCity', async (ctx) => {
  let list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  let result = await City.find()
  let nList = []
  result.forEach(item => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  })
  let hots = nList.map((item) => {
    return {
      province: item.province,
      id: item.id,
      name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
    }
  })
  ctx.body = {
    hots
  }
  // !线上
  // let { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  // hots = hots.map((item) => {
  //   return {
  //     province: item.province,
  //     id: item.id,
  //     name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
  //   }
  // })
  // if (status === 200) {
  //   ctx.body = {
  //     hots
  //   }
  // } else {
  //   ctx.body = {
  //     hots: []
  //   }
  // }
})

module.exports = router
