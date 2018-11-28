import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state,
  mutations,
  actions: {
    setPosition ({ commit, state }, val) { // !感觉这个没卵用了
      commit('setPosition', val)
    },
    async nuxtServerInit ({ commit, state }, { req, app }) { // !参数一{dispatch,commit,getters,state} 参数二 {req,res,app}
      // !获取地理位置
      const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      const position = status === 200 ? { province, city } : { province: '', city: '' }
      commit('setPosition', position) // actions的方法都不用了。。。
      // !获取左侧菜单
      const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
      commit('setMenu', status2 === 200 ? menu : [])
      // !获取热门玩耍的地方
      const { status: status3, data: { result } } = await app.$axios.get('search/hotPlace', {
        params: {
          city: state.position.city.replace('市', '')
        }
      })
      commit('setHotPlace', status3 === 200 ? result.slice(0, 4) : [])
      // !有格调 获取全部
      const { status: status4, data: { pois } } = await app.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword: '景点',
          city: state.position.city
        }
      })
      const poisData = pois.slice(0, 6)
      const all = poisData.map((item) => {
        return {
          title: item.name,
          pos: item.type.split(';')[0],
          price: item.biz_ext.cost || '暂无',
          img: item.photos.length ? item.photos[0].url : 'http://store.is.autonavi.com/showpic/5795e1139719dba0bb3792cf0c81fb44',
          url: '//abc.com'
        }
      })
      commit('setAll', status4 === 200 ? all : [])
    }
  },
  getters
})

export default store
