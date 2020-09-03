<template>
    <div>
       <div class="add-header">
           <h1>添加商品 <button @click="add" :disabled='isShow1'>添加商品</button>
                        <button @click="goTo" :disabled="isShow2">前往添加详情页图片</button></h1>
       </div>
       <div class="add-body">
            <div>商品名称：<input type="text" v-model="name"></div>
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
            <div>商品分类页图：<input type="file" @change='cakeImg1($event)'></div>
            <div>商品详情页轮换图：<input type="file" @change='cakeImg2($event)'></div>
            <div>商品详情页轮换图：<input type="file" @change='cakeImg3($event)'></div>
            <div>商品详情页轮换图：<input type="file" @change='cakeImg4($event)'></div>
            <div>商品详情页轮换图：<input type="file" @change='cakeImg5($event)'></div>
       </div>
    </div>
</template>
<script>
export default {
     data(){
         return{
             id:0,
             isShow1:false,
             isShow2:true,
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
             image1:'',
             image2:'',
             image3:'',
             image4:'',
             image5:'',
         }
     },
     methods:{
          cakeImg1(e){
             let image=e.target.value;
             let x=image.lastIndexOf('\\');
             this.image1=image.slice(x+1);
          },
          cakeImg2(e){
             let image=e.target.value;
             let x=image.lastIndexOf('\\');
             this.image2=image.slice(x+1);
          },
          cakeImg3(e){
             let image=e.target.value;
             let x=image.lastIndexOf('\\');
             this.image3=image.slice(x+1);
          },
          cakeImg4(e){
             let image=e.target.value;
             let x=image.lastIndexOf('\\');
             this.image4=image.slice(x+1);
          },
          cakeImg5(e){
             let image=e.target.value;
             let x=image.lastIndexOf('\\');
             this.image5=image.slice(x+1);
          },
          add(){
             this.axios.post('/server/addCake',`produce_name=${this.name}&produce_desc=${this.desc}&produce_discount=${this.discount}&produce_theme=${this.theme}&produce_flavor=${this.flavor}&specs1=${this.specs1}&produce_price1=${this.price1}&specs2=${this.specs2}&produce_price2=${this.price2}&specs3=${this.specs3}&produce_price3=${this.price3}&image1=${this.image1}&image2=${this.image2}&image3=${this.image3}&image4=${this.image4}&image5=${this.image5}`).then(res=>{
                 if(res.data.a==1){
                     alert('添加成功');
                    this.isShow1=true;
                    this.isShow2=false;
                 }
                 this.id=res.data.b[0].produce_id;
                 console.log(this.id);
             });
          },
          goTo(){
             this.$store.state.id=this.id;
             this.$store.commit('changeState3');
          },                     
     },
     mounted(){
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
</style>