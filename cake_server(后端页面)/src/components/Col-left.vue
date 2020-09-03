<template>
    <div class="col-left">
        <div class="left_col">
            <div>
                <img src="../assets/head/head.png">
            </div>
            <div>
                <span>欢迎回来,</span>
                <h2>超级管理员</h2>
            </div>
        </div>
        <ul class="nav">
            <li>
                <span>数据管理</span> 
            </li>
            <li>
                <div @click="show(1)">
                    <img src="../assets/icon/computer.png">
                    <span>商品管理</span>
                    <img src="../assets/icon/arrows.png">
                </div>
                
                <ul class="nav-child" v-show="isShow==1" @click="goodOption($event)">
                    <li><span>商品列表</span></li>
                    <li><span>修改商品</span></li>
                    <li><span>详情页图片操作</span></li>
                    <li><span>添加商品</span></li>
                    
                </ul>
            </li>
            <li>
                <div @click="show(2)">
                    <img src="../assets/icon/conuser.png">
                    <span>用户管理</span>
                    <img src="../assets/icon/arrows.png">
                </div>
                
                <ul class="nav-child" v-show="isShow==2">
                    <li><span @click="userOption">用户信息列表</span></li>
                </ul>
            </li>
            <li>
                <div @click="show(3)">
                    <img src="../assets/icon/shopping.png">
                    <span>订单管理</span>
                    <img src="../assets/icon/arrows.png">
                </div>
                <ul class="nav-child" v-show="isShow==3">
                    <li @click="order"><span>订单管理</span></li>
                </ul>
            </li>
        </ul>
        <ul class="nav-menu">
            <li>
                <span>内容管理</span>
            </li>
            <li>
                <div @click="show(4)">
                    <img src="../assets/icon/shopp.png">
                    <span>首页商品管理</span>
                    <img src="../assets/icon/arrows.png">
                </div>
                <ul class="nav-child" v-show="isShow==4">
                    <li @click="lunbo"><span>轮播广告</span></li>
                 <!--     <li><span>首页推荐</span></li>
                  <li><span>最新上架</span></li>
                    <li><span>热销单品</span></li>-->
                </ul>
            </li>
<!--            <li >
                <div @click="show(5)">
                    <img src="../assets/icon/function.png">
                    <span>功能页面</span>
                    <img src="../assets/icon/arrows.png">
                </div>
                <ul class="nav-child" v-show="isShow==5">
                    <li><span>404错误页面</span></li>
                    <li><span>404错误页面</span></li>
                    <li><span>500错误页面</span></li>
                </ul>
            </li>-->
        </ul>
      <!--  <ul class="nav-dottom">
            <li>
                <img src="../assets/icon/gear.png">
                <p>工具</p> 
            </li>
            <li><img src="../assets/icon/full-screen.png">
                <p>全屏</p> 
            </li>
            <li><img src="../assets/icon/conceal.png">
                <p>隐藏</p> 
            </li>
            <li><img src="../assets/icon/quit.png">
                <p>退出</p> 
            </li>
        </ul>-->
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:0,
        }
    },
    methods: {
        show(s){
                this.isShow=( this.isShow==s?0:s);
            },
            goodOption(e){
                if(e.target.nodeName=='SPAN'){
                    if(e.target.innerHTML=='商品列表'){
                        this.$store.commit('changeState1');
                    };
                    if(e.target.innerHTML=='修改商品'){
                        this.$store.commit('changeState2');
                    };
                     if(e.target.innerHTML=='详情页图片操作'){
                        this.$store.commit('changeState3');
                    };
                    if(e.target.innerHTML=='添加商品'){
                        this.$store.commit('changeState4');
                    };
                }
            },
            userOption(){
                this.$store.commit('changeState5');
            },
            lunbo(){
                this.$store.commit('changeState7');
            },
            order(){
                this.$store.commit('changeState6');
            },
    },
}
</script>
<style scoped>
.col-left{
    width:250px;
    margin-top: 20px;
    display: inline-block;
    position: relative;
    overflow: hidden;
}
.left_col{
    margin-left:10px;
    width:230px;
    height: 170px;
    box-shadow: 0 1px 0 rgba(0,0,0,.1);
    background: none repeat scroll 0 0 rgba(0,0,0,.1);
    border-radius: 3px;
    display: flex;
    justify-content:space-around;
}
.left_col>div:first-child{
    display: inline-block;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    align-self: center;
}
.left_col>div:first-child>img{
    width: 56px;
    height: 56px;
    margin-top: 2px;
}
.left_col>div:last-child{
    align-self: center;
}
.left_col>div:last-child span{
    font-size: 13px;
    line-height: 30px;
    color: #BAB8B8;
}
.left_col>div:last-child h2{
    font-size: 14px;
    color: #ECF0F1;
    margin: 0;
    font-weight: 300;
}
.nav{
    margin-left:10px;
    margin-top:10px;
    width:230px;
    box-shadow: 0 1px 0 rgba(0,0,0,.1);
    background: none repeat scroll 0 0 rgba(0,0,0,.1);
    border-radius: 3px;
    color:#fff;
    box-sizing: border-box;
}
.nav>li:first-child{
    padding: 5px 10px 5px 0;
}
.nav>li:first-child>span{
    background: none repeat scroll 0 0 rgba(0,0,0,.2);
    border-radius: 20px;
    height: 22px;
    line-height: 20px;
    padding: 0 11px;
    font-size: 12px;
}
.nav>li:not(:first-child){
    padding: 10px 10px 10px 30px;
    cursor: pointer;
}
.nav>li>div>img:first-child{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 15px;
}
.nav>li>div>img:nth-child(3){
    width:12px;
    height: 12px;
    float: right;
}
.nav-child>li{
    position: relative;
    font-size: 12px;
    color:#fff;
    padding: 9px;
    text-align: center;
}
.nav-child>li::before{
    background: #425668;
    bottom: auto;
    content: "";
    height: 8px;
    left: 23px;
    margin-top: 3px;
    position: absolute;
    right: auto;
    width: 8px;
    z-index: 1;
    border-radius: 50%;
}
.nav-child>li::after{
    border-left: 1px solid #425668;
    bottom: 0;
    content: "";
    left: 27px;
    position: absolute;
    top: 0;
}
.nav-menu{
    margin-left:10px;
    margin-top:10px;
    width:230px;
    box-shadow: 0 1px 0 rgba(0,0,0,.1);
    background: none repeat scroll 0 0 rgba(0,0,0,.1);
    border-radius: 3px;
    color:#fff;
    box-sizing: border-box;
}
.nav-menu>li:first-child{
    padding: 5px 10px 5px 0;
}
.nav-menu>li:first-child>span{
    background: none repeat scroll 0 0 rgba(0,0,0,.2);
    border-radius: 20px;
    height: 22px;
    line-height: 20px;
    padding: 0 11px;
    font-size: 12px;
}
.nav-menu>li:not(:first-child){
    padding: 10px 10px 10px 30px;
    cursor: pointer;
}
.nav-menu>li>div>img:first-child{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 15px;
}
.nav-menu>li>div>img:nth-child(3){
    width:12px;
    height: 12px;
    float: right;
}
.nav>li:not(:first-child):hover,.nav-menu>li:not(:first-child):hover{
    background-color: rgba(0, 0, 0, 0.2);
    text-shadow: none;
    padding-left: 28px;
    position: relative;
    color: rgb(255, 255, 255) !important;
    border-left: 2px solid rgb(255, 255, 255);
}
.nav>li:not(:first-child):hover::after,.nav-menu>li:not(:first-child):hover::after{
    width: 0px;
    height: 0px;
    position: absolute;
    top: 16px;
    left: -6px;
    content: "";
    display: block;
    transform: rotate(90deg);
    border-bottom: 6px solid rgb(255, 255, 255);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}
.nav-dottom{
    margin-left:10px;
    bottom:10px;
    height:80px;
    width:230px;
    box-shadow: 0 1px 0 rgba(0,0,0,.1);
    background: none repeat scroll 0 0 rgba(0,0,0,.1);
    border-radius: 3px;
    color:#fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    cursor: pointer;
}
.nav-dottom>li>img:first-child{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 6px;
    margin-bottom: 10px;
}
.nav-dottom>li p{
    font-size: 13px;
}
</style>
