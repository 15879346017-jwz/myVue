<template>
<div>
    <headers :headerIndex="headerIndex"></headers>
        <main>       
            <div v-if="cart.length!=0">
                <div class="cart_back">
                    <!--<a href="javascript:;">&lt;继续购物</a>-->
                    <router-link to="/classify">&lt;继续购物</router-link>
                </div>
                <!-- 购物车头部开始 -->
                <div class="cart_header">
                    <ul>
                        <li class="product">商品</li>
                        <li class="birth">生日牌</li>
                        <li class="price">单价</li>
                        <li class="count">数量</li>
                        <li class="amount">金额</li>
                    </ul>
                </div>
                <!-- 购物车头部结束 -->
                <!-- 购物车内容开始 -->
                <div class="cart_contain" @click="del">
                    <div class="cart_product" v-for="(item,index) of cart" :key="index">
                        <div class="p_product">
                            <div class="p_pic">
                                <a href="javascript:;">
                                    <img :src="item.image" alt="">
                                </a>
                            </div>
                            <div class="p_info">
                                <a href="javascript:;">{{item.produce_name}}</a>
                                <i></i><br>
                                <span>尺寸：{{item.specs}}</span>
                            </div>
                        </div>
                        <div class="p_select">
                            <div class="p_bir" @click="sel">
                                选择生日牌
                                <i></i>
                            </div>
                            <ul v-show="isSel">
                                <li @click="Selval" v-for="(item,i) of cartSelect" :key="i">{{item}}</li>
                                <li @click="dy" v-if="zdy">自定义</li>
                                <li v-else>
                                    <input type="text" placeholder="可输入6个汉字或12个字符" class="dy">
                                    <input type="button" @click="qdSel" value="确定" class="qd">
                                </li>
                            </ul>
                        </div>
                        <div class="p_price">￥{{item.produce_price.toFixed(2)}}</div>
                        <div class="p_count">
                            <a href="javascript:;" class="btn_dec" @click="change(-1,index,$event)">-</a>
                            <input type="text" disabled :value="item.count" >
                            <a href="javascript:;" class="btn_inc" @click="change(+1,index,$event)">+</a>
                        </div>
                        <div class="p_amount">￥{{(item.produce_price*item.count).toFixed(2)}}</div>
                        <div class="p_del">
                            <a href="javascript:;">x</a>
                        </div>
                        <div class="ts" v-show="tsShow">
                            <div class="tsk">
                                <span>此商品的最小购买数量为1件</span>
                            </div>
                            <div class="tszzc">
                                <span>◇</span>
                                <span>◆</span>
                            </div>
                        </div>
                        <div class="xw" v-show="xwShow">
                            <div class="xwk">
                                <span>确定将商品从购物车中移除吗？</span>
                                <button @click="qd($event,item.cart_id)" :data-i="index" class="qd">确定</button>
                                <button @click="qx($event)" class="qx">取消</button>
                            </div>
                            <div class="xwzzc">
                                <span>◇</span>
                                <span>◆</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 购物车内容结束 -->
                <!-- 购物车尾部开始 -->
                <div class="cart_foot">
                    <div class="p_zj">
                        <div class="qbqk" @click="qbqk">
                            <i></i>
                            全部清空
                        </div>
                        <div class="order">
                            <ul>
                                <li class="goods">商品金额： <span>￥{{total.toFixed(2)}}</span></li>
                                <li class="discount">活动优惠： <span>￥{{discount.toFixed(2)}}</span></li>
                                <li class="total">合计： <span>￥{{(total+discount).toFixed(2)}}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="p_js">
                        <button @click="buy">下单结算</button> 
                    </div>
                </div>
                <!-- 购物车尾部结束 -->
                <!-- 全部清空询问框开始 -->
                <div class="mask" v-show="maskShow"></div>
                <div class="alert" v-show="alertShow">
                    <div class="alert_xw">确定清空购物车吗？</div>
                    <div class="alert_sel">
                        <span class="alert_qd" @click="alertqd">确定</span>
                        <span class="alert_qx" @click="alertqx">取消</span>
                    </div>
                </div>
                <!-- 全部清空询问框结束 -->
                <!-- buy询问框开始 -->
                <div class="alert" v-show="buyShow">
                    <div class="alert_xw buy_xw">
                        <div class="buyask">请确定订单地址</div>
                        <input type="text" :value="add">
                    </div>
                    <div class="alert_sel">
                        <span class="alert_qd" @click="buyqd">确定</span>
                        <span class="alert_qx" @click="buyqx">取消</span>
                    </div>
                </div>
                <!-- buy询问框结束 -->
            </div>
            <div v-else>
                <div class="cart_empty">
                    <div class="icon"></div>
                    <div>
                        <p>您还没有选购商品</p>
                        <!--<a href="">去购物 ></a>-->
                        <router-link to="/classify">去购物 ></router-link>
                    </div>
                </div>
            </div>      
        </main>
    <footers></footers>
</div>
</template>
<script>
export default {
    data(){
        return{
            //购物车商品
            cart:[],
            //生日牌信息
            cartSelect:["生日快乐","节日快乐","Happy Birthday","纪念日快乐","端午节快乐"],
            //活动优惠
            discount:0,
            //最小购买数量为1提示
            tsShow:false,
            //移除商品询问框
            xwShow:false,
            //生日牌自定义
            zdy:true,
            //生日牌信息框
            isSel:false,
            //购物车是否有商品
            // havecart:true,
            //屏幕遮罩层
            maskShow:false,
            //清空购物车询问框
            alertShow:false,
            // 购买询问框
            buyShow:false,
            //默认地址
            add:'',
            //用户id
            user_id:1,
            produce_id:0,
            headerIndex:5
        }
    },
    mounted(){
        //获取路由传参
        this.produce_id=this.$route.query.produce_id;
        //获取用户id
        this.user_id=sessionStorage.getItem('$user_id');
        this.axios.get('/case/cart',{params:{user_id:this.user_id}}).then(res=>{
            let data=res.data.results;
            // console.log(data);
            this.cart=[];
            data.forEach(item=>{
                if(data.length!=0){
                    item.image=require('../assets/image/'+item.image1);
                    this.add=data[0].add_add1;
                }
                this.cart.push(item);
            })
        });
        this.axios.get('/case/selectUserAdd',{params:{user_id:this.user_id}}).then(res=>{
            if(res.data>0){
                console.log(1);
            }else{
                alert('系统检测到您当前还没有填写收货地址，请前往个人中心填写');
                this.$router.push('/identity');
            }
        });
    },
    methods:{
        //商品数量
        change(n,index,e){
            this.cart[index].count+=n;
            let tsSh=e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
            if(this.cart[index].count==0){
                tsSh.style.display="block";
                this.cart[index].count=1;
                setTimeout(()=>{
                    tsSh.style.display="none";
                },2000)
            }
            console.log(this.cart[index].cart_id,this.cart[index].count);
            this.axios.get('/case/changeCartCount',{params:{cart_id:this.cart[index].cart_id,count:this.cart[index].count}}).then(res=>{
                this.$router.go(0);
            })
        },
        //删除
        del(e){
          if(e.target.nodeName=="A"&&e.target.innerHTML=="x"){
              let xwSh=e.target.parentNode.nextElementSibling.nextElementSibling;
              xwSh.style.display="block";
          }
        },
        //删除取消
        qx(e){
            if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="取消"){
              let xwSh=e.target.parentNode.parentNode;
              xwSh.style.display="none";
            }
        },
        //删除确定
        qd(e,id){
            if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="确定"){
                let xwSh=e.target.parentNode.parentNode;
                xwSh.style.display="none";
                console.log(id);
                this.axios.get('/case/deleteCart',{params:{cart_id:id}}).then(res=>{
                    this.$router.go(0);
                });
            }
        },
        //生日牌自定义
        dy(){
            this.zdy=false
        },
        //生日牌信息选择框
        sel(e){
            let Sel=e.target.nextElementSibling || e.target.parentNode.nextElementSibling;
            if(Sel.style.display=="none"){
                Sel.style.display="block";
                this.zdy=true;
            }else{
                Sel.style.display="none";
            }
        },
        //生日牌信息值选择
        Selval(e){
            let Selbir=e.target.parentNode.previousElementSibling;
            Selbir.innerHTML=e.target.innerHTML + `<i data-v-c028c34c=""></i>`;
            let isSel=e.target.parentNode;
            isSel.style.display="none";
        },
        //生日牌自定义信息确定
        qdSel(e){
            let qdSel=e.target.previousElementSibling.value;
            let Selbir=e.target.parentNode.parentNode.previousElementSibling;
            let isSel=e.target.parentNode.parentNode;
            Selbir.innerHTML=qdSel + `<i data-v-c028c34c=""></i>`;
            isSel.style.display="none";
        },
        //全部清空询问框
        qbqk(){
            this.maskShow=true;
            this.alertShow=true;
        },
        //清空购物车询问框确定
        alertqd(){
            this.cart=[];
            this.maskShow=false;
            this.alertShow=false;
            this.axios.get('/case/cart1?user_id='+this.user_id).then(res=>{
                // console.log(res);
                this.$router.go(0)
            });
        },
        //清空购物车询问框取消
        alertqx(){
            this.maskShow=false;
            this.alertShow=false;
        },
        // 下单询问框
        buy(){
            this.maskShow=true;
            this.buyShow=true;
        },
        // 下单询问框确定
        buyqd(e){
            this.maskShow=false;
            this.buyShow=false;
            let address=e.target.parentNode.previousElementSibling.lastElementChild.value;
            this.add=address;
            let order_time=new Date().toLocaleDateString();
            // this.$router.push('/mypagehistory');
            for(var key in this.cart){
                let produce_card=e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[key].children[1].children[0];
                this.axios.post('/case/cart',`user_id=${this.user_id}&product_id=${this.cart[key].product_id}&order_name=${this.cart[key].add_name}&order_phone=${this.cart[key].add_phone}&order_add=${this.add}&produce_name=${this.cart[key].produce_name}&count=${this.cart[key].count}&order_size=${this.cart[key].specs}&order_price=${this.cart[key].produce_price*this.cart[key].count}&image1=${this.cart[key].image1}&order_time=${order_time}&produce_card=${produce_card.textContent}`).then(result=>{
                
                });
            }
            this.axios.get('/case/cart1?user_id='+this.user_id).then(res=>{
                this.$router.push('/identity');
            });
            this.cart=[];
        },
        //下单询问框取消
        buyqx(){
            this.maskShow=false;
            this.buyShow=false;
        },
    },
    computed:{
        //商品总价
        total(){
            var total=0;
            for(var item of this.cart){
                total+=item.produce_price*item.count;
            }
            return total;
        }
    }
}
</script>
<style scoped>
/* 购物车头部开始 */
main{
    width: 80%;
    margin: 150px auto 50px auto;
    text-align: left;
}
.cart_back{
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
}
a{
    text-decoration: none;
}
.cart_back a{
    color: #791a1e;
    font-size: 12px;
}
.cart_header{
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #f7f8f8;
    border: 1px solid #d0d0d0;
}
.cart_header ul{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    overflow: hidden;
}
.cart_header li{
    font-size: 16px;
    font-weight: normal;
    color: #791a1e;
    display: block;
}
.cart_header .product{
    flex-basis: 25%;
    margin-left: 10%;
}
.cart_header .birth{
    flex-basis: 25%;
}
.cart_header .price,.cart_header .count,.cart_header .amount{
    flex-basis: 14%;
}
/* 购物车头部结束 */

/* 购物车内容开始 */
.cart_contain{
    margin-top: 30px;
    padding-left: 3%;
    padding-right: 3%;
    border: 1px solid #d0d0d0;
    font-size: 14px;
}
.cart_product{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    /* overflow: hidden; */
    height: 150px;
    align-items: center;
    position: relative;
}
.cart_product+.cart_product{
    border-top: 1px dashed #d5d5d5;
}
.p_product{
    display: flex;
    align-items: center;
    flex-basis: 30%;
    color: #684025;
}
.p_pic{
    width: 90px;
    height: 90px;
    flex-basis: 35%;
}
.p_pic img{
    width: 90px;
    height: 90px;
}
.p_product .p_info{
    flex-basis: 65%;
}
.p_info a{
    color: #684025;
}
.p_info i{
    width: 18px;
    height: 16px;
    display: inline-block;
    background: url(../assets/image/cart/icons.png) no-repeat left bottom;
    vertical-align: middle;
    margin-left: 5px;
}
.p_info span{
    color: #b5b5b6;
}
.p_select{
    flex-basis: 28%;
}
.p_select .p_bir{
    width: 60%;
    height: 22px;
    line-height: 22px;
    padding-left: 8px;
    color: #684025;
    font-size: 13px;
    border: 1px solid #d5d5d5;
    cursor: pointer;
    position: relative;
}
.p_select .p_bir i{
    border: 5px solid transparent;
    display: inline-flex;
    position: absolute;
    top: 8px;
    right: 10px;
    border-color: #684025 transparent transparent transparent;
}
.p_select ul{
    position: absolute;
    top: 58%;
    left: 31.8%;
    width: 17%;
    padding-left: 8px;
    background-color: #fff;
    border: 1px solid #ededed;
    box-shadow: 0 2px 4px 0 rgba(237, 237, 237, 0.50);
    z-index: 10;
}
.p_select ul li{
    color: #D8C3AD;
    line-height: 28px;
    margin: 7px 0;
    cursor: pointer;
}
.p_select ul li input{
    outline: 0;
    border: 0;
}
.p_select ul li input.dy{
    width: 72%;
    height: 24px;
    font-size: 12px;
    border: 1px solid #ECECEC;
}
.p_select ul li input.qd{
    background: #673F2B;
    color: #fff;
    width: 22%;
    height: 24px;
    padding: 0;
    border: 0;
}
.p_select ul li:hover{
    color: #442818;
}
.p_price,.p_count,.p_amount,.p_del{
    flex-basis: 10%;
    color: #684025;
}
.p_count{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}
.p_count a{
    width: 20%;
    height: 23px;
    line-height: 23px;
    text-align: center;
    border: 1px solid #d5d5d5;
}
.p_count .btn_dec{
    border-right: none;
}
.p_count .btn_inc{
    border-left: none;
}
.p_count input{
    width: 60%;
    height: 21px;
    outline: none;
    border: 1px solid #d5d5d5;
    background: #fff;
    text-align: center;
}
.p_amount{
    text-align: right;
    color: #f00;
}
.p_del{
    text-align: center;
    flex-basis: 5%;
}
.ts{
    position: absolute;
    top: 0px;
    left: 70.5%;
}
.tsk{
    border: 2px solid #FEBF0F;
    width: 140px;
    height: 50px;
    position: relative;
    box-sizing: border-box;
    padding: 6px 10px 6px 25px;
    color: #666;
    font-size: 12px;
    line-height: 15px;
}
.tsk span::before{
    content: url("../assets/image/cart/yzy.png");
    position: absolute;
    left: 6px;
    top: 6px;
}
.tszzc{
    color: #FEBF0F;
    font-size: 48px;
    position: absolute;
    top: 25px;
    left: 58px;
}
.tszzc :nth-child(2){
    color: #fff;
    position: absolute;
    top: -3px;
    left: 0px;
}

.xw{
    position: absolute;
    top: -15px;
    left: 90.5%;
    z-index: 10;
}
.xwk{
    border: 2px solid #791a1e;
    width: 140px;
    height: 70px;
    position: relative;
    box-sizing: border-box;
    padding: 6px 10px 6px 25px;
    color: #666;
    background-color: #fff;
    font-size: 12px;
    line-height: 15px;
}
.xwk span::before{
    content: url("../assets/image/cart/bzy.png");
    position: absolute;
    left: 6px;
    top: 6px;
}
.xwk button{
    margin-top: 5px;
    margin-right: 11px;
    outline: 0;
    border: 0;
    cursor: pointer;
}
.xw button.qd{
    background-color: #791a1e;
    color: #fff;
}
.xwzzc{
    color: #791a1e;
    font-size: 48px;
    position: absolute;
    top: 46px;
    left: 54px;
}
.xwzzc :nth-child(2){
    color: #fff;
    position: absolute;
    top: -3px;
    left: 0px;
}
/* 购物车内容结束 */

/* 购物车尾部开始 */
.cart_foot{
    margin-top: 28px;
    margin-bottom: 78px;
    border: 1px solid #d0d0d0;
    font-size: 14px;
    color: #684025;
}
.cart_foot .p_zj{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 115px;
    padding-left: 3%;
    padding-right: 3%;
}
.qbqk{
    cursor: pointer;
}
.qbqk i{
    width: 20px;
    height: 20px;
    display: inline-flex;
    background: url(../assets/image/cart/icons.png) no-repeat 0px -112px;
    vertical-align: middle;
}
.order ul{
    display: flex;
    flex-flow: column nowrap;
}
.order ul li{
    width: 100%;
    display: flex;
    line-height: 26px;
    justify-content: flex-end;
}
.order ul .total{
    border-top: 1px solid #d0d0d0;
    margin-top: 7px;
    padding-top: 7px;
    padding-bottom: 3px;
    color: #f00;
}
.cart_foot .p_js{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding-right: 3%;
    padding-top: 12px;
    padding-bottom: 18px;
}
.p_js button{
    background: #791a1e;
    color: #fff;
    width: 18%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    outline: 0;
    border: 0;
}
/* 购物车尾部结束 */

/* 全部清空询问框开始 */
.mask{
    width: 100%;
    height: 200%;
    display: block;
    background-color: #333333;
    position: fixed;
    top: 0%;
    left: 0%;
    opacity: 0.7;
    z-index: 100;
}
.alert{
    width: 20%;
    height: 30%;
    background-color: #fff;
    position: fixed;
    top: 35%;
    left: 35%;
    z-index: 101;
}
.alert .alert_xw{
    margin: 20% 0 20%;
    text-align: center;
    font-size: 16px;
    color: #791a1e;
}
.alert .alert_sel{
    margin: 15px 0 10px 0;
    text-align: center;
}
.alert .alert_sel span{
    width: 30%;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border: 1px solid #ededed;
    margin-right: 7%;
    cursor: pointer;
}
.alert .alert_qd{
    background-color: #791a1e;
    color: #fff;
}
/* 全部清空询问框结束 */

/* buy询问框开始 */
.alert .buy_xw{
    margin-bottom: 10%;
}
.alert .alert_xw .buyask{
    margin-bottom: 5%;
}
.alert .alert_xw input{
    width: 80%;
    height: 18px;
    outline: 0;
    padding: 2px;
}
/* buy询问框结束 */

/* 清空购物车开始 */
.cart_empty{
    background: none;
    border: 0;
    padding: 140px 0 200px;
    text-align: center;
    font-size: 14px;
    color: #666;
    line-height: 2;
}
.cart_empty .icon{
    width: 80px;
    height: 74px;
    background: url(../assets/image/cart/icons.png) no-repeat 0 -33px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 28px;
}
.cart_empty a{
    color: #791a1e;
}
/* 清空购物车结束 */
</style>