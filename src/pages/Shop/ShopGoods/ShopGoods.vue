<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(item, index) in goods"
            :key="index"
            :class="{current: index===currentIndex}"
            @click="clickMemuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon" />
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUL">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(item, index) in good.foods"
                :key="index" 
                @click="showFood(item)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="item.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{item.sellCount}}份</span>
                    <span>好评率{{item.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="item"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <CartFoods></CartFoods>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
import CartControl from "../../../components/CartControl/CartControl.vue";
import Food from "../../../components/Food/Food.vue";
import CartFoods from '../../../components/ShopCart/ShopCart.vue'
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标
      tops: [], //所有右侧分类li的top组成的数组
      food:{}   //需要显示food
    };
  },
  props:{
      food:Object
  },
  computed: {
    ...mapState(["goods"]),

    //计算得到当前分类的下标
    currentIndex() {
      //得到条件数据
      const { scrollY, tops } = this;
      //根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      //返回结果
      return index;
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        //数据更新显示后执行
        this._initScrollY();
        this._initTops();
      });
    });
  },
  methods: {
    _initScrollY() {
      //在列表加载后创建
      new BScroll(".menu-wrapper", {
        click: true
      });
      this.foodScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true
      });
      //给右侧列表绑定scroll监听
      this.foodScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      //给右侧列表绑定scroll结束的监听
      this.foodScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTops() {
      /* //初始化tops
            const tops = []
            let top = 0
            //收集所有分类的li
            const lis = this.$refs.foodsUL.getElementsByClassName('food-list-hook')
            Array.prototype.slice.call(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            });
            this.tops = tops
            console.log(tops) */
      // 1. 初始化tops
      const tops = [];
      let top = 0;
      tops.push(top);
      // 2. 收集
      // 找到所有分类的li
      const lis = this.$refs.foodsUL.getElementsByClassName("food-list-hook");
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });

      // 3. 更新数据
      this.tops = tops;
      console.log(tops);
    },

    clickMemuItem(index) {
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      this.foodScroll.scrollTo(0, -scrollY, 300);
    },

    //显示点击的food
    showFood(food){
        //设置food
        this.food = food
        //显示food组件（父组件调用子组件的方法）
        this.$refs.food.toggleShow()
    }
  },
  components: {
    CartControl,
    Food,
    CartFoods
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
