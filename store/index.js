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
    async nuxtServerInit ({ commit }, { req, app }) { // !参数一{dispatch,commit,getters,state} 参数二 {req,res,app}
      const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      const position = status === 200 ? { province, city } : { province: '', city: '' }
      commit('setPosition', position) // actions的方法都不用了。。。

      const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
      commit('setMenu', status2 === 200 ? menu : [])
    }
  },
  getters
})

export default store
