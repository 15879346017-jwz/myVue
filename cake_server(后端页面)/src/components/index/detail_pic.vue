<template>
    <div>
       <div class="detail-header">
           <h1>商品详情页图片操作---<span>{{m}}</span>
                <button @click='change' v-if="isTrue==false">商品详情页图片修改</button>
                <button @click='add' v-else>商品详情页图片添加</button>
           </h1>
       </div>
       <div class="detail-body">
            <div>
                 <div v-for="(item,index) of list1" :key="index">{{item}}</div>
            </div>
            <div>
                 <div v-for="(item,index) of list2" :key="index"><img :src="item" alt="" >
                    <span v-if="item=='当前图片为空，请前往插入图片'">{{item}}</span>   
                    <input type="file" :disabled='index<i' @change="picName($event,index)">
                 </div>   
            </div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list1:['详情页轮换图1/详情页轮换图2','详情页轮换图3/详情页轮换图4','详情页介绍图1/详情页介绍图2','详情页介绍图3/详情页介绍图4','详情页介绍图5/详情页介绍图6'],
            list2:[],
            id:1,
            m:'',
            picNames:[],
            isTrue:false,
            i:0,
            dimage1:'',
            dimage2:'',
            dimage3:'',
            dimage4:'',
            dimage5:'',
            dimage6:'',
           }
    },
    methods:{
        picName(e,i){
            let x=e.target.value.lastIndexOf('\\');
            let values=e.target.value.slice(x+1);
            this.picNames[i]=values;
            if(i==4){this.dimage1=values;};
            if(i==5){this.dimage2=values;};
            if(i==6){this.dimage3=values;};
            if(i==7){this.dimage4=values;};
            if(i==8){this.dimage5=values;};
            if(i==9){this.dimage6=values;};
        },
        //修改详情页图片接口
        change(){
            this.axios.post('/server/change',`id=${this.id}&image2=${this.picNames[0]}&image3=${this.picNames[1]}&image4=${this.picNames[2]}&image5=${this.picNames[3]}&dimage1=${this.picNames[4]}&dimage2=${this.picNames[5]}&dimage3=${this.picNames[6]}&dimage4=${this.picNames[7]}&dimage5=${this.picNames[8]}&dimage6=${this.picNames[9]}`).then(res=>{
                //修改成功后，当前页面刷新
                this.$router.go(0);
            })
            
        },
        add(){
            this.axios.post('/server/add1',`produce_id=${this.id}&dimage1=${this.dimage1}&dimage2=${this.dimage2}&dimage3=${this.dimage3}&dimage4=${this.dimage4}&dimage5=${this.dimage5}&dimage6=${this.dimage6}`).then(res=>{
                if(res.data==1){
                    alert('添加成功');
                    this.$router.go(0);
                }
            })
            },
    },
    mounted(){
        this.id=this.$store.state.id;
        this.axios.get('/server/detailPic',{params:{id:this.id}}).then(res=>{
            let a=res.data.a;
            this.m=a[0].produce_name;
            let b=res.data.b;
            if(b.length!=0){
                this.isTrue=false;    
                var obj=[];
                obj.push(a[0].image2);
                obj.push(a[0].image3);
                obj.push(a[0].image4);
                obj.push(a[0].image5);
                obj.push(b[0].dimage1);
                obj.push(b[0].dimage2);
                obj.push(b[0].dimage3);
                obj.push(b[0].dimage4);
                obj.push(b[0].dimage5);
                obj.push(b[0].dimage6);
                obj.forEach(item=>{
                if(item==''){
                    this.picNames.push(item); 
                    item='当前图片为空，请前往插入图片'; 
                    }
                else{
                    this.picNames.push(item);  
                    item=require('../../assets/image/'+item);
                    }
                this.list2.push(item);        
                })
             }else{
                 this.isTrue=true;
                 this.i=4;
                 for(var i=0;i<12;i++){
                     this.list2.push('当前图片为空，请前往插入图片')
                 }
             }
           })
        }
}
</script>
<style scoped>
    .detail-header{
        height: 60px;
        border-bottom: 3px solid #E6E9ED;
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .detail-header>h1>span{
        color: #FF00FF ;
    }
    .detail-header>h1{
        font-size: 26px;
        color: #7387B4;
        line-height: 60px;
        padding-left: 10px;
    }
    .detail-header>h1>button{
       float: right;
       width: 150px;
       height:30px;
       outline: none;
       border: 0;
       border-radius:5px ;
       cursor: pointer;
       background-color:#87CEFA;
    }
    .detail-body>div:first-child,.detail-body>div:last-child{
        display: flex;
        justify-content: space-around;
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .detail-body>div:first-child>div{
        width: 20%;
        height: 20px;
        text-align: center;
        color:#7387B4;
    }
    .detail-body>div:last-child{
        flex-direction: column;
        flex-wrap: wrap;
        height: 680px;
    }
    .detail-body>div:last-child>div{
        width: 20%;
        height: 330px;
        position: relative;
    }
    .detail-body>div:last-child>div>img{
        width: 300px;
        height: 300px;
    }
    .detail-body>div:last-child>div>span{
        display: block;
        margin-top:130px;
        text-align: center;

    }
    .detail-body>div:last-child>div>input{
       position: absolute;
       bottom: 0;
       right: 0px;
    }
</style>