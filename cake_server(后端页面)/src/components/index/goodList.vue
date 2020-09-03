<template>
    <div class="goodList">
        <h1>商品管理----商品列表</h1>
        <div class="goodList-search">
            <input type="text" placeholder="请输入搜索关键字">
            <span class="iconfont icon-icon161603"></span>
        </div>
        <div class="goodList-body">
             <ul>
               <li v-for="(item,index) of list" :key="index">{{item}}</li>
             </ul>
             <div v-for="(item,index) of cakeDatas" :key="index">
                <div>{{item.produce_id}}</div>
                <div>{{item.produce_name}}</div>
                <div><span>{{item.produce_desc}}</span></div>
                <div v-if="!item.discount">100%</div>
                <div v-else>{{item.discount}}</div>
                <div>{{item.produce_theme}}</div>
                <div>{{item.produce_flavor}}</div>
                <div>
                   <div>
                        <p>{{item.specs1}}</p>
                        <p>{{item.specs2}}</p>
                        <p>{{item.specs3}}</p>
                   </div>
                </div>
                <div>
                     <div>
                       <p>¥{{(item.produce_price1).toFixed(2)}}</p>
                       <p>¥{{(item.produce_price2).toFixed(2)}}</p>
                       <p>¥{{(item.produce_price3).toFixed(2)}}</p>
                     </div>
                </div>
                <div>
                    <img :src="item.image1" alt="">
                </div>
                <div>
                     <button @click='lookPic(item.produce_id)'>详情页图片浏览</button>
                     <button @click="change(item.produce_id)">修改商品</button>
                     <button @click="deletes(item.produce_id)">删除商品</button> 
                </div>
             </div>
             <ul @click="clickLI($event)">
                <li>首页</li>
                <li>上一页</li>
                <li v-for="(v,i) of list1" :key="i" @click="clickLi($event)" :class="{on:index==i}">{{v}}</li>
                <li>下一页</li>
                <li>尾页</li>
             </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:['编号','商品名称','商品描述','商品折扣','商品主题','商品口味','商品尺寸','商品价格','分类页图','操作'],
            list1:0,
            cakeDatas:[],
            size:[],
            price:[],
            count:1,
            index:0,
        }
    },
    methods:{
        fun(val){
            //传过来的值为字符串，需要将其转为数值型
           this.count=Number(val);
           this.axios.get('/server/goodList1',{params:{count:this.count}}).then(res=>{
                this.cakeDatas=[];
               let myDatas=res.data;
                myDatas.forEach(items=>{
                items.image1=require(`../../assets/image/${items.image1}`);
                this.cakeDatas.push(items);
             });
           });
          this.index=this.count-1;
        },
        clickLi(e){
           let a=e.target.innerHTML;
           this.fun(a);
        },
        clickLI(e){
            if(e.target.nodeName=='LI'){
                if(e.target.innerHTML=='首页'){
                    this.fun(1);
                };
                if(e.target.innerHTML=='尾页'){
                    this.fun(this.list1)
                };
                if(e.target.innerHTML=='上一页'){
                    this.count==1 ? this.count=1:this.count=this.count-1;
                    this.fun(this.count);
                };
                if(e.target.innerHTML=='下一页'){
                    this.count==this.list1 ? this.count=this.list1:this.count=this.count+1;
                    this.fun(this.count);
                }
            }
        },
        change(val){
            this.$store.state.id=val;
            this.$store.commit('changeState2');
        },
        lookPic(val){
            this.$store.state.id=val;
            this.$store.commit('changeState3');
        },
        deletes(i){
            this.axios.get('/server/cakeDelete',{params:{i:i}}).then(res=>{
                  let a=res.data;
                  if(a>0){
                  this.$router.go(0);
                  }
            })
        },
    },
    mounted(){
        this.axios.get('/server/goodList').then(res=>{
             let datas=res.data.sum;
             this.list1=datas;
             let myDatas=res.data.result;
             myDatas.forEach(items=>{
                items.image1=require(`../../assets/image/${items.image1}`);
                this.cakeDatas.push(items);
             });
        })
    }
}
</script>
<style scoped>
    div,p,ul,h1,h2,h3,h4,h5,h6,input,button{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .goodList>h1{
        width: 98%;
        margin: 10px 1%;
        font-size: 26px;
        color: #73879C;
        padding: 10px 0 20px 0px;
        border-bottom: 1px solid #E6E9ED;
    }
    .goodList-search{
        width: 98%;
        height: 40px;
        margin: 0 1%;
        margin-bottom:20px;
    }
    .goodList-search>input{
           width:30%;
           height: 30px;
           outline: none;
           float: right;
           padding-left: 10px;
           margin-right: 15px; 
           position: relative;
    }
    .goodList-search>span{
        position: absolute;
        right: 35px;
        top: 112px;
        font-size: 26px;
       color: #73879C;
    }
     .goodList-body{
        position: relative;
        height: 450px;
    }
    .goodList-body>ul:nth-of-type(1){
       width: 98%;
       margin: 0 1%;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       color:#73879C;
       border-bottom:1px solid #E6E9ED;
    }
    .goodList-body>ul:nth-of-type(1)>li{
        width: 10%;
        margin-bottom: 20px;
    }
     .goodList-body>ul:nth-of-type(1)>li{
         text-align: center;
     }
    .goodList-body>div{
       width: 98%;
       height: 100px;
       margin: 0 1%;
       display: flex;
       flex-direction: row;
    }
    .goodList-body>div>div:not(:last-child){
        width: 10%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 14px;
    } 
     .goodList-body>div>div:nth-child(3){
         line-height: 16px;
         vertical-align: middle;
         overflow: hidden;
     }
     .goodList-body>div>div:nth-child(7)>div,
     .goodList-body>div>div:nth-child(8)>div{
         line-height: 16px;
         margin-top: 30px;
     }
     .goodList-body>div>div:last-child{
         width: 10%;
         height: 100px;
     }
    .goodList-body>div>div:nth-child(9)>img{
        width: 100px;
        height: 100px;
    }
    .goodList-body>div>div:nth-child(10)>button{
        width:80%;
        height: 25px;
        margin-top: 6px;
        cursor: pointer;
        background-color: #87CEFA;
        color: #fff;
        outline: none;
        border: 0;
        border-radius: 4px;
    }
    .goodList-body>ul:nth-of-type(2){
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        bottom: -140px;
        left: 50%;
        margin-left: -400px;
    }
    .goodList-body>ul:nth-of-type(2)>li:hover{
        background-color: #87CEFA;
    }
    .goodList-body>ul:nth-of-type(2)>li{
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        padding: 5px;
        cursor: pointer;
        border: 1px solid #dddddd2d;
    }
    .on{
        background-color: #87CEFA;
    }
    .goodList-body>ul:nth-of-type(2)>li:not(:last-child){
        border-right: 0;
    }
    .goodList-body>ul:nth-of-type(2)>li:first-child{
        border-radius: 4px 0 0 4px;
    }
     .goodList-body>ul:nth-of-type(2)>li:last-child{
        border-radius: 0px 4px 4px 0px;
    }
</style>