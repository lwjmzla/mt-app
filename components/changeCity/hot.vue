<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市:</dt>
      <dd v-for="item in list" :key="item.id">{{item.name}}</dd>
    </dl>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changeCity/hot.scss";
</style>
