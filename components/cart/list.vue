<template>
  <el-table :data="cartData" style="width: 980px;">
    <el-table-column prop="name" label="项目" width="532"></el-table-column>
    <el-table-column prop="price" label="单价" width="132"></el-table-column>
    <el-table-column label="数量" width="212">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0" ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div>{{scope.row.price * scope.row.count}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// !数量和总价 2列 没了prop的值，意思就是可以双向绑定，改变源数据 cartData
export default {
  props: {
    cartData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  components: {

  }
}
</script>

<style lang='scss'>

</style>
