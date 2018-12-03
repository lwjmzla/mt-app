<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap  v-if="point.length" :width="230" :height="290" :point="point"/>
      <!-- 只返回了第一个item的坐标 -->
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[]
    }
  },
  async asyncData(ctx){
    // !http://localhost:3000/products?keyword=碧水湾温泉
    // !一般客户端 获取数据的话,会先获取location.href 来获取param 即keyword，然后发起ajax获取数据
    let keyword = ctx.query.keyword // !而asyncData 是服务端运行的  get方式通过 ctx.query来获取param keyword
    let city = ctx.store.state.position.city
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city
      }
    })
    if(status===200&&count>0&&status2===200){
      return {
        list: pois.filter(item=>item.photos.length).map(item=>{ // !先过滤没图的
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',') // !find 只返回第一个值，最终得到的是 一个数组 保存 2个item 一个是x 一个是y
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
