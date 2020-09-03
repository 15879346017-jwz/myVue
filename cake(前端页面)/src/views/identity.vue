<template>
    <div class="my-identity">
        <headers class="headers" :headerIndex="headerIndex"></headers>
        <div class="center ">
            <div class="main">
                <div class="title">
                    <span><div >个人中心</div> </span>
                    <span style="padding-left: 10px;"> <div v-text="'> '+title" ></div> </span>
                </div>
                <div class="body_1">
                    <div class="page_aside">
                        <div class="menu_list">
                            <h2 class="menu_list_title">账户信息</h2>
                            <ul class="menu_list_list">
                                <li><div :class="{'active':isshow==1}" @click="showpage(1,$event)">个人资料</div></li>
                                <li><div :class="{'active':isshow==3}" @click="showpage(3,$event)">地址管理</div></li>
                                <li><div :class="{'active':isshow==2}"  @click="showpage(2,$event)">修改密码</div></li>
                                <!-- <li><a href="javascript:;">账户余额</a></li> -->
                            </ul>
                        </div>
                        <div class="menu_list">
                            <h2 class="menu_list_title">交易管理</h2>
                            <ul class="menu_list_list">
                                <li><div  :class="{'active':isshow==4}"  @click="showpage(4,$event)">订单管理</div></li>
                                <li><div  :class="{'active':isshow==6}"  @click="showpage(6,$event)">历史订单</div></li>
                            </ul>
                        </div>
                        <div class="menu_list">
                            <h2 class="menu_list_title">客户服务</h2>
                            <ul class="menu_list_list">
                                <li><div :class="{'active':isshow==5}"  @click="showpage(5,$event)">帮助中心</div></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="body_2">
                    <!-- 个人资料主页 -->
                    <!-- <my-page v-show="isshow==0" ></my-page> -->
                    <!-- 个人资料页 -->
                    <my-pagedet @famod="famod(1)"  v-if="isshow==1"></my-pagedet>
                    <!-- 修改密码页 -->
                    <my-pagecodec @famod="famod(2)" v-if="isshow==2" ></my-pagecodec>
                    <!-- 地址管理页面 -->
                    <my-pageadd @famod="famod(3)" v-if="isshow==3"></my-pageadd>
                    <!-- 账户余额页面 -->
                    <!-- 账户余额结束 -->
                    <!-- 订单页面开始 -->
                    <my-pageorder @famod="famod(4)" v-if="isshow==4"  ></my-pageorder>
                    <!-- 订单页面结束  -->
                    <!-- 帮助页面开始 -->
                    <my-pagehelp @famod="famod(5)" v-if="isshow==5"></my-pagehelp>

                    <!-- 帮助页面结束 -->
                    <my-pagehis @famod="famod(6)" v-if="isshow==6"></my-pagehis>
                    <!-- body2 页面结束 -->
                </div>
            </div>
        </div>
        <footers class="footers"></footers>
    </div>
</template>
<script >
// import MyPage from '../components/mypage'
import MyPagedet from '../components/mypage/mypagedet'
import MyPagecodec from '../components/mypage/mypagecodec'
import MyPageadd from '../components/mypage/mypageadd'
import MyPageorder from '../components/mypage/mypageorder'
import MyPagehelp from '../components/mypage/mypagehelp'
import MyPagehis from'../components/mypage/mypagehistory'
export default {
    components:{
        MyPagehis,
        // MyPage,
        MyPagedet,
        MyPagecodec,
        MyPageadd,
        MyPageorder,
        MyPagehelp
    } ,
    data(){
        return{
            title:'个人资料',
            isshow:1,
            user_id:0,
            headerIndex:4
        }
    },methods: {
        showpage(num,$event){
            this.isshow=num
            // console.log(1)
            this.title=$event.target.innerHTML
            // this.$nextTick(() => {
            //     this.isRouterAlive = num
            // })
        },
        famod(num){
            console.log(num)
            this.isshow = ''
            this.$nextTick(() => {
                this.isshow = num
            })
        }
    },
    mounted(){
         this.user_id=sessionStorage.getItem('$user_id');
         if(this.user_id==null){
             this.$router.push('/login');
         }
    },
}
</script>
<style>
*{list-style: none;}
.my-identity .center {
    height: 580px;
    width: 1200px;
    margin: 75px auto;
    /* background-color: pink; */
}

.my-identity .main {
    width: 100%;
    height: 100%;
    margin-top: 150px;
    position: relative;
}

.my-identity .title {
    margin: 10px 5px;
    border-bottom: 2px solid #999999;
    padding-bottom: 10px;
    height: 20px;
    display: flex;
    flex: row;
}

.my-identity .title span div{
    font-size: 20px;
    font-weight: normal;
    color: #791a1e;
    cursor: pointer;
}
/* 导航栏 */

.my-identity .body_1 {
    height: 560px;
    width: 226px;
    position: absolute;
    top: 40px;
    left: 0;
}

.my-identity .page_aside {
    height: 550px;
    width: 226px;
    /* background-color: lightblue; */
    padding-left: 10px;
}

.my-identity .menu_list {
    margin-bottom: 30px;
}

.my-identity .menu_list_title {
    padding-left: 0;
    font-size: 20px;
    font-weight: normal;
    color: #791a1e;
    margin-bottom: 20px;
    line-height: 1;
}

.my-identity .menu_list_list li div {
    padding: 5px 0;
    color: #666666;
    line-height: 1.83333;
    cursor: pointer;
}

.my-identity .menu_list_list li div.active {
    color: #791a1e;
}

/* 主要页面 */

.my-identity .body_2 {
    width: 965px;
    height: 550px;
    margin-left: 226px;
    /* background-color: lightseagreen; */
    position: absolute;
    top: 40px;
    right: 0;
}
/* 主页结束 */
</style>