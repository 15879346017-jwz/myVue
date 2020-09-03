<template>
    <div>
          <div class="index-header">
               <div v-for="(item,i) of list" :key="i">
                  <div>
                        <p><span :class="item.mystyle">{{item.title}}</span></p>
                        <p>{{item.num}}</p>
                        <p>较上月 <span :class="item.arrow">{{item.compare}}</span></p>
                  </div>
               </div>
          </div>
          <div class="index-body">
              <h2>实时访问量监控 <span>×10</span></h2>
              <canvas ref="canvas"></canvas>
          </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{title:'上架商品总数',num:24380,arrow:'iconfont icon-youjiantou',compare:'50%',mystyle:'iconfont icon-shangjia'},
                   {title:'注册用户总数',num:1965,arrow:'iconfont icon-arrow-down',compare:'50%',mystyle:'iconfont icon-yonghu'},
                  {title:'已完成订单总数',num:391,arrow:'iconfont icon-youjiantou',compare:'30%',mystyle:'iconfont icon-gouwuche'},
                  {title:'当日PC端PV量',num:14281,arrow:'iconfont icon-youjiantou',compare:'15%',mystyle:'iconfont icon-shuye'},
                    {title:'移动端PV量',num:29315,arrow:'iconfont icon-arrow-down',compare:'40%',mystyle:'iconfont icon-icon0'},
                    {title:'App总下载量',num:7422,arrow:'iconfont icon-arrow-down',compare:'14%',mystyle:'iconfont icon-app'}],
        }
    },
    methods:{
        fun(){
            let canvas=this.$refs.canvas;
            canvas.width=1600;
            canvas.height=450;
            let ctx=canvas.getContext('2d');
            ctx.strokeRect(30,20,1560,390);
            ctx.strokeStyle='#D9D9D9'
            ctx.font='12px';
            ctx.fillText('10',15,24);
            ctx.beginPath();
            ctx.font='12px';
            ctx.fillText('8',20,86);
            ctx.moveTo(30,82);
            ctx.lineTo(1590,82);
            ctx.stroke();
            ctx.beginPath();
             ctx.font='12px';
            ctx.fillText('6',20,168);
            ctx.moveTo(30,164);
            ctx.lineTo(1590,164);
            ctx.stroke();
            ctx.beginPath();
             ctx.font='12px';
            ctx.fillText('4',20,250);
            ctx.moveTo(30,246);
            ctx.lineTo(1590,246);
            ctx.stroke();
            ctx.beginPath();
            ctx.font='12px';
            ctx.fillText('2',20,332);
            ctx.moveTo(30,328);
            ctx.lineTo(1590,328);
            ctx.stroke();
            ctx.font='12px';
            ctx.fillText('0',20,410);
            ctx.beginPath();
        }
    },
     mounted(){
       this.fun();
     }
   }
</script>
<style scoped>
    div,ul,li,p{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .index-header{
        width: 98%;
        height: 260px;
        margin: 0 auto;
        background-color: #F7F7F7;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
    }
    .index-header>div{
        width: 33%;
        height: 120px;
        border-left: 2px solid #ADB2B5;
    }
    .index-header>div>div{
        width:100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 15px;
    }
    .index-header>div>div>p:nth-child(1), .index-header>div>div>p:nth-child(3){
        font-size: 12px;
        color: #73879C;
    }
    .index-header>div>div>p:nth-child(3)>span{
        color: #E74C3C;
    }
    .index-header>div>div>p:nth-child(2){
        font-size: 40px;
        color: #1ABB9C;
    }
    .index-body{
        width: 98%;
        height: 480px;
        margin: 30px 1% 0 1%;
    }
    .index-body>h2{
        font-size: 25px;
        color: #73879C;
        padding-bottom: 10px;
        border-bottom: 2px solid #E6E9ED;
        margin-bottom: 10px;
    }
    .index-body>h2>span{
        font-size: 14px;
        color: #7777A3;
    }
</style>