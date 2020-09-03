<template>
    <div class="user">
         <h1 class="iconfont icon-yonghu">用户管理----用户信息列表</h1>
         <div class="user-body">
             <ul>
                 <li v-for="(item,index) of list" :key="index">{{item}}</li>
             </ul>
             <div>
                <ul v-for='(item,index) of list2' :key="index">
                    <li>{{item.user_id}}</li>
                    <li>{{item.user_name}}</li>
                    <li>{{item.user_pwd}}</li>
                    <li>{{item.iphone}}</li>
                    <li>{{item.email}}</li>
                    <li>{{item.nickname}}</li>
                    <li><img :src="item.user_avatar" alt=""></li>
                    <li>{{item.user_gender}}</li>
                    <li style="font-size:13px;">{{item.user_addre}}</li>
                </ul>      
             </div> 
             <paggings :sum='sum' @counts='child'></paggings>
         </div>
    </div>
</template>
<script>
import paggings from '../pagging.vue'
export default {
    components:{
        paggings
    },
    data(){
        return{
             list:['用户ID','账号','密码','手机号','邮箱','用户昵称','用户头像','用户性别','用户地址'],
             sum:0,
             count:1,
             list2:[]
         }
    },
    methods:{
        child(val){
            this.count=val;
            this.fun(this.count);
        },
        fun(value){
             let userCount=value;
             this.list2=[];
             this.axios.get('/server/user',{params:{count:userCount}}).then(res=>{
              this.sum=res.data.sum;
              let obj=res.data.b;
              console.log(obj);
              obj.forEach(item=>{
                  if(item.user_avatar!=''){
                      item.user_avatar=require('../../assets/userImg/'+item.user_avatar);
                  }
                  item.user_gender==0 ? item.user_gender='女' : item.user_gender==1 ? item.user_gender='男' : item.user_gender='未知';
                  this.list2.push(item);
              })
         });
        }
    },
    mounted(){
         this.fun(1);
    }
}
</script>
<style scoped>
    .user>h1,.user-body{
        width: 98%;
        margin: 10px 1%;
    }
    .user>h1{
        font-size: 26px;
        color: #73879C;
        padding: 10px 0 20px 0px;
        border-bottom: 1px solid #E6E9ED;
    }
    .user-body{
       height: 700px;
    }
    .user-body>ul:first-child{
        width: 100%;
        display: flex;
        margin-top: 20px;
        flex-direction: columns;
        justify-content: space-between;
    }
    .user-body>ul:first-child>li{
        width: 11%;
        font-size: 16px;
        color: #73879C;
    }
     .user-body>div:nth-child(2){
         width: 100%;
         height: 600px;
     }
     .user-body>div:nth-child(2)>ul{
         display: flex;
         flex-direction: columns;
        justify-content: space-between;
     }
     .user-body>div:nth-child(2)>ul>li{
         width: 11%;
         font-size: 16px;
        color: #73879C;
        height: 120px;
        line-height: 120px;
     }
     .user-body>div:nth-child(2)>ul>li:nth-child(7)>img{
         width: 100px;
         height: 100px;
     }
</style>