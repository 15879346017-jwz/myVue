<template>
    <div>
        <div class="order-header">
            <h1 class="iconfont icon-dingdan">订单管理</h1>
        </div>
        <div class="order-body">
            <ul @click="isShow($event)" >
                <li v-for="(item,index) of list1" :key="index" :class="{on:index==myindex}">{{item}}</li>
            </ul>
            <div>
                <ul>
                    <li v-for="(item,index) of list2" :key="index">{{item}}</li>
                </ul>
                <div v-for="(item,index) of list3" :key="index" >
                   <div>
                      <span>订单ID:{{item.order_id}}</span>
                      <span>下单时间:{{item.order_time}}</span>
                   </div>
                   <ul>
                       <li>
                          <div>
                             <img :src="item.image1" alt="">
                          </div>
                          <div>
                             <h1 style="color:#333333;">{{item.produce_name}}</h1>
                             <p style="font-size:12px;margin:10px 0;">商品尺寸:{{item.order_size}}</p>
                             <span>×{{item.count}}</span>
                          </div>
                       </li>
                       <li style="color:#FF8606;">¥{{(item.order_price).toFixed(2)}}</li>
                       <li style="color:#409EFF;">{{item.order_state}}</li>
                       <li style="color:#606266;">{{item.order_name}}</li>
                       <li style="color:#606266;">{{item.order_add}}</li>
                       <li style="color:#606266;">{{item.order_phone}}</li>
                       <li style="color:#FF8606;">{{item.produce_card}}</li>
                       <li v-if="item.order_state=='已付款'"><button @click="sendGood(item.order_id)">发货</button></li>
                       <li v-else-if="item.order_state=='已发货'">待收货</li>
                       <li v-else-if="item.order_state=='已收货'"><button @click="overOrder(item.order_id)">订单完成</button></li>
                       <li v-else-if="item.order_state=='完成'">完成</li>
                   </ul>   
                </div>
                <p class="order-body-footer">
                    <pagging :sum='sum' @counts='counts'></pagging>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import pagging from '../pagging.vue'
export default {
    components:{
        pagging
    },
    data(){
        return{
            list1:['全部订单','已付款','已发货','已收货','已完成'],
            list2:['订单信息','实付款','订单状态','收货人姓名','收货地址','手机号','生日牌','操作'],
            list3:[],
            sum:0,
            count:1,
            order_state:0,
            myindex:0,
        }
    },
    methods:{
        fun(val){
            this.list3=[];
            //  this.count=Number(val);
             this.axios.get('/server/order',{params:{count:val}}).then(res=>{
             let obj=res.data.b;
             this.sum=res.data.sum;
             obj.forEach(item=>{
                 if(item.image1!=''){
                     item.image1=require('../../assets/image/'+item.image1);
                 }
                 if(item.order_state==0){item.order_state='已付款'};
                 if(item.order_state==1){item.order_state='已发货'};
                 if(item.order_state==2){item.order_state='已收货'};
                 if(item.order_state==3){item.order_state='完成'};
                 this.list3.push(item);
             })
         })
        },
        counts(counts){
            if(this.myindex==0){
            this.fun(counts);
            }else{
                this.getOrderState(this.myindex-1,counts);
            }
        },
        orderState(id,order_state){
            console.log(id,order_state);
            this.axios.post('/server/changeState',`order_id=${id}&order_state=${order_state}`).then(res=>{
                 if(res.data==1){
                     this.$router.go(0);
                 }
            })
        },
        getOrderState(val,count){
            this.axios.get('/server/getOrderState',{params:{order_state:val,count:count}}).then(res=>{
                if(res.data==0){this.list3=[];}
            else{
             this.list3=[];
             let obj=res.data.b;
             this.sum=res.data.sum;
             obj.forEach(item=>{
                 if(item.image1!=''){
                     item.image1=require('../../assets/image/'+item.image1);
                 }
                 if(item.order_state==0){item.order_state='已付款'};
                 if(item.order_state==1){item.order_state='已发货'};
                 if(item.order_state==2){item.order_state='已收货'};
                 if(item.order_state==3){item.order_state='完成'};
                 this.list3.push(item);
                    })
                    }
                })
        },
        sendGood(id){
            this.orderState(id,1);
        },
        overOrder(id){
            this.orderState(id,3);
        },
        isShow(e){
          if(e.target.nodeName=='LI'){
              //清空所有li的样式
              for(let i=0;i<e.currentTarget.children.length;i++){
                    e.currentTarget.children[i].classList.remove('on');
              };
               if(e.target.innerHTML=='全部订单'){
                   this.fun(this.count);
                //    e.target.classList.add('on');
                this.myindex=0;
               };
              if(e.target.innerHTML=='已付款'){
                   this.getOrderState(0,this.count);
                //    e.target.classList.add('on');
                this.myindex=1;
              };
              if(e.target.innerHTML=='已发货'){
                   this.getOrderState(1,this.count);
                //    e.target.classList.add('on');
                this.myindex=2;
              };
              if(e.target.innerHTML=='已收货'){
                   this.getOrderState(2,this.count);
                //    e.target.classList.add('on');
                this.myindex=3;
              };
              if(e.target.innerHTML=='已完成'){
                   this.getOrderState(3,this.count);
                //    e.target.classList.add('on');
                this.myindex=4;
              };
          }
        },
    },
    mounted(){
      this.fun(1);
    },
}
</script>
<style scoped>
    .order-header{
        height: 60px;
        border-bottom: 3px solid #E6E9ED;
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .order-header>h1{
        font-size: 26px;
        color: #7387B4;
        line-height: 60px;
        padding-left: 10px;
    }
    .order-body{
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .order-body>ul,.order-body>div>ul,.order-body>div>div>ul{
        display: flex;
        flex-direction: row;
        cursor: pointer;
        transition: all 1s;
    }
    .order-body>ul>li,.on{
        font-weight: 700;
        font-size: 14px;
    }
    .order-body>ul>li{
        padding:10px 0;
        margin-right: 20px;
        color: #303133;
    }
     .on{
        color: #409EFF;
        border-bottom: 2px solid #409EFF;
    }
    .order-body>div{
        width: 100%;
        height: 650px;
        margin-top: 10px;
        border: 1px solid #EBEEF5;
        position: relative;
    }
    .order-body>div>ul{
       justify-content: space-between;
    }
    .order-body>div>ul>li{
        width: 13%;
        padding: 10px 0;
        text-align: center;
        color: #909399;
    }
    .order-body>div>div>div{
        width: 100%;
        background-color: #F5F7FA;
        height: 40px;
        font-size: 14px;
        color: #909399;
        line-height: 40px;
    }
    .order-body>div>div>div>span:first-child{
        margin-left: 20px;
        color: #409EFF;
    }
    .order-body>div>div>div>span:last-child{
        margin-left: 30px;
    }
    .order-body>div>div>ul>li{
        width: 13%;
        height: 80px;
        text-align: center;
        color: #909399;
        
    }
    .order-body>div>div>ul>li:not(:first-child){
        line-height: 80px;
    }
    .order-body>div>div>ul>li:nth-child(1)>div{
        float: left;
        margin-left: 10px;
    }
    .order-body>div>div>ul>li:nth-child(1)>div>img{
        width: 80px;
        height: 80px;
    }
    .order-body>div>div>ul>li:nth-child(1)>div:last-child{
        margin:10px 0 0 10px;
    }
    .order-body>div>div>ul>li:last-child>button{
        width:60%;
        height: 25px;
        margin-top: 6px;
        cursor: pointer;
        background-color: #409EFF;
        color: #fff;
        outline: none;
        border: 0;
        border-radius: 4px;
    }
    .order-body-footer{
        position: absolute;
        bottom: 30px;
        right:50%;
    }
</style>