// export function selectPlay ({commit, state}, {list, index}) {
//   commit(types.SET_ADDRESS, list)
// }
const actions = {
  setPosition ({ commit, state }, val) {
    commit('setPosition', val)
  }
}

export default actions
