<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <list :cart-data="cart"/>
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button  type="primary"  @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
  components:{
    List
  },
  data () {
    return {
      cart: []
    }
  },
  computed:{
    total(){
      let total=0;
      this.cart.forEach(item=>{
        total+=item.price*item.count
      })
      return total
    }
  },
  methods:{
    submit () {
      this.$axios.post('/order/createOrder', {
        id: this.cartNo,
        price: this.cart[0].price,
        count: this.cart[0].count
      }).then((res) => {
        const {status, data} = res
        if (status === 200 && data.code === 0) {
          window.location.href = '/order'
        }
      })
    }
  },
  async asyncData(ctx){
    const id = ctx.query.id
    const { status, data } = await ctx.$axios.post('/cart/getCart', { id })
    if( status === 200 && data.code === 0 ) {
      return {
        cart: [{
          name: data.data.name,
          price: data.data.price,
          count: 1
        }],
        cartNo: id
      }
    }
  }

}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
