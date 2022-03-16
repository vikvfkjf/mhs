<template>
  <div class="howplay">
    <div class="back" @click="back"><van-icon name="arrow-left" /></div>
    <h1>How to play</h1>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script>
  import {play} from '@/api/index'
  export default {
    name: 'howplay',
    data() {
      return {
        content:null
      }
    },

    mounted() {
      this.play();
    },

    methods: {
      play() {
        play().then(res=>{
          this.content = res.data.content;
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  .howplay{
    // padding:40px;
    .back{
      position:fixed;
      left:20px;
      top:20px;
      width:60px;
      height:60px;
      background:rgba(255,255,255,0.8);
      border-radius:50%;
      text-align:center;
      line-height:60px;
    }
    h1{
      width:100%;
      height:200px;
      margin:0 0 20px;
      line-height:200px;
      color:#fff;
      font-size:40px;
      background:url('../assets/bg1.jpg') center center no-repeat;
      background-size:100%;
    }
    .content{
      padding:20px;
    }
  }
</style>