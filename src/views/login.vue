<template>
  <div>
    <bm_login :base-config="myConfig" v-on:phoneLogin="to_phoneLogin" v-on:forgetPassword="to_forgetPassword"
      v-on:toProtocol="to_protocol" v-on:register="to_register" v-on:qqLogin="qq_login" v-on:weixinLogin="weixin_login"
      v-on:weiboLogin="weibo_login" @parent_rememberMe="rememberMe" @parent_login="login">
      <!-----------------------可以自定义内容放在header中(以下为示例)--------------------------->
      <template v-slot:header>
        <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center">
          <h2>Welcome To Login</h2>
        </div>
      </template>
    </bm_login>
  </div>
</template>

<script>
import { Notify } from 'vant';
  // @ is an alias to /src
  export default {
    name: 'login',
    data() {
      return {
        myConfig: {
          forgetPwd_register_protocol: false,
          //为false时，下面三项设置为true无效
          forgetPassword: true,
          register: true,
          protocol: true,
          quickLogin: false,
          otherLoginWays: false
        }
      }
    },

    methods: {
      //根据配置自行选择需要的方法
      to_phoneLogin() {
        //进入手机登录页面
        this.$router.push({
          path: '/phoneLogin'
        });
      },
      to_forgetPassword() {
        //进入忘记密码页面
      },
      to_register() {
        //进入注册页面
      },
      to_protocol() {
        //阅读协议
      },
      qq_login() {
        //qq登录
      },
      weixin_login() {
        //微信登录
      },
      weibo_login() {
        //微博登录
      },
      /**
       * 记住我功能
       * 关闭掉了客户端的cookie实现，请开发者自行与服务端通信实现该功能
       */
      rememberMe(isActive) {
        console.log("rememberMe:::", isActive); // 该功能是否开启
      },
      login(input_info) {
        //登录
        console.log(input_info); //用户输入的用户名和密码
        // let params = new URLSearchParams();
        // params.append('YourParamsName1', input_info.username);
        // params.append('YourParamsName2', input_info.password);
        // this.axios.post('xxx', params)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        var params = {
          name :input_info.username,
          password :input_info.password
        }
        this.$store.dispatch('user/login', params).then((res) => {
            console.log(res);
            if(res.status_code==200) {
              this.$router.push({ path: '/' })
            }else{
              Notify(res.err_msg);
              // this.$message({
              //   type:'error',
              //   message:res.err_msg
              // })
            }
            this.loading = false
            
          }).catch(() => {
            this.loading = false
          })

      }
    }
    }
</script>