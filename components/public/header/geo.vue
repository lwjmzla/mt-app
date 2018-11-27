<template>
  <div class="m-geo">
    <i class="el-icon-location" />{{position.city}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['position'])
  }
}
</script>

<style lang="scss" scoped>

</style>
