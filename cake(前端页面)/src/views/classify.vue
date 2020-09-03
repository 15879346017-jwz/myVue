<template>
<div>
     <headers :headerIndex='headerIndex'></headers>
      <div class="classify-body">
          <div class="classify-body-header">
              <ul>
                  <li>
                        <ul class="classify-body-header-contents2">
                            <li>主题蛋糕：</li>
                            <li v-for="(item,index) of list2" :key="index" @click='clickLI1(index,$event)' :class="{on:isOn==index}">{{item}}</li>
                        </ul>
                  </li>
                  <li>
                        <ul class="classify-body-header-contents3" >
                            <li>口味：</li>
                            <li v-for="(item,index) of list3" :key="index"  @click='clickLI2(index,$event)' :class="{on:on==index}">{{item}}</li>
                        </ul>
                  </li>
              </ul>
          </div>
          <div class="classify-body-body1" v-if='list5.length==0'>
              <table></table>
              <p class="iconfont icon-sr"></p>
              <span>亲，您选则的蛋糕类型还没上线哦</span>
          </div>
          <div class="classify-body-body" v-else>
                  <ul>
                      <li v-for="(item,index) of list5" :key="index" @click="goToDetail($event,item.produce_id)">
                          <div class="classify-body-body-contents">
                              <div><img :src="item.image1" alt=""></div>
                              <div>
                                    <p>{{item.produce_name}} <i class="iconfont icon-xian01" style="color:red"></i></p>
                                    <p><span>{{item.produce_flavor}}</span></p>
                              </div>
                              <div><p>¥ {{item.produce_price1}}/个</p><p style="font-size:12px" class="iconfont iconjia" @click="goToCart($event,item)"> 加入购物车</p></div>
                          </div>
                      </li>
                  </ul>
          </div>
          <div class="classify-body-footer">{{footer_context}}</div>
      </div>
    <footers></footers>
</div>
</template>
<script>
export default {
       data(){
           return{
             list2:['不限','儿童','聚会','生日','下午茶','婚礼','情人节','母亲节','节庆'],
             list3:['不限','鲜果','慕斯','巧克力','冰激凌','奶油','芝士','咖啡'],
             list5:[],
             isOn:0,
             on:0,
             count:0,
             sun:0,
             name1:'不限',
             name2:'不限',
             footer_context:'上拉加载更多',
             user_id:0,
             headerIndex:1
           }
       },
      methods:{
          //获取文档高度
          getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　　　if(document.body){
      　　　　　　bodyScrollTop = document.body.scrollTop;
      　　　　}
      　　　　if(document.documentElement){
      　　　　　　documentScrollTop = document.documentElement.scrollTop;
      　　　　}
      　　　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　　　return scrollTop;
      　　},

      　　//可视窗口高度
      　　getWindowHeight(){
      　　var windowHeight =document.documentElement.clientHeight || document.body.clientHeight;
      　　　　return windowHeight;
      　　},
      
      　　//滚动条高度
      　　getScrollHeight(){
      　　　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　　　if(document.body){
      　　　　　　bodyScrollHeight = document.body.scrollHeight;
      　　　　}　　
      　　　　if(document.documentElement){
      　　　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　　　}
      　　　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight :    documentScrollHeight;
      　　　　return scrollHeight;
      　　},
        
          //封装的无限下拉分页接口
            fun(){
                  this.count++;
                  this.axios.get('/case/classify',{params:{count:this.count}}).then(res=>{
                    let obj=res.data.b;
                    this.sun=res.data.sun;
                    //给获取的图片添加前缀，并将其放到定义好的数组中去
                    obj.forEach(item=>{
                          if(item.image1!=null){
                                  item.image1=require('../assets/image/'+item.image1);
                            }
                          this.list5.push(item);
                    });
              });
              //判断是否是最后一页，如果是就改变底部的内容
                if(this.count==this.sun){
                    this.footer_context="已经到底了，别再下拉啦";
                  }
            },
          fun1(){
            //判断条件，如果符合就调用那个接口
              if(this.name1=='不限' && this.name2=='不限'){
                    this.count=0;
                    this.list5=[];
                    this.fun();
                    window.addEventListener('scroll',this.scrollFun);
              }else{
                   this.axios.get('/case/classify1',{params:{name1:this.name1,name2:this.name2}}).then(res=>{
                    let obj=res.data;
                    this.list5=[];
                    obj.forEach(item=>{
                          if(item.image1!=null){
                                  item.image1=require('../assets/image/'+item.image1);
                            }
                          this.list5.push(item);
                    });
                    this.footer_context="已经到底了，别再下拉啦";
                    window.removeEventListener('scroll',this.scrollFun);
                  })
                }
           },
           clickLI1(val,e){
             this.isOn=val;
             this.name1=e.target.innerHTML;
             this.fun1();
          },
          clickLI2(val,e){
             this.on=val;
             this.name2=e.target.innerHTML;
             this.fun1();
          },
         
      //然后在scrollFun函数中判断:
      　　scrollFun(){
      　　　　if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()){
      //文档高度+可视窗口高度=滚动条高度

                  if(this.count>0 && this.count<=this.sun){
                    //调用无限下拉接口
      　　         this.fun();
                  }
      　　   }
          },
        //点击跳转到该商品详情页
          goToDetail(e,val){
            this.$router.push(`/detail?produce_id=${val}`);
          },
          goToCart(e,val){
            e.stopPropagation();
             let user_id=sessionStorage.getItem('$user_id');
             if(user_id==null){
               this.$router.push(`/login`);
             }else{
               let x=val.image1.indexOf('.');
               let b=val.image1.slice(x,x+9);
               val.image1=val.image1.replace(b,'');
               let y=val.image1.lastIndexOf('/');
               val.image1=val.image1.slice(y+1);
               console.log(val.image1);
               this.axios.post('/case/addCart',`user_id=${this.user_id}&product_id=${val.produce_id}&count=${1}&specs=${val.specs1}&produce_name=${val.produce_name}&produce_price=${val.produce_price1}&image1=${val.image1}`).then(res=>{
                       if(res.data==1){
                             this.$router.push(`/cart?produce_id=${val}`);
                       }
               });
              
             }
          }
    },
     mounted(){
        //获取用户ID
        this.user_id=sessionStorage.getItem('$user_id');
          //设置事件监听
          window.addEventListener('scroll',this.scrollFun);
          //页面挂载完后第一次调用封装好的下拉接口
             this.fun();
      }
}
</script>
<style>
  html{
    overflow: scroll;
  }
  body,.classify-body div,.classify-body ul,.classify-body li,.classify-body p{
      box-sizing: border-box;
  }

  .classify-body li{
    cursor: pointer;
  }
  .classify-body{
    margin: 150px auto 50px auto;
    width:70%;
    padding: 30px;
    background-color: #F7F8F8;

  }
  .classify-body-header{
    width:100%;
    height: 174px;
    padding: 15px 28px;
    background-color: #ffffff;
  }
  .classify-body-header>ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
  }
  .classify-body-header>ul>li{
     width: 100%;
     height: 36px;
  }
  .classify-body-header-contents1,
  .classify-body-header-contents2,
  .classify-body-header-contents3,
  .classify-body-header-contents4{
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #666666;
    line-height: 36px;
  }

   .classify-body-header-contents1>li,
   .classify-body-header-contents2>li,
  .classify-body-header-contents3>li,
  .classify-body-header-contents4>li{
     width:7% ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
     
  }
    .classify-body-header-contents1>li:nth-child(6){
    width: 11%;
  }
  .classify-body-header-contents1>li:nth-child(1),
  .classify-body-header-contents2>li:nth-child(1),
  .classify-body-header-contents3>li:nth-child(1),
  .classify-body-header-contents4>li:nth-child(1){
           width: 76px;
           text-align:left;
  }
  .on{
    color: #971a1e;
  }

  .classify-body-body{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin: 30px 0 5px 0;
    padding:0px 14px;
    background-color: #ffffff;
  }
  .classify-body-body>ul{
    width:100%;
    display: flex;
    flex-flow: row wrap;
  }
 .classify-body-body>ul>li{
   width:22%;
   height: 450px;
   margin:5px 10px;
   padding: 30px 14px 30px;
   transition: all 1s;
 }
 .classify-body-body-contents{
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
 }
 .classify-body-body>ul>li:hover{
   background-color: #fcedef;
 }
  .classify-body-body-contents:hover img{
    transform: scale(1.05);
 }
 .classify-body-body-contents>div:nth-child(1){
   width: 100%;
   height: 70%;
   overflow: hidden;
 }
 .classify-body-body-contents>div:nth-child(1)>img{
   width: 100%;
   height: 100%;
   transition: all 1s;
 }
 .classify-body-body-contents>div:nth-child(2)>p{
   font-size: 14px;
   text-align: left;
   color: #595757;
 }
 .classify-body-body-contents>div:nth-child(2)>p:nth-child(2){
   margin-top: 5px;
 }
  .classify-body-body-contents>div:nth-child(2)>p:nth-child(2)>span{
   display: inline-block;
   color:#d5bfa7;
   padding:2px;
   font-size: 12px;
   border: 1px solid #d5bfa7;
   padding: 0 6px 0 8px;
   border-radius: 10px;
  }

  .classify-body-body-contents>div:nth-child(2){
   width: 100%;
   height: 14%;
 }
  .classify-body-body-contents>div:nth-child(3){
   width: 100%;
   height: 14%;
 }
 .classify-body-body-contents>div:nth-child(3)>p{
   font-size: 18px;
   text-align: left;
    margin-bottom: 5px;
   color: #971a1e;
 }
 .classify-body-body1{
    width: 100%;
    height: 300px;
    margin: 30px 0 5px 0;
    padding:0px 14px;
    background-color: #ffffff;
 }
 .classify-body-body1>p{
   font-size: 50px;
   margin-top: 100px;
   color: pink;
 }
 .classify-body-body1>span{
   font-size: 12px;
   color: #595757;
 }
  .classify-body-footer{
    width:100%;
    height: 38px;
    font-size: 12px;
    color: #595757;
    background-color: #ffffff;
    padding: 20px 0 0 0;
  }
</style>

