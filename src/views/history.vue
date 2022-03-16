<template>
    <div class="history">
        <div class="back" @click="back"><van-icon name="arrow-left" /></div>
        <h1>History</h1>

        <ul>
            <li v-for="(item,index) in list" :key="index">
                <div class="left"><img :src="base+item.icon" alt=""></div>
                <div class="right">
                    <span class="draw_no">no:{{item.draw_no}}</span>
                    <span class="first">
                        <span class="name">name:{{item.product_name}}</span>
                        <span class="status">status:{{item.status==1?'Prize cashed':'Not cashed'}}</span>
                    </span>
                    
                    <span class="desc">
                        <span class="num">num:X{{item.product_num}}</span>
                        <span class="time">date:{{item.updated_at | formatDate}} </span>
                    </span>
                    <span class="last">draw_type:{{item.draw_type==1?'Ordinary prize':'Super Airdrop'}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {history} from '@/api/index'
    import {formatDate} from '@/libs/time.js'
    export default {
        name: 'history',
        data() {
            return {
                base:process.env.VUE_APP_BASE_ADDRESS,
                list:[]
            }
        },

        filters: {
            formatDate(time) {
                time = time * 1000
                let date = new Date(time)
                console.log(new Date(time))
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },

        mounted() {
            this.history();
        },

        methods: {
            history() {
                history().then(res=>{
                    this.list = res.data.data;
                })
            },
            back() {
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    .history {
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
        // padding:40px;
        h1 {
            width: 100%;
            height: 200px;
            margin: 0 0 40px;
            line-height: 200px;
            color: #fff;
            font-size: 40px;
            background: url('../assets/bg1.jpg') center center no-repeat;
            background-size: 100%;
        }

        ul{
            padding:0;
            margin:0;
            li{
                height:180px;
                padding:20px;
                margin-bottom:20px;
                background:#ececec;
                .left{
                    float:left;
                    width:100px;
                    height:100px;
                    
                    margin-right:30px;
                    img{
                        display:block;
                        width:100%;
                        height:100%;
                    }
                }
                .right{
                    float:left;
                    width:calc(100% - 140px);

                    .draw_no{
                        display:block;
                        text-align:left;
                        font-size:36px;
                        margin-bottom:20px;
                    }
                    .first{
                        display:block;
                        height:40px;
                        font-size:28px;
                        color:#999;
                        line-height:40px;
                        .name{
                            float:left;
                            text-align:left;

                        }
                        .status{
                            float:right;
                            text-align:right;
                        }
                    }
                    
                    .desc{
                        display:block;
                        font-size:28px;
                        color:#999;
                        height:40px;
                        line-height:40px;
                        .num{
                            text-align:left;
                            float:left;
                        }
                        .time{
                            float:right;
                            text-align:right;
                        }
                    }

                    .last{
                        display:block;
                        text-align:left;
                        font-size:28px;
                        height:40px;
                        line-height:40px;
                        color:#999;
                    }
                }
            }
        }
    }
</style>