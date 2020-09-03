<template>
    <div class="my-njf_detail">
        <headers class="headers" :detailValue='detailValue'></headers>
        <!-- <div class="top"></div> -->
        <!-- 后面显示的导航栏 -->
        <div class="toplist" id="toplist">
            <div class="top_center">
                <div v-text="alldata.produce_name" class=" top_text fl_l"></div>
                <div class="top_btn fl_r"><button @click="addcart" class="addcart shopbtn">加入购物车></button></div>
                <div class="top_sty fl_r">
                    <span v-text="'￥'+money[nowitem]" class="top_money"></span>
                    <span v-text="'('+size[nowitem]+')'" class="top_size"></span>
                </div>
            </div>
        </div>
        <!--遮罩层 -->
        <div class="bg" @click="bgshow" v-show="bgisshow">
            <div class="bgsmall"></div>
        </div>
        <!-- <div class="text">1234</div> -->
        <!-- 头部导航栏 -->
        <div class="banner">
            <!-- 提交的表+图片查看器 -->
            <div class="pro_center">
                <!-- 图片查看 -->
                <div id="pro_album" class="pro_album">
                    <div class="pro_album_pre">
                        <div class="pro_album_pic">
                            <img id="pro_big" :src="bigimg" alt="" class="pro_main_pic">
                            <!-- <iframe  v-show="videosrc" id="video" :src="videosrc" frameborder='0'
                                    allow='autoplay;encrypted-media' allowfullscreen >
                                </iframe> -->
                        </div>
                    </div>
                </div>
                <div class="pro_ul">
                    <ul id="pro_ul">
                        <li :class="{'active':isChoose}" v-for="(image, i) of image" :key="i" @mouseenter="toggleactive"
                            @mouseleave="activeleave">
                            <a href="javascript:;" style="cursor:default">
                                <img :src="image" alt="">
                                <div class="cover"></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 购物车表格 -->
            <div class="pro_shop">
                <div class="shop_bg1">
                    <div class="shop1_ban">
                        <div v-text="alldata.produce_name" class="nametext"></div>
                        <div v-text="'￥'+money[nowitem]" class="money"></div>
                        <div class="new">
                            <a v-text="alldata.produce_flavor+'>' " v-show="alldata.produce_flavor" class="new_a"
                                href="javascript:;"></a>
                            <a v-text="alldata.produce_theme+'>' " v-show="alldata.produce_theme" class="new_a"
                                href="javascript:;"></a>
                        </div>
                        <p v-text="alldata.produce_desc"></p>
                        <div style="color:#999">—— Living a better life ——</div>
                    </div>
                </div>
                <div class="shop_bg2">
                    <div class="shop2_ban1">
                        <div class="sizetext">商品规格</div>
                        <div>
                            <ul class="sizeul">
                                <!-- 商品的size -->
                                <li v-for="(item,i) of size" :key="i" @click="sizeactive(i)"
                                    :class="{size_active:i==nowitem}" :ref="'sizeitem' + i">
                                    <!-- class="size_active" -->
                                    <a v-text="size[i]" href="javascript:;"></a>
                                    <div class="size_show"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="shop2_ban2">
                        <div class="btn_banner">
                            <div class="btn_bg">
                                <button @click="addcart" class="addcart shopbtn">加入购物车></button>
                            </div>
                            <div class="btn_bg">
                                <button @click="addorder" class="shopnow shopbtn">立即购买</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cf"></div>
            </div>
            <!-- 商品详情图 -->
            <div class="pro_detail">
                <img v-for="(image, i)  of dimage" :key="i" :src="image" alt="">
            </div>
        </div>
        <div class="footer"></div>
        <footers class="footers"></footers>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //大图片的路径
                bigimg: '',
                // 现在的规格顺序
                nowitem: 0,
                //所有的价格
                money: [],
                // 所有的规格，对象
                specs: [],
                // 所有的尺寸
                size: [],
                // 所有的
                image: [],
                // 所有的详情页面图片
                dimage: [],
                // 小图的判断
                isChoose: false,
                // 接收的数据
                alldata: {},
                // 登录遮罩层的显示与否
                bgisshow: false,
                // 遮罩层定时器
                time1: '',
                //当前用户的id
                user_id: 0,
                //头部组件确定是否在当前页面
                detailValue: 10

            }
        },
        mounted() {
            this.user_id = sessionStorage.getItem('$user_id');
            let bigul = document.getElementById("pro_ul")
            // let bigul = document.getElementById("pro_ul")
            let lis = bigul.children
            // 这是滚动出现的购物车栏
            window.addEventListener('scroll', this.listscroll, true);
            //传入的参数
            // this.$route.params.id = 2
            // let id = this.$route.params.id;
            let id = this.$route.query.produce_id;
            // console.log(id)
            this.axios.get('/case/detail/?produce_id=' + id).then(res => {
                this.alldata = res.data.results;
                let data = res.data.results
                this.nowmoney = data.produce_price1
                //详情页的图片
                for (let i = 1; i < 10; i++) {
                    // console.log(i)
                    for (let key in data) {
                        //验证key的值是否为dimage

                        if ((key.toString().indexOf('dimage' + i) != -1)) {

                            // data[key]=require('../assets/cake1/' + data[key])
                            if (data[key]) {
                                // console.log(data[key])
                                data[key] = require('../assets/image/' + data[key])
                                this.dimage.push(data[key])
                            }

                            // console.log(key)
                            // console.log(data[key])
                        }
                    }
                }

                // 顶部的小图
                data = res.data.results
                for (let i = 2; i < 6; i++) {
                    for (let key in data) {
                        if ((key.toString() == ('image' + i))) {
                            if (data[key]) {
                                data[key] = require('../assets/image/' + data[key])
                                // console.log(data[key])
                                this.image.push(data[key])
                                if (data[key].indexOf('mp4') != -1) {
                                    console.log(1)

                                    console.log(data[key])
                                    this.videosrc = require('../assets/image/' + data[key])
                                    console.log(this.videosrc)
                                }

                            }
                        }
                    }
                } this.bigimg = data['image2']
                //size
                for (let i = 1; i < 4; i++) {
                    let obj = {}
                    for (let key in data) {
                        let str = key.toString()
                        if (str == ('specs' + i)) {
                            if (data[key]) {
                                this.size.push(data[key])
                                obj.size = data[key]
                            }
                        }
                        if (str == ('produce_price' + i)) {
                            if (data[key]) {
                                this.money.push(data[key].toFixed(2))
                                obj.money = data[key].toFixed(2)
                            }
                        }
                    }
                    this.specs.push(obj)
                }
                //aixos结束
            });
        },
        methods: {
            // 点击英寸改变价格
            sizeactive: function (id) {
                this.nowitem = id
                // console.log(`'id='${id}`)
                // this.$refs[`sizeitem ${id}`].class='size_active'
            },
            // 下拉的导航栏
            listscroll: function () {
                let topScroll = document.documentElement.scrollTop || document.body.scrollTop;
                let toplist = document.getElementById("toplist");
                //下拉大于0 给li加a元素变导航栏
                if (toplist) {
                    if (topScroll >= 950) {
                        toplist.classList.add('act')
                    } else {
                        toplist.classList.remove('act')
                    }
                }
            },
            // 改变图片
            toggleactive: function (e) {
                this.isChoose = !this.isChoose
                let image = e.target.children[0].children[0].src
                this.bigimg = image
            },

            activeleave: function () {
                this.isChoose = !this.isChoose
            },
            darkmask(out) {
                let zi = document.getElementsByClassName(' bgsmall')[0]
                zi.innerHTML = out
                this.bgisshow = true
                this.time1 = setTimeout(() => {
                    this.bgisshow = false
                }, 3000);
                return
            },
            // 加入购物车
            addcart: function () {
                let order_time = new Date().toLocaleDateString();
                let produce_id = this.$route.query.produce_id;
                // console.log(this.user_id)
                if (this.user_id == null) {
                    this.darkmask('请登录后再操作')
                } else {
                    // 加入购物车
                    this.axios.post('/case/addtocart', `user_id=${this.user_id}&product_id=${produce_id}&count=${1}&specs=${this.size[this.nowitem]}&produce_name=${this.alldata.produce_name}&produce_price=${this.money[this.nowitem]}&image1=${this.alldata.image1}`).then(res => {
                        console.log(res)
                        if (res.data.code == 1) {
                            this.darkmask('已添加到购物车');
                            this.$router.push('/cart');
                        } else {
                            this.darkmask('添加到购物车失败')
                        }
                    })

                }
            },
            addorder() {
                let produce_id = this.$route.query.produce_id;
                let order_time = new Date().toLocaleDateString();
                console.log(order_time)
                console.log(this.user_id)
                if (this.user_id == null) {
                    this.darkmask('请登录后再操作')
                } else {
                    this.axios.get('/case/selectUserAdd', { params: { user_id: this.user_id } }).then(res => {
                        if (res.data > 0) {
                            console.log(1);
                            this.axios.post('/case/addord', `user_id=${this.user_id}&product_id=${produce_id}&order_state=${0}&order_price=${this.money[this.nowitem]}&count=${1}&order_size=${this.size[this.nowitem]}&produce_name=${this.alldata.produce_name}&order_time=${order_time}&image1=${this.alldata.image1}&produce_card=${'生日快乐'}`).then(res => {
                                console.log(res)
                                if (res.data.code == 1) {
                                    this.darkmask('已添加到订单')
                                } else {
                                    this.darkmask('添加到订单失败')
                                }
                            })

                        } else {
                            alert('系统检测到您当前还没有填写收货地址，请前往个人中心填写');
                            this.$router.push('/identity');
                        }
                    });
                    // 加入购物车


                }
            },



            // 点击取消遮罩层
            bgshow: function () {
                clearTimeout(this.time1)
                // if(this.user_id==null){
                this.bgisshow = !this.bgisshow;
                // }
            }
        },
        watch: {
        }
    }
</script>
<style>
    /* 假如有页头 */
    .my-njf_detail .top {
        height: 100px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 1000;
    }

    .my-njf_detail .banner {
        width: 1200px;
        position: relative;
        margin: 121px auto;
    }

    /* 遮罩层 */
    .my-njf_detail .bg {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        background-color: rgba(0, 0, 0, .5);
        transition: all .3 linear
    }

    .my-njf_detail .bg .bgsmall {
        width: 180px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, .8);
        color: #fff;
        border-radius: 6%;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 101;
    }

    /* 遮罩层结束 */
    /* 两张图片 */
    .my-njf_detail .pro_center {
        position: relative;
        width: 1200px;
        height: 580px;
        top: 0;
    }

    .my-njf_detail .pro_album {
        position: relative;
        top: 0;
        left: 0;
    }

    #video {
        width: 1058px;
        height: 580px;
    }

    .my-njf_detail .pro_album_pic {
        width: 1058px;
        height: 580px;
    }

    .my-njf_detail .pro_album_pic img {
        width: 100%;
        height: 100%;
    }

    /* ul */
    .my-njf_detail .pro_ul {

        /* width: 120px; */
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column-reverse;
    }

    .my-njf_detail .pro_ul li {
        position: relative;
        max-width: 120px;
        max-height: 65px;
        padding: 0;
        margin: 0;
    }

    .my-njf_detail .pro_ul li+li {
        margin-top: 10px;
    }

    .my-njf_detail .pro_ul li img {
        width: 123px;
        height: 65px;
    }

    .my-njf_detail .pro_ul li .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border: 1px solid #791A1E;
    }

    .my-njf_detail .pro_ul li.active .cover:hover {
        opacity: 1;
    }

    .my-njf_detail .pro_shop {
        position: relative;
        top: 0px;
        height: 200px;
        width: 100%;
        z-index: 10;
    }

    .my-njf_detail .shop_bg1,
    .shop_bg2 {
        float: left;
    }

    /* 左边 */
    .my-njf_detail .shop_bg1 {
        width: 600px;
        height: 180px;
        position: relative;
        padding-top: 20px;
    }

    .my-njf_detail .shop_bg2 {
        width: 600px;
        height: 180px;
        padding-top: 20px;
        position: relative;
    }

    .my-njf_detail .cf {
        clear: both;
    }

    .my-njf_detail .shop1_ban {
        text-align: left;
    }

    .my-njf_detail .nametext {
        font-size: 24px;
        color: #791a1e;
        font-weight: normal;
        line-height: 1;
    }

    .my-njf_detail .money {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 24px;
        line-height: 1;
        color: red;
    }

    .my-njf_detail .new_a {
        display: inline-block;
        min-width: 56px;
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        text-align: center;
        border: 1px solid #bc9d9d;
        color: #bc9d9d;
        border-radius: 10px;
        margin-top: 48px;
        margin-right: 18px;
        text-decoration: none;
    }

    .my-njf_detail .shop1_ban p {
        margin-top: 20px;
        color: #791a1e;
        margin-bottom: 20px;
        font-size: 14px;
    }

    /* 右上 */
    .my-njf_detail .shop2_ban1 {
        position: absolute;
        height: 100px;
        width: 100%;
        top: 0;
        box-sizing: border-box;
        padding-top: 5px;
        padding-left: 24px;
    }

    .my-njf_detail .shop2_ban1 .sizetext {
        height: 24px;
        font-size: 14px;
        border: 0;
        width: auto;
        line-height: 24px;
        color: #791a1e;
        text-align: left;
    }

    /* .my-njf_detail .shop2_ban1 .sizetext .sizeul li:first-child{

    } */
    .my-njf_detail .shop2_ban1 ul {
        width: 100%;
        height: 56px;
        list-style: none;
        padding: 0;
        margin-top: 10px;
    }

    .my-njf_detail .shop2_ban1 li {
        height: 50px;
        width: 80px;
        float: left;
        color: #791a1e;
        position: relative;
        text-align: center;
        cursor: pointer;
    }

    .my-njf_detail .shop2_ban1 li .size_show {
        position: absolute;
        ;
        width: 80px;
        height: 50px;
        top: 0;
        border: 1px solid #791a1e;
        opacity: 0;
    }

    .my-njf_detail .shop2_ban1 li.size_active .size_show {
        opacity: 1;
    }

    .my-njf_detail .shop2_ban1 li+li {
        margin-left: 10px;
    }

    .my-njf_detail .shop2_ban1 li a {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #791a1e;
        font-size: 14px;
        text-decoration: none;
    }

    .my-njf_detail .shop2_ban2 {
        position: absolute;
        border-top: 1px solid rgb(212, 212, 212);
        height: 100px;
        width: 100%;
        bottom: 0;
        background-color: #fff;
    }

    /* 右下 */
    .my-njf_detail .btn_banner {
        position: relative;
        margin: auto auto;
        height: 100px;
        width: 100%;
        padding-top: 30px;
        padding-left: 24px;
        box-sizing: border-box;
        line-height: 100%;
    }

    .my-njf_detail .btn_bg {
        float: left;
    }

    .my-njf_detail .shopbtn {
        outline: none;
        cursor: pointer;
        width: 210px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        font-size: 18px;
        margin: 0 20px;
        border: 1px solid #791a1e;
        color: #791a1e;
        transition: all .3s linear;
    }

    .my-njf_detail .shopbtn:hover {
        border: 1px solid rgba(0, 0, 0, 0);
        color: #fff;
        background-color: #791a1e;
    }

    /* 详情图 */
    .my-njf_detail .pro_detail {
        position: relative;
        top: 0px;
    }

    /* 下拉的购物车 */
    .my-njf_detail .toplist {
        position: fixed;
        /* 101-74 */
        height: 74px;
        top: 27px;
        width: 100%;
        background-color: #fff;
        z-index: 1000;
        transition: top .3s linear;
    }

    .my-njf_detail .act {
        top: 101px;
        box-shadow: 5px 5px 12px rgba(0, 0, 0, .1);
    }

    .my-njf_detail .top_center {
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;
        line-height: 74px;
    }

    .my-njf_detail .top_text {
        font-size: 24px;
        color: #791a1e;
        font-weight: normal;
        line-height: 74px;
    }

    .my-njf_detail .top_size {
        color: #791a1e;
        font-size: 14px;
    }

    .my-njf_detail .top_money {
        font-size: 24px;
        color: red;
    }

    .my-njf_detail .fl_l {
        float: left;
    }

    .my-njf_detail .fl_r {
        float: right;
    }
</style>