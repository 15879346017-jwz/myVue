<template>
    <div>
       <div class="add-header">
           <h1>修改商品 <button @click="change1">修改</button></h1>
       </div>
       <div class="add-body">
            <div>商品ID：<input type="text" v-model="id" disabled></div>
            <div>商品名：<input type="text" v-model="name"></div>
            <div>商品描述：<textarea cols="30" rows="5" v-model="desc"></textarea></div>
            <div>商品折扣：<input type="text" v-model="discount"></div>
            <div>商品主题：<select v-model="theme">
                             <option value="无">无</option>
                             <option value="儿童">儿童</option>
                             <option value="聚会">聚会</option>
                             <option value="生日">生日</option>
                             <option value="下午茶">下午茶</option>
                             <option value="婚礼">婚礼</option>
                             <option value="情人节">情人节</option>
                             <option value="母亲节">母亲节</option>
                             <option value="节庆">节庆</option>
                          </select>
            </div>
            <div>商品口味：<input type="text" v-model="flavor"><br><br>
                       <span>请选择‘无’,‘鲜果’,‘慕斯’,‘巧克力’,‘冰激凌’,‘奶油’,‘芝士’,‘咖啡’及其组合</span>
            </div>
            <div>商品尺寸1：<input type="text" v-model="specs1"></div>
            <div>商品价格1：<input type="text" v-model="price1"></div>
            <div>商品尺寸2：<input type="text" v-model="specs2"></div>
            <div>商品价格2：<input type="text" v-model="price2"></div>
            <div>商品尺寸3：<input type="text" v-model="specs3"></div>
            <div>商品价格3：<input type="text" v-model="price3"></div>
            <div>商品分类页图：<input type="file" @change='cakePic($event)'>
                 <img :src="image" alt=""></div>
       </div>
    </div>
</template>
<script>
export default {
     data(){
         return{
             id:1,
             name:'',
             desc:'',
             discount:'',
             theme:'',
             flavor:'',
             specs1:'',
             price1:'',
             specs2:'',
             price2:'',
             specs3:'',
             price3:'',
             image:'',
             image1:'',
             pic:'',
         }
     },
     methods:{
         cakePic(e){
            this.pic=e.target.value;
            let x=this.pic.lastIndexOf('\\');
            this.image1=this.pic.slice(x+1);
         },
         change1(){
            this.axios.post('/server/changeCake',`produce_id=${this.id}&produce_name=${this.name}&produce_desc=${this.desc}&produce_discount=${this.discount}&produce_theme=${this.theme}&produce_flavor=${this.flavor}&specs1=${this.specs1}&produce_price1=${this.price1}&specs2=${this.specs2}&produce_price2=${this.price2}&specs3=${this.specs3}&produce_price3=${this.price3}&image1=${this.image1}`).then(res=>{
            if(res.data==1){
             this.$router.go(0);
             alert('修改成功');
            }
         })
         }
     },
     mounted(){
            this.id=this.$store.state.id;
            this.axios.get('/server/changeCake1',{params:{id:this.id}}).then(res=>{
                let list=res.data;
                this.name=list[0].produce_name;
                this.desc=list[0].produce_desc;
                this.discount=list[0].produce_discount;
                this.theme=list[0].produce_theme;
                this.flavor=list[0].produce_flavor;
                this.specs1=list[0].specs1;
                this.price1=list[0].produce_price1;
                this.specs2=list[0].specs2;
                this.price2=list[0].produce_price2;
                this.specs3=list[0].specs3;
                this.price3=list[0].produce_price3;
                this.image=require('../../assets/image/'+list[0].image1);
                if(this.pic==''){
                this.image1=list[0].image1;
                }
            });
     }
}
</script>
<style scoped>
       .add-header{
        height: 60px;
        border-bottom: 3px solid #E6E9ED;
        width: 98%;
        margin: 10px 1% 10px 1%;
    }
    .add-header>h1{
        font-size: 26px;
        color: #7387B4;
        line-height: 60px;
        padding-left: 10px;
    }
    .add-header>h1>button{
        outline: none;
        height: 30px;
        width: 150px;
        border: 0;
        border-radius: 5px;
        background-color: #87CEFA;
        float: right;
    }
    .add-body{
       width: 98%;
       height: 700px;
       margin: 10px 1% 10px 1%;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-around;
    }
    .add-body>div:not(:nth-child(13)),.add-body>div:nth-child(13){
        width: 33%;
        height: 115px;
        font-size: 16px;
        color: #7387B4;
    }
    .add-body>div:not(:nth-child(13))>input{
        width: 300px;
        height: 30px;
        padding-left: 10px;
        outline: none;
    }
    .add-body>div>textarea,.add-body>div>select{
        outline: none;
    }
    .add-body>div:nth-child(13){
        height: 400px;
    }
    .add-body>div:nth-child(13)>img{
        width: 300px;
        height: 300px;
    }
</style>