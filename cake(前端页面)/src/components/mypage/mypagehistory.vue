<template>
    <div class="my-pagehis">
        <div class="page_aside_detail ">
            <!-- style="display: none;" -->
            <div class="detail_title">
                订单管理
            </div>
            <div class="order_mod">
                <div class="order_mod_title">
                    <span class="oreder_state oreder_active">历史订单</span>

                </div>
                <div class="order_form">
                    <div class="order">
                        <div>
                            <ul class="order_ul">
                                <li class="ad_li1 ad_li11">商品名称</li>
                                <li class="ad_li2 ad_li11">尺寸/数量</li>
                                <li class="ad_li3 ad_li11">总价</li>
                                <li class="ad_li4 ad_li11">收货信息</li>
                                <li class="ad_li5 ad_li11">订单时间</li>
                            </ul>
                        </div>
                        <div>
                            <ul class="order_ul" v-for="(item,index) of mypagehistory" :key="index">
                                <li class="order_li1 ad_1 order_li">
                                    <div class="order_img">
                                        <img :src="item.image" alt="">
                                    </div>
                                    <span>{{item.produce_name}}</span>
                                </li>
                                <li class="order_li2 order_li">
                                    <div class="order_center">
                                        {{item.order_size}} / {{item.count}}
                                    </div>
                                </li>
                                <li class="order_li3 order_li">
                                    <div>￥{{item.order_price.toFixed(2)}}</div>
                                </li>
                                <li class="order_li4 order_li">
                                    <div>{{item.order_add}}</div>
                                    <div>收货人：{{item.order_name}}</div>
                                    <div>联系电话：{{item.order_phone}}</div>
                                </li>
                                <li class="order_li5 order_li">
                                    <div>下单时间：{{item.order_time}}</div>
                                </li>
                            </ul>
                        </div>


                        <!--  底部的页面跳转  -->
                        <div class="order_jump">
                            <div class="order_jumpul">
                                <my-pagging :sum="sum" @counts="counts"></my-pagging>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     import MyPagging from '../pagging';
    
    export default {
        components: {
            MyPagging
        },
        name: 'my-pagehis',
        data(){
            return{
                mypagehistory:[],
                sum:'',
                count:'',
                user_id:0
            }
        },
        methods:{
            fun(val){
                this.count=Number(val);
                this.mypagehistory=[];
                this.axios.get('/case/mypagehistory',{params:{count:this.count,user_id:this.user_id}}).then(res=>{
                    let datas=res.data.b;
                    datas.forEach(item=>{
                        item.image=require(`../../assets/image/` + item.image1);
                        this.mypagehistory.push(item);
                    })
                    this.sum=res.data.sum;
                })
            },
            counts(counts){
               this.fun(counts);
            },
        },
        mounted(){
        this.user_id=sessionStorage.getItem('$user_id');
          this.fun(1);  
        }
    }
</script>
<style>
    .my-pagehis .page_aside_detail {
        position: relative;
        width: 965px;
        height: 550px;
    }

    .my-pagehis .detail_title {
        color: #791a1e;
        font-size: 16px;
        padding-bottom: 10px;
    }

    .my-pagehis .oreder_state {
        padding-left: 10px;
        cursor: pointer;
    }

    .my-pagehis .oreder_active {
        font-weight: 700;
    }

    /* 订单管理结束 */

    /*  */

    .my-pagehis .order_mod_title {
        line-height: 40px;
        /* background-color: #f7f8f8; */
        border-bottom: 1px solid #e1e1e2;
        padding-left: 26px;
        color: #791a1e;
        font-size: 14px;
        text-align: left;
    }

    .my-pagehis .order_ul {
        display: flex;
        flex: row;
        justify-content: space-around;
    }

    .my-pagehis .order_ul li {
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #595757;
    }

    .my-pagehis .order_form {
        padding-bottom: 10px;
    }

    .my-pagehis .order_form .order_li {
        height: 150px;
    }

    .my-pagehis .ad_li11 {
        background-color: #f7f8f8;
        text-align: center;
        font-size: 14px;
        color: #666666;
    }

    .my-pagehis .ad_li1 {
        width: 27%;
        height: 40px;
    }

    .my-pagehis .ad_li2 {
        width: 10%;
        height: 40px;
    }

    .my-pagehis .ad_li3 {
        width: 10%;
        height: 40px;
    }

    .my-pagehis .ad_li4 {
        width: 23%;
        height: 40px;
    }

    .my-pagehis .ad_li5 {
        width: 30%;
        height: 40px;
    }

    .my-pagehis .order_li1 {
        width: 27%;
        height: 150px;
        position: relative;
    }

    .my-pagehis .order_li2 {
        width: 10%;
        height: 450px;
    }

    .my-pagehis .order_li3 {
        width: 10%;
        height: 150px;
    }

    .my-pagehis .order_li4 {
        width: 23%;
        height: 150px;
    }

    .my-pagehis .order_li5 {
        width: 30%;
        height: 150px;
    }

    .my-pagehis .order_img {
        position: absolute;
        width: 120px;
        height: 65px;
        top: 50%;
        height: 50%;
        transform: translate(50%, -50%);
    }

    .my-pagehis .order_li1 span {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(50%, -50%);
    }

    .my-pagehis .order_img img {
        width: 100%;
        height: 100%;
    }

    .my-pagehis .order_li2 {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center
    }

    .my-pagehis .order_li3 {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center
    }

    .my-pagehis .order_li4 {
        display: flex;
        flex-flow: column;
        justify-content: left;
        align-content: flex-start;
    }

    .my-pagehis .order_li4 div {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .my-pagehis .order_mod {
        position: relative;
        height: 580px;
        width: 100%;
        border: 1px solid #e1e1e2;
        /* position: relative; */
    }

    /* 底部的页面跳转 */

    .my-pagehis .order_jump {
        height: 40px;
        width: 100%;
        position: absolute;
        bottom: 0;
        /* background-color: lightpink; */
    }

    .my-pagehis .order_jumpul {
        position: absolute;
        bottom: 0;
        left: 30%;
        color: #595757;
        width: 50%;
        display: flex;
        flex: row;
        align-content: center;
        margin: 0 auto;
    }
</style>