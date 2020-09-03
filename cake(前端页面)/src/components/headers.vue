<template>
  <div class="headers">
    <div class="headers-left">
      <div class="headers-left-1">
        <div>
          <div>
            <router-link to="#">
              <img src="../assets/img/log.png" />
            </router-link>
          </div>
        </div>
        <div>
          <div class="headers-left-2">
            <div v-for="(key,i) of arr" :key="i" @click="getfunc(key.router)" :class="{on:headerIndex==i}">
              <i class="iconfont" :class="key.iconfont"></i>
              <router-link :to="key.router">{{key.wenz}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-box" :class="{under:search}" v-show="searchIsshow==true">
      <input
        v-model="keyword"
        ref="foucs"
        :class="{box:search}"
        type="text"
        class="search-txt"
        placeholder="请搜索"
         @focus="showkeyword" @blur="hidekeyword"
      />
      <span class="search-btn">
        <i class="iconfont iconsearch search-btn"></i>
      </span>
       <div class="keyword" v-show="search">
        <!-- 循环遍历请求回来的数组，渲染到li中 -->
        <ul>
          <li v-for="(item,index) of keywords" :key="index" :class="index==myindex?'selected':''">
            <span @click="searchGoods(item.produce_id)" style=" cursor: pointer;">{{item.produce_name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="headers-right">
      <div class="headers-right-1">
        <div v-if="logdata==true">
          <i class="iconfont icondenglu"></i>
          <router-link to="/login">注册|登录</router-link>
        </div>
        <!-- 添加一个接收登录传递过来值的div开始 -->
        <div @click="leave" v-else class="header-right-2">
          <span style="margin-right:5px">{{logindata}}</span><br>
          <span class="iconfont iconlogout" style="font-size: 32px;"></span>
        </div>
        <!-- 添加一个接收登录传递过来值的div结束 -->
        <div @click="shopping" :class="{on:headerIndex==5}">
          <i class="iconfont icongouwuche"></i>
          <router-link to="">购物车</router-link>
        </div>
        <div @click="more" :class="{on:headerIndex==6}">
          <i class="iconfont icongengduo1"></i>
          <router-link to="/more">更多</router-link>
        </div>
      </div>
    </div>
    <!-- 添加响应式菜单栏开始 -->
    <!-- 给侧边栏添加一个div让其点击触发侧边栏的v-if事件 -->
    <div @click="open" style="display:none;color:#fff;" class="open-size iconfont icongengduo"></div>
    <!-- 给侧边栏包裹在v-if自带的动画标签中，好在css样式中添加过度效果 -->
    <transition name="mypop">
      <!-- 给整个侧边栏添加v-if事件，来进行隐藏与显示 -->
      <div v-if="isShow" id="sideb" class="sidebar">
        <!-- 在button，中添加一个点击事件用来触发v-if事件 -->
        <button @click="open">×</button>
        <div>
          <div v-for="(key,i) of arr" :key="i">
            <router-link :to="key.router/key.id">{{key.wenz}}</router-link>
          </div>
        </div>
        <div v-if="logdata==true">
          <router-link to="/login">注册|登录</router-link>
        </div>
        <!-- 添加一个接收登录传递过来值的div开始 -->
        <div v-else class="headers-right-2">
          <span>{{logindata}}</span>
          <span @click="leave">退出登录</span>
        </div>
        <!-- 添加一个接收登录传递过来值的div结束 -->
        <div>
          <router-link to="/cart">购物车</router-link>
        </div>
        <div>
          <router-link to="/more">更多</router-link>
        </div>
      </div>
    </transition>
    <!-- 添加响应式菜单栏结束 -->
    <!-- 购物车的数据开始-->
    <span v-if='cart'>{{count1}}</span>
    <!-- 购物车的数据结束-->
  </div>
</template>
<script>
  export default {
    props:['headerIndex','detailValue'],
    data() {
      return {
        arr: [
          { iconfont: "icongengduo", router: "/", wenz: "首页"},
          { iconfont: "icondangao", router: "/classify", wenz: "蛋糕物语"},
          { iconfont: "iconmianbao", router: "/bread", wenz: "面包物语" },
          { iconfont: "iconziyuan", router: "/newpro", wenz: "最新活动" },
          { iconfont: "iconhuiyuan--copy", router: "/identity", wenz: "个人中心" },
        ],
        //   给if一个初始值
        logdata: true,
        isShow: false,
        // 给一个变量用来接收从登陆页面传递来的用户名
        logindata: "",
        // 给一个变量，绑定页面初始的大小
        screenWidth: document.body.clientWidth,
        // 给输入框进行双向绑定
        keyword: "",
        search: false,
        searchIsshow:true,
        count1:0,
        cart:false,
        // 定义空数组保存后台请求回来的数组
        keywords: [],
          // 定义这个变量控制li的选中
        myindex: -1,
        user_id:0,
      };
    },
    methods: {
      more(){
        this.$router.push('/more')
      },
      // 给侧边栏显示隐藏点击事件绑定函数，并判断需要触发的值
      open() {
        this.isShow == true ? (this.isShow = false) : (this.isShow = true);
      },
      // 退出登录绑定点击事件
      leave() {
        sessionStorage.clear();
        //当退出那一刻，立即清除接收用户名的参数为空
        this.logindata = "";
        this.logdata = true;
        this.cart=false;
        this.$router.push('/');
      },
       showkeyword(){
        //  在挂载阶段钩子函数中绑定键盘函数，event绑事件
        window.onkeydown = e => {
        if (e.keyCode == 38) {
          // 如果当前下标为数组中第一个时，
          if (this.myindex <= 0) {
            // 按下键盘上键，移动到数组的最后一个
            this.myindex = this.keywords.length - 1;
          } else {
            this.myindex--;
          }
        } else if (e.keyCode == 40) {
          // 如果当前下标为数组中第一个时，
          if (this.myindex == this.keywords.length - 1) {
            // 按下键盘上键，移动到数组的最后一个
            this.myindex =0;
          } else {
            this.myindex++;
          }
        }
        if(e.keyCode==13){
          this.keyword=this.keywords[this.myindex].produce_name;
           this.$router.push(`/detail?produce_id=${this.keywords[this.myindex].produce_id}`);
        }
      };
      },
      hidekeyword(){
        window.onkeydown="";
      },
      // 购物车跳转事件
      shopping(){
        // console.log(this.logindata)
        // 判断登录传递过来的数据
        if(this.user_id==''||this.user_id==null){
          this.$router.push('/login')
        }else{
          this.$router.push('/cart')
        }
      },
      // 给循环的div添加点击事件
      getfunc(router){
        this.$router.push(router);
      },
      //点击搜索到的内容进行跳转到相应的页面
      searchGoods(id){
           this.$router.push(`/detail?produce_id=${id}`);
      }
    },
    watch: {
      // 给页面初始的大小绑定监听事件
      screenWidth() {
        // console.log(this.screenWidth);
        // 判断当前页面的大小是否符合侧边栏媒体查询的大小，当符合则给侧边栏触发×的点击事件
        if (768 <= this.screenWidth) {
          this.isShow = false;
        }
      },
      // 监听输入框的内容是否为空
      keyword() {
        if (this.keyword !== "") {
          // 如果值不为空，开始搜索
          this.axios.get("/case/test", { params: { keyword: this.keyword } }).then(result => {
            this.keywords = result.data;
            this.keyword=this.item.produce_name;
            });
          this.search = true;
        }else {
          this.search = false;
        }
      },
    },
    mounted() {
      // 在挂载阶段钩子函数中绑定页面大小的函数，并向页面初始大小的变量中发送获取到的页面大小的值
      
      window.onresize = () => {
        return (() => {
          // 获取当前页面的大小
          window.screenWidth = document.body.clientWidth;
          // 将获取到的当前页面大小返回到变量中
          this.screenWidth = window.screenWidth;
        })();
      };
    //  获取input焦点的框
       let $foucs=this.$refs.foucs;
       $foucs.focus();
      //  接收登录传过来的用户名
      this.logindata=sessionStorage.getItem('$uickname');
      // console.log(this.logindata)
      if(this.logindata!=null){
        this.logdata=false
      }
      // 接收登录传递来的id来查找订单数量
      this.user_id=sessionStorage.getItem('$user_id');
      this.axios.get('/case/count',{params:{user_id:this.user_id}}).then(res=>{
        let x=res.data;
        if(x.length>0){
           for(let i=0;i<x.length;i++){
          x[i].count=Number(x[i].count);
             this.count1+=x[i].count;
              this.cart=true
        }
        }
      });
      //获取用户名
      this.axios.get('/case/mypageid/?user_id=' + this.user_id).then(res => {
                  let data = res.data.results;
                  this.logindata=data.nickname
                if(this.logindata!=null){
                  this.logdata=false
                }
              })
  
      if(this.detailValue==10){
               this.searchIsshow=false;
        }
    },
  };
  </script>
<style scoped>
  /* 给整体页头设置样式 */
  .headers {
    width: 100%;
    height: 100px;
    background: #f2e5ee;
    font-size: 16px;
    background-image: linear-gradient(180deg,#e8e8db94,#f5ef9275);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    position: fixed;
    top: 0;
    z-index: 999999;
  }
  /* 给购物车添加数量 */
  div.headers>span{
    width: 16px;
    height: 16px;
    background: #ffe32a;
    color: #000;
    position: absolute;
    border-radius: 50%;
    line-height: 16px;
    font-size: 11px;
    top: 26px;
    right: 10%;
  }
  /* 左右导航条最大div设置基本样式 */
  .headers-left {
    width: 51.93%;
    height: 100%;
  }
  .headers-right {
    width: 20.95%;
    height: 100%;
  }
  
  /* 给左右两侧侧导航条第二个div设置基本样式 */
  .headers-left-1,
  .headers-right-1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  /* 给左侧导航条的图片设置基本样式 */
  .headers-left-1 > div:nth-child(1) {
    width: 28.95%;
    height: 110px;
    padding-top: 10px;
    border-right: 1px solid #e8e8e8;
  }
  .headers-left-1 > div:nth-child(1) div img {
    width: 180px;
    max-width: 100% !important;
  }
  /* 给左侧导航条的图标文字div设置基本样式 */
  .headers-left-1 > div:nth-child(2) {
    width: 71.05%;
    height: 100%;
  }
  .headers-left-2 {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .headers-left-2 > div {
    width: 17.44%;
    border-right: 1px solid yellow;
    height: 100%;
    border-top: 0px solid;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
  }
  .headers-left-2 > div:first-child {
    border-left: 1px solid yellow;
  }
  /* 设置左右导航条的i标签样式 */
  .headers-left-2 > div i,
  .headers-right-1 div i {
    display: block;
    margin-bottom: 9px;
    font-size: 28px !important;
  }
  /* 设置左右导航条a标签的样式 */
  .headers-left-1 a,
  .headers-right-1 a {
    text-decoration: none;
    color: #8c8c8c;
  }
  /* 设置右侧导航栏的span标签 */
  .header-right-2 span{
    color: red;
  }
  .header-right-2>span:last-child{
    display: block;
    margin-top: 13px;
  }
  /* 添加右侧导航条的基本样式 */
  .headers-right-1 > div:nth-child(2) {
    width: 70.93%;
  }
  .headers-right-1 div {
    border-left: 1px solid yellow;
  }
  .headers-right-1 > div:nth-child(1),
  .headers-right-1 > div:nth-child(2) {
    width: 29.43%;
    height: 100%;
    padding-top: 30px;
    box-sizing: border-box;
  }
  .headers-right-1 > div:nth-child(3) {
    width: 41.15% !important;
    height: 100%;
    padding-top: 30px;
    box-sizing: border-box;
  }
  .headers-right-2 span {
    display: block;
    color: pink;
  }
  .headers-right-2 > span:last-child {
    margin-top: 20px;
  }
  /* 给搜索框添加样式 */
  .search-box {
    transform: translate(-1%, 65%);
    background: #fff;
    height: 30px;
    border-radius: 30px;
    padding: 5px;
    margin-top: 10px;
    position: relative;
  }
  .search-btn {
    color: #e84118;
    float: right;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-txt {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: #111;
    font-size: 14px;
    transition: 0.4s;
    line-height: 30px;
    width: 0px;
  }
  .selected{
      background-color:rgb(245, 247, 171);
  }
  .keyword{
    position: absolute;
    top: 40px;
    left: 0px;
    background-color: #fff;
    box-sizing: border-box;
    width: 202px;
    /* box-shadow: 0 0 5px rgba(0,0,0,.2); */
    border-radius: 0 0 15px 15px;
  }
  .keyword ul li{
    padding:13px 0px;
    text-align:left; 
    text-indent: 10px;
    box-sizing: border-box;
  }
  .keyword ul li:last-child{
    border-radius: 0 0 15px 15px;
  }
  .keyword ul li a{
    color: #959595;
  }
  /* 鼠标移入后的样式 */
  .box {
    width: 150px;
    padding: 0 6px;
    clear: both;
  }
  .under{
  border-radius: 15px 15px 0 0;
  }
  .search-box:hover > .search-txt {
    width: 150px;
    padding: 0 6px;
    clear: both;
  }
  .search-btn:hover > .search-btn {
    background: white;
  }
  /* 添加左右侧导航鼠标移入的样式样式 */
  .headers-left-2 > div:hover,
  .headers-right-1 > div:hover {
    background-color: #eaf9c3b6;
    color: #fff !important;
    border-top: 1px solid #fbe2de;
    box-sizing: border-box;
    cursor: pointer;
  }
  .on{
    background-color: #eaf9c3b6;
    color: #fff !important;
    border-top: 1px solid #fbe2de;
    box-sizing: border-box;
    cursor: pointer;
  }
  .headers-left-2 > div:hover a,
  .headers-right-1 > div:hover a,
  .headers-right-1 > div:hover span {
    color: #fff !important;
  }
  /* 添加响应式菜单栏的样式 */
  .open-size:hover,
  .sidebar > button {
    cursor: pointer;
  }
  .sidebar {
    height: 600px;
    width: 100%;
    z-index: 1;
    background-color: #ffeffa;
    position: fixed;
    top: 60px;
    left: 0;
    padding-top: 60px;
  }
  .sidebar > button {
    position: absolute;
    top: 10px;
    left: 90%;
    z-index: 3;
    width: 40px;
    height: 40px;
    font-size: 33px;
    background-color: pink;
    border: 0;
    color: #fff;
    outline: none;
  }
  .sidebar > div a {
    display: block;
    color: #666;
    padding-top: 20px;
    padding-bottom: 20px;
    text-decoration: none;
    font-size: 16px !important;
  }
  /* 过度效果 */
  /*   name -固定的值*/
  #sideb.mypop-enter {
    /*元素进入页面时的起始状态*/
    width: 100% !important;
    height: 0 !important;
    padding-top: 60px;
    opacity: 0;
  }
  #sideb.mypop-enter-active {
    /*进入动画播放过程中的样式*/
    transition: all 1.5s linear;
    overflow: hidden;
  }
  #sideb.mypop-enter-to {
    /*元素进入页面后的结束状态*/
    width: 100% !important;
    height: 600px !important;
    padding-top: 60px;
    opacity: 0.9;
  }
  
  /*   name -固定的值*/
  #sideb.mypop-leave {
    /*开始离开时的起始状态*/
    height: 600px !important;
    opacity: 0.9;
  }
  #sideb.mypop-leave-active {
    /*离开过程中的状态*/
    transition: all 1.5s linear;
    overflow: hidden;
  }
  #sideb.mypop-leave-to {
    /*离开结束时最后的目标状态*/
    height: 0 !important;
    opacity: 0;
  }
  /* 媒体查询 */
  @media screen and (max-width: 768px) {
    .headers-left {
      display: none;
    }
    .headers-right {
      display: none;
    }
    .headers {
      width: 100%;
      height: 60px;
      background-color: #ffeffa;
    }
    .open-size {
      display: block !important;
      font-size: 50px !important;
    }
    .search-box {
      display: none;
    }
    div.headers span{
      display: none;
    }
  }
  @media screen and (min-width: 768px) {
    .sidebar {
      display: none;
      width: 0 !important;
      height: 0 !important;
    }
  }
  </style>