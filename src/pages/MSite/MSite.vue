<template>
    <div  class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
                <router-link class="header_search" slot="left" to="/search">
                   <i class="iconfont  icon-sousuo"></i>
                </router-link>
                <router-link  class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
                   <span  class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                   <span  class="header_login_text" v-else>
                        <i class="iconfont icon-geren"></i>
                   </span>
                </router-link>
        </HeaderTop>
<!--首页导航-->
<nav class="msite_nav  border-1px">
  <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
              <a  href="javascript:"  class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">	
          	        <img :src="baseImageUrl+category.image_url">	
                  </div>
                  <span>{{ category.title }}</span>
               </a>
           </div>  
          </div>
          <!--  Add  Pagination  -->
          <div class="swiper-pagination"></div>
  </div>
       <img src="./images/msite_back.svg" alt="back" v-else>
</nav>
<!--首页附近商家-->
<div  class="msite_shop_list  border-1px">
<div  class="shop_header">
        <i  class="iconfont  icon-xuanxiang"></i>
        <span  class="shop_header_title">附近商家</span>
</div>
<ShopList></ShopList>
</div>

</div>

</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
        data(){
                return{
                        baseImageUrl:'https://fuss10.elemecdn.com'
                }
        },
        mounted(){
                this.$store.dispatch('getCategorys')
                this.$store.dispatch('getShops')
        },
        computed:{
        ...mapState(['address','categorys','userInfo']),
        /* 
        根据categorys一维数组生成一个二维数组
        小数组中的元素个数最大为8
        */
       categorysArr(){
               const {categorys} = this
               //准备空的 二维数组
               const arr = []
               let minArr = []
               //遍历categorys
               categorys.forEach(c => {
                       
                       if(minArr.length === 8){ //如果minArr数组长度到了8 新创建一个minArr数组
                           minArr = []
                       }

                        // 如果minArr 为空， 将小数组保存到大数组里面
                       if(minArr.length === 0){
                           arr.push(minArr)
                       }
                       minArr.push(c)
               });
               return arr
       }
    },
    watch:{
            //数据更新后立即创建轮播效果
            categorys (value){
                    //使用setTimeout要指定时间加载轮播数据，不推荐使用
                /* setTimeout(() =>{
                         // 实现轮播
                new Swiper('.swiper-container',{
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                },
                })
                },100)*/

                this.$nextTick(() =>{
                     // 实现轮播
                new Swiper('.swiper-container',{
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                        el: '.swiper-pagination',
                        },
                })
            })
            }   
    },
        components: {
                HeaderTop,
                ShopList
        }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
    &.msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            
</style>