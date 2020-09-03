<template>
    <div class="my-pageorder">
        <div class="page_aside_detail ">
            <!-- style="display: none;" -->
            <div class="detail_title">
                订单管理
            </div>
            <div class="order_mod">
                <div class="order_mod_title">
                    <span :class="{'oreder_active':this.state==0,'oreder_state':'oreder_state'}"
                        @click="fun(1,0)">已付款</span>
                    <span :class="{'oreder_active':this.state==1,'oreder_state':'oreder_state'}"
                        @click="fun(1,1)">已发货</span>
                    <span :class="{'oreder_active':this.state==2,'oreder_state':'oreder_state'}"
                        @click="fun(1,2)">已收货</span>
                    <span :class="{'oreder_active':this.state==3,'oreder_state':'oreder_state'}"
                        @click="fun(1,3)">已完成</span>
                </div>
                <div class="order_form">
                    <div class="order">
                        <div>
                            <ul class="order_ul">
                                <li class="ad_li1 ad_li11">商品名称</li>
                                <li class="ad_li2 ad_li11">数量</li>
                                <li class="ad_li3 ad_li11">总价</li>
                                <li class="ad_li4 ad_li11">收货信息</li>
                                <li class="ad_li5 ad_li11">订单信息</li>
                            </ul>
                        </div>
                        <div>
                            <ul v-if="isshow" class="order_ul" v-for="(item,i) of mypageorder" :key="i">
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
                                    <div>收货地址:{{item.order_add}}</div>
                                    <div>收货人：{{item.order_name}}</div>
                                    <div>联系电话：{{item.order_phone}}</div>
                                </li>
                                <li class="order_li5 order_li">
                                    <div>下单时间:{{item.order_time}}</div>
                                    <div>订单状态：{{statecn[item.order_state]}}</div>
                                    <div v-show="state==1" class="sure" @click="certain($event,item.order_id)">确认收货
                                    </div>
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
        name: 'my-pageorder',
        components: {
            MyPagging
        },
        data() {
            return {
                isshow: true,
                statecn: ['已付款', '已发货', '已收货', '已完成'],
                mypageorder: [],
                sum: '',
                count: '',
                state: 0,
                user_id: sessionStorage.getItem('$user_id')
            }
        }, methods: {
            fun(val, state1) {
                this.user_id = sessionStorage.getItem('$user_id')
                this.state = state1
                this.count = Number(val);
                this.mypageorder = [];
                this.axios.get('/case/mypageord', { params: { count: this.count, state: this.state, user_id: this.user_id } }).then(res => {
                    let datas = res.data.b;
                    datas.forEach(item => {
                        item.image = require(`../../assets/image/` + item.image1);
                        this.mypageorder.push(item);
                        // console.log(item)
                    })
                    this.sum = res.data.sum;
                })

            },
            counts(counts) {
                this.fun(counts, this.state);
            },
            certain($event, state) {
                this.axios.post('/case/statecer', 'order_id=' + state + '&user_id=' + this.user_id).then(res => {
                    //     console.log(1)
                    //   console.log(res)
                    this.$emit('famod');
                })
            }
        },
        mounted() {
            this.fun(1, 0);
        }
    }

</script>
<style>
    .my-pageorder .page_aside_detail {
        position: relative;
        width: 965px;
        height: 550px;
    }

    .my-pageorder .detail_title {
        color: #791a1e;
        font-size: 16px;
        padding-bottom: 10px;
    }

    .my-pageorder .oreder_state {
        padding-left: 10px;
        cursor: pointer;
    }

    .my-pageorder .oreder_active {
        font-weight: 700;
    }

    .my-pageorder .order_mod_title {
        line-height: 40px;
        text-align: left;
        /* background-color: #f7f8f8; */
        border-bottom: 1px solid #e1e1e2;
        padding-left: 26px;
        color: #791a1e;
        font-size: 14px;
    }

    .my-pageorder .order_ul {
        display: flex;
        flex: row;
        justify-content: space-around;
    }

    .my-pageorder .ad_li11 {
        background-color: #f7f8f8;
        text-align: center;
        font-size: 14px;
        color: #666666;
    }

    .my-pageorder .ad_li1 {
        width: 27%;
        height: 40px;
    }

    .my-pageorder .ad_li2 {
        width: 10%;
        height: 40px;
    }

    .my-pageorder .ad_li3 {
        width: 10%;
        height: 40px;
    }

    .my-pageorder .ad_li4 {
        width: 23%;
        height: 40px;
    }

    .my-pageorder .ad_li5 {
        width: 30%;
        height: 40px;
    }

    .my-pageorder .order_ul li {
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #595757;
    }


    .my-pageorder .order_form {
        padding-bottom: 10px;
    }

    .my-pageorder .order_form .order_li {
        height: 150px;
    }

    .my-pageorder .order_li1 {
        width: 27%;
        height: 150px;
        position: relative;
    }

    .my-pageorder .order_li2 {
        width: 10%;
        height: 450px;
    }

    .my-pageorder .order_li3 {
        width: 10%;
        height: 150px;
    }

    .my-pageorder .order_li4 {
        padding-left: 20px;
        width: 23%;
        height: 150px;
    }

    .my-pageorder .order_li5 {

        width: 30%;
        height: 150px;
    }

    .my-pageorder .order_img {
        position: absolute;
        width: 120px;
        height: 65px;
        top: 50%;
        height: 50%;
        transform: translate(50%, -50%);
    }

    .my-pageorder .order_li1 span {
        display: block;
        width: 70px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(50%, -50%);
    }

    .my-pageorder .order_img img {
        width: 100%;
        height: 100%;
    }

    .my-pageorder .order_li2 {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center
    }

    .my-pageorder .order_li3 {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center;
        text-align: left;

    }

    .my-pageorder .order_li4 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        flex-flow: column;
        justify-content: left;
        align-content: flex-start;

    }

    .my-pageorder .order_li4 div {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .my-pageorder .order_mod {
        position: relative;
        height: 580px;
        width: 100%;
        border: 1px solid #e1e1e2;
        /* position: relative; */
    }

    /* 底部的页面跳转 */
    .my-pageorder .order_jump {
        height: 40px;
        width: 100%;
        position: absolute;
        bottom: 0;
        /* background-color: lightpink; */
    }

    .my-pageorder .order_jumpul {
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

    .my-pageorder .order_jumpul button {
        outline: 0;
        cursor: pointer;
    }

    .my-pageorder .order_jumpul button:active {
        background-color: #bdbaba;
    }

    .my-pageorder .order_jumpul button+button {
        margin-left: 10px;
    }

    /* {background-color: #FF787E;} */
    .my-pageorder .odrer_li {
        width: 28px;
        height: 28px;
        background-color: #fff;
        border: 1px solid #595757;
        text-align: center;
        border-radius: 1px;
        align-items: center;
        line-height: 28px;
    }

    .my-pageorder .odrer_li1 {
        width: 60px;
        height: 28px;
        border: 1px solid #595757;
        border-radius: 1px;
        line-height: 28px;
        text-align: center;
    }

    .my-pageorder .sure {
        width: 80px;
        height: 30px;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
        background-color: orange;
        line-height: 30px;
        color: #FFF;
    }
</style>