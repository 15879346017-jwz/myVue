<template>
    <div>
        <div class="lunbo-header">
           <h1 class="iconfont icon-lunbotufang">首页轮播操作</h1>
       </div>
       <div class="lunbo-body">
             <div v-for="(item,index) of list" :key="index">
                 <ul>
                     <li>图片ID  :<input type="number" v-model="item.picture_id" disabled></li>
                     <li>图片标题:<input type="text" v-model="item.pic_title"></li>
                     <li>图片链接:<input type="text" v-model="item.pic_href"></li>
                     <li>
                          <div>
                              <div><img :src="item.pic_img" alt=""></div>
                              <div>轮播图片:<input type="file" @change="picImg($event)"></div>
                          </div>
                     </li>
                 </ul>
                 <div class="iconfont icon-BItubiao-" @click="lunboDelete(item.picture_id)"></div>
                 <div class="iconfont icon-xiugai" @click="lunboChange(item)"></div>
             </div>
             <div>
                 <ul>
                     <li>图片ID  :<input type="number" v-model="picture_id" disabled></li>
                     <li>图片标题:<input type="text" v-model="pic_title"></li>
                     <li>图片链接:<input type="text" v-model="pic_href"></li>
                     <li>
                          <div>
                              <div v-if="pic_img==''"><span>请插入图片</span></div>
                              <div v-else><img :src="require(`../../assets/image/${pic_img}`)" alt=""></div>
                              <div>轮播图片:<input type="file" @change="picImg1($event)"></div>
                          </div>
                     </li>
                 </ul>
                 <div class="iconfont icon-mstianjia" @click="lunboAdd"></div>
             </div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           picture_id:'',
           pic_img:'',
           pic_title:'',
           pic_href:'',
           pic_imgChange:'',
           pic_imgs:'',
           list:[],
        }
    },
    methods:{
        picImg(e){
             let x=e.target.value.lastIndexOf('\\');
             this.pic_imgChange=e.target.value.slice(x+1);
        },
        //修改首页轮播信息
        lunboChange(val){
            this.pic_imgs=this.pic_imgChange;
            this.axios.post('/server/lunboChange',`picture_id=${val.picture_id}&pic_img=${this.pic_imgs}&pic_title=${val.pic_title}&pic_href=${val.pic_href}`).then(res=>{
                if(res.data==1){
                    this.$router.go(0);
                }
            })
        },
        //删除首页轮播信息
        lunboDelete(id){
           this.axios.get('/server/lunboDelete',{params:{id:id}}).then(res=>{
               if(res.data==1){
                   this.$router.go(0);
               }
           })
        },
        picImg1(e){
             let x=e.target.value.lastIndexOf('\\');
             this.pic_img=e.target.value.slice(x+1);
        },
        //增加首页轮播信息
        lunboAdd(){
            this.axios.post('/server/lunbo1',`pic_title=${this.pic_title}&pic_href=${this.pic_href}&pic_img=${this.pic_img}`).then(res=>{
                if(res.data==1){
                    this.$router.go(0);
                }
            });
        },
    },
    mounted(){
        //获取首页轮播信息
        this.axios.get('/server/lunbo').then(res=>{
               let obj=res.data;
               console.log(obj)
               obj.forEach(item=> {
                   if(item.pic_img!=''){
                       item.pic_img=require('../../assets/img/'+item.pic_img);
                   }
                   this.list.push(item);
               });
        });
    }
}
</script>
<style scoped>
    .lunbo-header{
        height: 60px;
        border-bottom: 3px solid #E6E9ED;
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .lunbo-header>h1{
        font-size: 26px;
        color: #7387B4;
        line-height: 60px;
        padding-left: 10px;
    }
    .lunbo-body,.lunbo-body>div{
        width: 98%;
        margin: 10px 1% 10px 1%;
        height: 650px;
        border: 1px solid #CCCCCC;
    }
    .lunbo-body{
        overflow-y: scroll;
    }
    .lunbo-body>div{
        position: relative;
    }
    .lunbo-body>div,.lunbo-body>div>ul{
        height: 200px;
    }
    .lunbo-body>div>ul{
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-flow: column wrap;
    }
    .lunbo-body>div>ul>li:not(:last-child){
        width: 49%;
        height: 33%;
        color: #7387B4;
        line-height: 66px;
    }
    .lunbo-body>div>ul>li>input{
        width: 90%;
        height: 25px;
        outline: none;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .lunbo-body>div>ul>li:last-child{
        width: 50%;
        height: 200px;
    }
    .lunbo-body>div>ul>li:last-child>div{
        width:300px;
        height: 200px;
        margin: 0 auto;
    }
    .lunbo-body>div>ul>li:last-child>div>div:first-child,
    .lunbo-body>div>ul>li:last-child>div>div:first-child>img{
        width: 300px;
        height: 175px;
    }
    .lunbo-body>div>ul>li:last-child>div>div:last-child{
        color: #7387B4;
    }
    .lunbo-body>div>ul>li:last-child>div>div:last-child>input{
          width: 200px;
    }
    .lunbo-body>div>div:nth-child(2),.lunbo-body>div>div:nth-child(3){
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .lunbo-body>div>div:nth-child(3){
        top: 30px;
    }
</style>