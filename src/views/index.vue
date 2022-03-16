<template>
  <div class="index">
    <div class="bg bg-blur"></div>
    <div class="title">
      <div class="left">
        <div v-if="token">
          <span class="un"><img :src="base+avatar" alt="">{{name}}</span>
          <span class="lv">LV{{level}}</span>
        </div>
        <div v-else>
          <van-button round type="info" @click="toLogin">Login</van-button>
        </div>
        
      </div>
      <div class="right">
        <van-button round type="info" color="#f0c60d" @click="tohistory">History</van-button>
        <van-button round type="info" color="rgba(132, 138, 150)" @click="toplay">How to play</van-button>
      </div>
    </div>

    <div class="msgs">
      <div class="box">
        <ul id="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for='(item,index) in items' :key="index">
            <span class="tip">Congratulations to</span>
            <span class="name">{{item.user_name}}</span>
            <span class="tip">for getting</span>
            <img class="pic" :src="base+item.icon" alt="">
            <!-- <span class="jp">{{item.product_name}} </span> -->
            <span class="num">x{{item.product_num}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="number">
      <div class="left">
        <van-progress width="500" :percentage="draw_process?draw_process:0" stroke-width="6" track-color="#ec840d" color="#ec840d"
          pivot-color="#fff" text-color="#999" />
      </div>
      <span><em>{{remain_num?remain_num:0}}</em></span>
    </div>

    <div class="dj">

      
      <div class="right">
        <span v-for="(item,index) in shop" :key="index"><img :src="base+item.icon" alt=""></span>
      </div>

    </div>

    <div class="footer">
      <div class="btns">
        <span class="sec" @click="draw(1)"><em class="img"></em><em class="text">x1</em></span>
        <span class="sec" @click="draw(10)"><em class="img"></em><em class="text">x10</em></span>
        <span class="sec last" @click="draw(50)"><em class="img"></em><em class="text">x50</em></span>
      </div>
      <div class="btnsr" @click="drawBig"><img src="../assets/box.png" alt=""><span>progress：{{draw_process?draw_process:0}}%</span></div>
    </div>

    <div class="dialog">
      <van-dialog v-model="show" title="Awards" confirmButtonText="sure" @confirm="confirm">
        <ul>
          <li v-for="(item,index) in drawList" :key="index">
            <div class="left"><img :src="base+item.icon" alt=""></div>
            <div class="right">
              <span class="name">{{item.product_name}}</span>
              <span class="desc">
                <span class="num">num:X{{item.product_num}}</span>
                <!-- <span class="time">date:2015.11.21 </span> -->
              </span>
            </div>
          </li>
        </ul>
      </van-dialog>
    </div>

    <van-overlay :show="loading" @click="loading = true" style="padding-top:calc(100vh/2);">
      <van-loading type="spinner" color="#1989fa" size="30px"/>

    </van-overlay>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {otherDrawList,shopList,draw,drawBig} from '@/api/index'
  import { Dialog,Notify  } from 'vant';
  import store from '../store'
  export default {
    name: 'Home',
    
    data() {
      return {
        base:process.env.VUE_APP_BASE_ADDRESS,
        animate: false,
        items: [],
        shop:[],
        show: false,
        drawList:[],
        loading:false
      }
    },

    

    created() {
      setInterval(this.scroll, 2000)
    },

    computed: {
      ...mapGetters([
        'avatar',
        'name',
        'level',
        'draw_process',
        'remain_num',
        'token'
      ])
    },
    mounted() {
      this.otherDrawList();
      this.shopList();
      console.log('token',this.token);
    },
    methods: {
      scroll() {
        this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0]); // 将数组的第一个元素添加到数组的
          this.items.shift(); //删除数组的第一个元素
          this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      toplay() {
        this.$router.push({
          path: '/howplay'
        });
      },
      tohistory() {
        this.$router.push({
          path: '/history'
        });
      },
      toLogin() {
        this.$router.push({
          path: '/login'
        });
      },
      otherDrawList() {
        var params = {
          page:1,
          per_page:100
        }
        otherDrawList(params).then(res=>{
          this.items = res.data.data;
          console.log(res);
        })
      },
      shopList() {
        
        var params = {
          page:1,
          per_page:100
        }
        shopList(params).then(res=>{
          this.shop = res.data.data;
          console.log(res);
        })
      },
      draw(num) {
        if(!this.token) {
          Dialog.confirm({
            title: 'warning',
            message: 'You are not logged in, are you logged in?',
            confirmButtonText:'sure',
            cancelButtonText:'cancel'
          })
          .then(() => {        
            this.toLogin();
          })
          .catch(() => {
            // on cancel
          });

          return;
        }
        if(this.remain_num<num) {
          Notify({ type: 'warning', message: 'You do not have enough draws' });
          return;
        }
        var params = {
          draw_num:num
        }
        this.loading = true;
        draw(params).then(res=>{
          console.log(res);
          if(res.status_code==200) {
            this.drawList = res.data;
            setTimeout(() => {
              this.show = true;
              this.loading = false;
            }, 1000);
          }else{
            Notify({ type: 'warning', message: 'You do not meet the draw conditions' });
            this.loading = false;
          }
        })
      },

      drawBig() {
        if(!this.token) {
          Dialog.confirm({
            title: 'warning',
            message: 'You are not logged in, are you logged in?',
            confirmButtonText:'sure',
            cancelButtonText:'cancel'
          })
          .then(() => {        
            this.toLogin();
          })
          .catch(() => {
            // on cancel
          });

          return;
        }

        if(this.draw_process<100) {
          Notify({ type: 'warning', message: 'Your draw progress has not reached 100%' });
          return;
        }
        this.loading = true;
        drawBig().then(res=>{
          if(res.status_code==200) {
            this.drawList = [res.data];
            setTimeout(() => {
              this.show = true;
              this.loading = false;
            }, 1000);
          }else{
            Notify({ type: 'warning', message: 'You do not meet the draw conditions' });
          }
        })
      },

      confirm() {
        store.dispatch('user/getInfo');
      }
    }
  }
</script>

<style scoped lang="less">
  .index {
    box-sizing: border-box;
    padding-top: 100px;
    height: 100vh;
    overflow: auto;
    color: #fff;
    // background: url("../assets/bg.jpg") center center no-repeat;
    // background-size: 100% 100%;

    .bg {
      position:absolute;
      left:0;
      top:0;
      z-index: -1;
      background:rgb(25,25,37);
      // background: url('../assets/bg.jpg');
      height:100vh;
      text-align: center;
      line-height: 100vh;
    }
    .bg-blur {
        float: left;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        // -webkit-filter: blur(15px);
        // -moz-filter: blur(15px);
        // -o-filter: blur(15px);
        // -ms-filter: blur(15px);
        // filter: blur(15px);
    }

    .title {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      margin-bottom: 20px;
      height: 100px;
      background: rgba(21, 41, 66, 0.5);
      font-size:28px;
      .left {
        float: left;
        height: 100px;
        padding: 0 20px;
        font-size:28px;
        .lv {
          float: left;
          padding-left: 80px;
          line-height: 100px;
          margin-right: 0px;
          background: url('../assets/lv.png') 10px center no-repeat;
          background-size: 60px 60px;
          font-size: 26px;
          color: rgb(240, 198, 13);

        }

        img {
          position: absolute;
          left: -5px;
          top: -5px;
          display: inline-block;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 2px solid rgba(132, 138, 150);
        }

        .un {
          position: relative;
          float: left;
          height: 60px;
          line-height: 60px;
          padding: 0 20px 0 80px;
          margin-top: 20px;
          background: rgba(132, 138, 150);
          border-radius: 35px;
          font-size: 26px;
          color: #ec840d;
          width:65px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

        }

        .van-button {
          font-size:32px;
          margin-top:30px;
          padding:0 40px;
        }
      }

      .right {
        float: right;
        height: 100px;
        padding-right: 30px;

        .van-button {
          margin-top: 30px;
          margin-left: 30px;
          font-size:28px;
        }

        // .wf{
        //   float:right;
        //   line-height:100px;
        //   font-size:30px;
        //   color:#ececec;
        // }
      }
    }

    .msgs {
      width: 100%;
      height: 280px;
      margin-bottom: 40px;
      background: rgba(0, 0, 0, 0.5);
      font-size:24px;
      .box {
        width: 100%;
        height: 280px;
        overflow: hidden;
        // padding-left: 30px;
        // border: 1px solid black;
      }

      .anim {
        transition: all 0.5s;
        margin-top: -70px;
      }

      #con1 li {
        padding-left: 30px;
        list-style: none;
        line-height: 70px;
        height: 70px;
        text-align: center;

        span {
          float: left;

          &.tip {
            font-size: 28px;
          }
          

          &.name {
            width: 80px;
            margin: 0 20px;
            color: #f0c60d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &.num {
            width:160px;
            color: #fff;
            margin-left: 20px;
          }

          &.jp {
            width: 100px;
            color: #f0c60d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        img {
          float: left;
          width: 40px;
          height: 40px;
          margin-top:15px;
          margin-left:15px;


        }
      }
    }

    .number {
      height: 80px;
      margin-bottom: 20px;

      .left {
        position: relative;
        float: left;
        width: 100px;
        padding-top: 40px;
        padding-left: 40px;
        // height: 600px;

        .van-progress {
          width: 400px;
          // position: absolute;
          // left: -150px;
          // top: 300px;
          // transform: rotate(-90deg);
        }

      }
      span {
        position: relative;
        float: right;
        width: 100px;
        height: 100px;
        margin-right: 180px;
        background: url('../assets/num.png') center center no-repeat;
        background-size: 100%;
        text-align: center;

        em {
          position: absolute;
          left: 95px;
          top: 15px;
          display: block;
          width: 150px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          background: url('../assets/number.png') center center no-repeat;
          background-size: 100% 100%;
          font-style: normal;
          font-size: 30px;
          color: rgb(11, 12, 0);
          font-weight: 700;
        }

        // line-height:80px;
      }
    }

    .dj {
      padding: 20px 20px 200px;
      min-height: 700px;


      // background:rgba(0,0,0,0.2);
      

      .right {
        float: left;
        width: 750px;
        padding-top: 10px;

        span {
          float:left;
          width: calc(710px/4);
          height: calc(710px/4);

          img {
            display: block;
            width: 80%;
            height: 80%;
            border-radius:50%;
            margin:10% auto;
          }
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      background: rgba(0, 0, 0, 0.4);

      .btns {
        float: left;
        // width:75%;
        padding: 25px 0 0 20px;
        height: 100%;

        .sec {
          float: left;
          // width:200px;
          padding: 0 20px;
          margin-right: 20px;
          height: 75px;
          background: url('../assets/an.png') center center no-repeat;
          background-size: 100% 100%;

          &.last {
            margin-right: 0;
          }

          .img {
            float: left;
            width: 60px;
            height: 65px;
            margin-right: 20px;
            background: url('../assets/bx.png') center center no-repeat;
            background-size: 100%;
          }

          .text {
            float: left;
            // width:calc(100% - 80px);
            height: 60px;
            line-height: 75px;
            font-size: 40px;
            font-style: normal;
            color: #333;
            // background:#000;
          }
        }
      }

      .btnsr {
        float: right;
        position: relative;
        bottom: 0;
        right: 0;
        width: 20%;
        height: 120px;

        img {
          display: block;
          width: 80%;
          margin: 0 auto;
        }

        span {
          position: absolute;
          top: -60px;
          right: 0;
          width: 240px;
          height: 60px;
          line-height: 60px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 30px;
          font-size: 26px;
        }
      }
    }

    .dialog {
      .van-dialog {
        width: 90%;

        ul {
          padding: 0;
          margin: 0;
          height:60vh;
          overflow:auto;
          li {
            height: 100px;
            padding: 20px;
            margin-bottom: 20px;
            background: #ececec;

            .left {
              float: left;
              width: 100px;
              height: 100px;

              margin-right: 30px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .right {
              float: left;
              width: calc(100% - 140px);

              .name {

                display: block;
                text-align: left;
                font-size: 36px;
                margin-bottom: 20px;
                color:rgb(231, 142, 25);
              }

              .desc {
                font-size: 28px;
                color: #999;

                .num {
                  text-align: left;
                  float: left;
                }

                .time {
                  float: right;
                  text-align: right;
                }
              }
            }
          }
        }

      }

      img {
        width: 300px;
        height: 300px;
      }
    }
  }
</style>

<style>
  .van-dialog__cancel,
  .van-dialog__confirm {
    height: 12.4vw !important;
    font-size: 34px !important;
  }

  .van-dialog__header{
    line-height:10vw !important;
    font-size: 38px !important;
    color:#000;
  }
</style>