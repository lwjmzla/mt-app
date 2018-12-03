<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市:</dt>
      <dd class="hotCity" v-for="item in list" :key="item.id" @click="changeCity(item)">{{item.name}}</dd>
    </dl>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {

  },
  created() {
    this.$axios.get('/geo/hotCity').then((res) => {
      const {status, data} = res
      if (status === 200) {
        this.list = data.hots
      }
    })
  },
  methods: {
    changeCity (obj) {
      // const position = {
      //   province: obj.province,
      //   city: obj.name
      // }
      // this.setPosition(position)
      // !我觉得这个更改 要ajax让服务器更改，然后下次渲染数据的时候 给更改后的数据 但现在没更改城市的接口
    },
    ...mapMutations({
      setPosition: 'setPosition'
    })
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changeCity/hot.scss";
  .hotCity{
    cursor: pointer;
    &:hover{color: #41B883;}
  }
</style>
