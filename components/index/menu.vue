<template>
  <div class="m-menu" @mouseleave="mouseleave">
    <dl class="nav" >
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="mouseenter(item.type)">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-show="kind">
      <template v-for="(item,index) in curdetail">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(subItem) in item.child" :key="subItem">{{subItem}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '', // 类型
      menu:[{
        type:'food',
        name:'美食',
        child:[{
          title:'美食',
          child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
        }]
      },{
        type:'takeout',
        name:'外卖',
        child:[{
          title:'外卖',
          child:['美团外卖']
        },{
          title:'外卖1',
          child:['美团外卖1']
        }]
      },{
        type:'hotel',
        name:'酒店',
        child:[{
          title:'酒店星级',
          child:['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail () {
      const kindDetail = this.menu.filter((item) => {
        return item.type === this.kind
      })
      if (kindDetail.length) {
        return kindDetail[0].child
      } else {
        return []
      }
    }
  },
  components: {
  },
  methods: {
    mouseleave () {
      setTimeout(() => {
        this.kind = ''
      }, 100);
    },
    mouseenter (kind) {
      this.kind = kind
    }
  }
}
</script>

<style lang='scss' scoped>
  .detail{
    h4{
      font-size: 16px;
      font-weight: 500;
      color: #222;
    }
  }
</style>
