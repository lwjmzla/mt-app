<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iselect></iselect>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot></hot>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category></category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iselect from '@/components/changeCity/iselect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Category from '@/components/changeCity/category.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    iselect,
    Hot,
    Category
  }
}
</script>

<style lang='scss' scoped>

</style>
