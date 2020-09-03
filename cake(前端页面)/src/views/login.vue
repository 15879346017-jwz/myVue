<template>
  <div class="log">
    <div class="container" id="container" :class="{'right-panel-active':search}">
      <div class="form-container sign-up-container">
        <div class="container-div">
          <h1>注册</h1>
          <div class="social-container">
            <router-link to="#" class="scoial">
              <i class="iconfont iconqq"></i>
            </router-link>
            <router-link to="#" class="scoial">
              <i class="iconfont iconweixin"></i>
            </router-link>
            <router-link to="#" class="scoial">
              <i class="iconfont iconweibo"></i>
            </router-link>
          </div>
          <span>选择以上方式登录或者使用您的账号</span>
          <div>
            <div class="pwd">
              <input  type="text" placeholder="用户名6~12位" v-model="signname" @blur="signname1" />
              <!-- onpaste：粘贴时触发的事件 oncontextmenu：右键弹出属性菜单 oncopy：实现拷贝,复制 oncut：剪切 -->
              <input
                v-if="iconeye==true"
                type="password"
                onpaste="return false"
                oncontextmenu="return false"
                oncopy="return false"
                oncut="return false"
                placeholder="密码8~16"
                v-model="signpwd"
                @blur="signpwd1"
              />
              <input
                v-else
                type="text"
                onpaste="return false"
                oncontextmenu="return false"
                oncopy="return false"
                oncut="return false"
                placeholder="密码8~16"
                 v-model="signpwd"
                @blur="signpwd1"
              />
              <i v-if="iconeye==true" class="iconfont iconeye" @click="eye"></i>
              <i v-else class="iconfont iconyanjing eyes" @click="eye"></i>
              <input type="password" v-model="signuid" @blur="signuid1" onpaste='return false' oncontextmenu='return false' oncopy='return false' oncut='return false' placeholder="再次输入密码" />
              <input type="text" v-model="signphone" @blur="signphone1" placeholder="请输入有效的手机号码">
              <input type="text" placeholder="请输入验证码" @blur="signvalue1"  v-model="signvalue" @keyup.13="reg" />
              <div class="yz">{{code1}}</div>
              <div class="code code1" v-if="show==true" @click="ptyz">
              <span>获取验证码</span>
            </div>
            <div class="code code1" v-else>
              <span>{{code}}</span>
            </div>
            </div>
            <div class="hint">{{hint2}}</div>
            <input type="button" @click="reg" class="button" value="注册" />
          </div>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="container-div">
          <div class="log-container">
            <h1 @click="login">登录</h1>
            <span>|</span>
            <h1 @click="login1">手机号</h1>
          </div>
          <div class="social-container">
            <router-link to="#" class="scoial">
              <i class="iconfont iconqq"></i>
            </router-link>
            <router-link to="#" class="scoial">
              <i class="iconfont iconweixin"></i>
            </router-link>
            <router-link to="#" class="scoial">
              <i class="iconfont iconweibo"></i>
            </router-link>
          </div>
          <span>选择以上方式登录或者使用您的账号</span>
          <div v-if="log==true" class="pwd">
            <input ref="username" type="text" v-model="username" placeholder="请输入6~12位账号" @blur="lostname" />
            <input
              v-if="iconeye==true"
              onpaste="return false"
              oncontextmenu="return false"
              oncopy="return false"
              oncut="return false"
              type="password"
              placeholder="请输入8~16位密码"
              @blur="lostpwd"
              v-model="userpwd"
              ref="pwd"
              @keyup.13="confined"
            />
            <input
              v-else
              type="text"
              onpaste="return false"
              oncontextmenu="return false"
              oncopy="return false"
              oncut="return false"
              placeholder="请输入8~16位密码"
              @blur="lostpwd"
              v-model="userpwd"
              ref="pwd"
              @keyup.13="confined"
            />
            <i v-if="iconeye==true" class="iconfont iconeye" @click="eye"></i>
            <i v-else class="iconfont iconyanjing eyes" @click="eye"></i>
            <router-link to="#">忘记密码</router-link>
            <br />
            <div class="hint">{{hint1}}</div>
            <input type="button" @click="confined" class="button" value="登录" />
          </div>
          <div v-else>
            <input ref="username" v-model="userphone" @blur="phoneblur" type="text" placeholder="手机号码" />
            <input type="text" placeholder="请输入验证码" v-model="phone" @blur="phonenull" @keyup.13="enterUp"/>
            <div class="code" v-if="show1==true" @click="phoneyz">
              <span>获取验证码</span>
            </div>
            <div class="code" v-else >
              <span>重新发送{{code2}}s</span>
            </div>
            <router-link to="#">忘记密码</router-link><br>
            <div class="hint">{{hint}}</div>
            <input type="button" @click="enterUp" class="button" value="登录" />
          </div>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？</h1>
            <p>请使用您的账号登录</p>
            <button class="ghost" id="signIn" @click="signUp">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>您还没有账号？</h1>
            <p>立即注册选择您喜欢的！</p>
            <button class="ghost" @click="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 添加class名的初始值
      search: false,
      // 登录方式的显示隐藏
      log: true,
      // 密码框的显示隐藏
      iconeye: true,
      // 注册验证区
      signvalue:'',
      show:true,
      code1:'',
      code: "",
      signname:'',
      signpwd:'',
      signuid:'',
      signphone:'',
      // 手机号码验证区
      show1:true,
      code2:'60',
      phone:'',
      phone1:'',
      // 普通登录区域
      username:'',
      userpwd:'',
      // 手机号码登录区域
      userphone:'',
      // 提示消息区域
      hint:'',
      hint1:'',
      hint2:''
    };
  },
  methods: {
    // 切换登录注册的模式函数
    signUp() {
      this.search == false ? (this.search = true) : (this.search = false);
    },
    // 登录方式的函数
    login() {
      this.log=true
      
    },
    login1(){
      this.log =false
    },
    // 显示密码的点击函数
    eye() {
      this.iconeye == true ? (this.iconeye = false) : (this.iconeye = true);
    },
    // 普通验证码区域
    ptyz(){
      let arr=[];
     let brr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E','F', 'G', 'H', 'I', 'J', 'K','L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
     for (var i = 0; i <4; i++) {
       
         arr += brr[Math.floor(Math.random() * 62)]
     }
     this.code1=arr;
    },
    // 手机验证区域
    phoneyz(){
     if(this.phoneblur()){
       this.show1=false;
      var that=this;
       let arr=[];
     let brr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
     for (var i = 0; i <4; i++) {
         arr += brr[Math.floor(Math.random() * 10)]
     }
     this.phone=arr;
     this.phone1=arr;
     let s=60;
     let count=setInterval(()=>{
       s--;
       if(s<=0){
         this.show1=true;
         clearInterval(count)
       }else{
         this.code2=s
       }
     },1000)
     }else{
       this.hint='号码格式不正确'
       return
     }
    },
    
    // 普通登录失去焦点验证开始
    // 判断失去焦点时的账号
    lostname(){
      //创建正则表达式
      let unameReg = /^[0-9A-Za-z]{6,12}$/;
      //获取用户输入的账号数据
      let uname = this.username;
      //判断账号是否符合要求
      if (unameReg.test(uname)) {
        this.hint1='';
        return true;
      } else {
        this.hint1='账号错误';
        return false;
      }
    },
    lostpwd(){
      //获取用户输入的密码数据
      let upwd = this.userpwd;
      console.log(upwd)
      //创建密码正则表达式
      let upwdReg = /^\w.{8,12}$/;
      //判断密码是否符合格式
      if (upwdReg.test(upwd)) {
        this.hint1=''
        return true;
      } else {
        this.hint1='密码错误';
        return false;
      }
    },
    // 判断普通登录失去焦点验证结束

    // 手机登录函数开始
    phoneblur(){
      //创建正则表达式
      let unameReg = /^1[3456789]\d{9}$/;
      //获取用户输入的账号数据
      let uphone = this.userphone;
      //判断账号是否符合要求
      if (unameReg.test(uphone)) {
        // 清空提示框
        this.hint=''
        return true;
      } else {
        this.hint='手机号码格式错误';
        // 添加用户焦点事件
      let $username = this.$refs.username;
      $username.focus();
        return false;
      }
    },
    // 判断手机验证码是否为空
    phonenull(){
      let $phone=this.phone;
      let $phone1=this.phone1;
      if($phone==$phone1){
        this.hint='';
        return true
      }else{
        this.hint='验证码错误';
        return false
      }
    },
    // 手机登录结束
    // 注册失去焦点开始
    // 账号
    signname1(){
      //创建正则表达式
      let unameReg = /^[0-9A-Za-z]{6,12}$/;
      //获取用户输入的账号数据
      let uname = this.signname;
      //判断账号是否符合要求
      if (unameReg.test(uname)) {
        this.hint2=''
        return true;
      } else {
        this.hint2='账号格式错误'
        return false;
      }
    },
    // 密码
    signpwd1(){
//获取用户输入的密码数据
      let upwd = this.signpwd;
      //创建密码正则表达式
      let upwdReg = /^\w.{8,12}$/;
      //判断密码是否符合格式
      if (upwdReg.test(upwd)) {
        this.hint2=''
        return true;
      } else {
        this.hint2='密码错误'
        return false;
      }
    },
    // 确认密码
    signuid1(){
      let upwd = this.signpwd;
      let uid=this.signuid;
      if(upwd==uid){
        this.hint2='';
        return true;
      }else{
        this.hint2='验证码错误';
        return false
      }
    },
    signphone1(){
        //创建正则表达式
      let unameReg = /^1[3456789]\d{9}$/;
      //获取用户输入的账号数据
      let uphone = this.signphone;
      //判断账号是否符合要求
      if (unameReg.test(uphone)) {
        // 清空提示框
        this.hint2=''
        return true;
      } else {
        this.hint2='手机号码格式错误';
        return false;
      }
    },
    // 验证码
    signvalue1(){
      let $signvalue=this.signvalue;
      let $code1=this.code1;
      if($signvalue.toUpperCase()==$code1.toUpperCase()){
        this.hint2='';
        return true;
      }else{
        this.hint2='验证码错误';
        return false
      }
    },
    // 注册失去焦点结束
    // 密码登录函数
    confined(){
      // 判断账号和密码失去焦点的函数状态
      console.log(this.username)
      console.log(this.userpwd)
      if(this.lostname()&&this.lostpwd()){
        this.hint1='';
        // 发送请求`${this.username}&${this.userpwd}`
        this.axios.get('/case/login1',{params:{uname:this.username,upwd:this.userpwd}}).then(result=>{
          let $uickname=result.data;
          if($uickname==0){
            this.hint1='登录失败';
            return
          }else{
            sessionStorage.setItem('$uickname',$uickname[0].nickname);
            sessionStorage.setItem('$user_id',$uickname[0].user_id);
            console.log($uickname[0].user_id)
            this.$router.push('/');
            return
          }
        })
        return
      }else{
        this.hint1='用户名或密码错误';
        return
      }
    },
    // 手机号码登录函数
    enterUp(){
      // 判断手机号和验证码的结果
      console.log(this.userphone)
      if(this.phoneblur()&&this.phonenull()){
        this.hint=''
        this.axios.get('/case/login2',{params:{phone:this.userphone}}).then(result=>{
          let phone=result.data;
          console.log(phone[0].user_id)
          if(phone==0){
            this.hint='登录失败';
            return
          }else{
            sessionStorage.setItem('$user_id',phone[0].user_id);
            
            this.$router.push('/')
            return
          }
        })
        return;
      }else{
        this.hint='格式不对或验证码有误';
        return
      }
    },
    // 注册函数
    reg(){
      if(this.signname1()&&this.signpwd1()&&this.signuid1()&&this.signvalue1()&&this.signphone1()){
        this.axios.post('/case/reg',`user_name=${this.signname}&user_pwd=${this.signpwd}&iphone=${this.signphone}`).then(result=>{
          console.log(result.data)
          if(result.data==-1){
            this.hint2='用户名重复'
          }else if(result.data==0){
            this.hint2='注册失败'
          }else{
            this.$router.go(0)
          }
        })
      }
    }
  },
};
</script>
<style scoped>
/* 全局基本样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.log {
  background-color: #f6f5f7;
  display: flex;
  /* 主轴方向 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/photo/5.jpg');
}
.iconqq{
  color: #21adf5;
}
.iconweixin{
  color: #3baf34;
}
.iconweibo{
  color: #ed1119;
}
h1 {
  display: inline;

  font-weight: bold;
  margin: 0;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  /* 字体之间的间距 */
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}
.log-container span {
  font-size: 18px;
  margin: 0 15px;
}
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
/* 鼠标移入事件 */
.form-container .button:hover,
.pwd i:hover,
h1:hover,
.ghost:hover,.code:hover,.code1:hover{
  cursor: pointer;
}
/* 最外层div */
.container {
  background: #fff;
  border-radius: 10px;
  /* 第一个是水平阴影  第二个值是垂直阴影 第三个值是模糊距离 */
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin-left: 360px;
}
.form-container .container-div {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.social-container {
  margin: 10px 0;
}
.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  width: 40px;
  height: 40px;
}
.form-container input {
  background-color: #eee;
  border: none;
  border-radius: 2px;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
}
button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}
.form-container .button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  width: 118px;
}

button:active {
  transform: scale(0.95);
}
/* 密码框的显示 */
.pwd {
  position: relative;
}
.pwd i {
  position: absolute;
  right: 10px;
  top: 63px;
  font-size: 20px;
}
.eyes {
  color: blue !important;
}
/* 验证码 */
.container-div > div:nth-child(4) {
  position: relative;
}
/* 手机号码和普通登录区 */
.code {
  position: absolute;
  background: #e8e8e8;
  border-top:1px solid #eee;
  border-right:1px solid #eee;
  border-bottom:1px solid #eee;
  height: 39px;
  text-align: center;
  line-height: 39px;
  top: 54px;
  right: 0px;
}
/* 错误提示消息 */
.hint{
  height: 16px;
  color: #ff416c;
  font-size: 12px !important;
}
/* 注册区域 */
.code1{
   top: 201px;
  right: 0px;
  background: #fff;
  border-top:1px solid #eee;
  border-right:1px solid #eee;
  border-bottom:1px solid #eee;
}
.yz{
  position: absolute;
  top: 201px;
  right: 61px;
  width: 60px;
  height: 39px;
  text-align: center;
  line-height: 39px;
  font-size: 20px;
  letter-spacing: 1.5px;
  color: red;
  background-image:url('../assets/photo/yzm.png');
}
/* 当聚焦时去除自带的边框 */
button:focus,
input:focus {
  outline: none;
}
button.ghost {
  background: transparent;
  border-color: #fff;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-out;
}

/* 登录container */
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
/* sign-up */
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
/* overlay-container */
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
}
.overlay {
  background: #ff416c;
  /* 添加背景色后加入no-repeat不重复 */
  background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
  color: #fff;
  height: 100%;
  /* 因为要覆盖整个页面 */
  width: 200%;
  position: relative;
  /* 让整个overlay页面宽度的一半隐藏在左边 */
  left: -100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 0 40px;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.overlay-left {
  transform: translateX(-20%);
}
/* animation */
/* 让左侧的页面切换到右侧 */
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
/* 让右侧页面移到左侧 */
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
/* 注册页面和登录页面层级关系的调整 */
.container.right-panel-active .sign-up-container {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
}
/* 已有账号的层级关系修改 */
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>