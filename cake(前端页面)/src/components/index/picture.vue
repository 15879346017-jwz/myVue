<template>
  <div class="major">
    <div class="major-top">
      <div class="en">Gourmet selection</div>
      <div class="cn">美食精选</div>
      <div class="index_marjor_nav">
        <div class="wrap">
          <ul class="clearfix">
            <li
              :class="index==i?'active':''"
              v-for="(itpe,index) of arr"
              :key="index"
              @mousemove="start($event,index)"
              @mouseout="stop($event,index)"
            >
              <p v-html="itpe" :class="index==i?anim:''">{{itpe}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="index_marjor_list">
        <div class="wrap">
          <ul>
            <li v-for="(item,index) of arr1" :key="index" v-show="index==i" :class="ted">
              <div>
                <img :src="item.src" />
              </div>
              <div class="index_major_list_right" v-html="item.text"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.major {
  width: 100%;
  height: 627px;
  background: url(../../assets/img/cake14.png) no-repeat center fixed;
  margin-top: 50px;
  background-size: cover;
}
.major-top {
  width: 100%;
  height: 627px;
  box-sizing: border-box;
  padding: 50px 0;
}
.major .en{
  color: #fff;
  font-size: 48px;
  font-family: ShinePersonalUse;
}
.major .cn {
  color: #fff;
  position: relative;
  margin-top: -18px;
  height: 1em;
  line-height: 1em;
  font-size: 34px;
  font-weight: bold;
}
.major .index_marjor_nav {
  width: 100%;
  height: 54px;
  margin-top: 30px;
}
.major .wrap {
  width: 1200px;
  height: 54px;
  margin: 0 auto;
}
.major .clearfix {
  border: 2px solid #d1ab57;
  box-shadow: 5px 5px 5px #999;
  display: flex;
}
.major .clearfix > li {
  width: 298px;
  margin: 0;
  cursor: pointer;
  border-left: 1px solid #d1ab57;
  background: #fff;
  height: 50px;
  overflow: hidden;
  position: relative;
}
.major .clearfix > li.active {
  background: #d1ab57;
}
.major .clearfix > li.active p {
  color: #fff;
}
.major .clearfix > li > p {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  color: #d1ab57;
  font-size: 18px;
}
.major .d1 {
  animation: 0.5s tran linear;
}
.major .d2 {
  animation: 0.5s trans linear;
}
@keyframes trans {
  0% {
    margin-top: -50px;
  }
  100% {
    margin-top: 0px;
  }
}
@keyframes tran {
  0% {
    margin-top: 0px;
  }
  100% {
    margin-top: -50px;
  }
}
@keyframes fade{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 100%;
  }
}
.actives{
  transition: all 3s;
  animation: 3s fade;
}
.major .index_marjor_list {
  width: 100%;
  height: auto;
  margin-top: 30px;
}
.major .index_marjor_list div ul li {
  width: 1200px;
  box-shadow: 5px 5px 5px #999;
  height: 340px;
}
.major .index_marjor_list div ul li > div:first-child {
  width: 760px;
  height: 340px;
  float: left;
}
.major .index_marjor_list div ul li > div:first-child > img {
  width: 743.84px;
  height: 340px;
}
.major .index_marjor_list div ul li > div:last-child {
  width: 390px;
  float: right;
  padding: 0 25px;
  color: #333;
  background: #fff;
  height: 320px;
  padding-top: 20px;
}
.major .index_major_list_right h2 {
  font-size: 20px;
  font-weight: bold;
  line-height: 35px;
  text-align: left;
}
.major .index_major_list_right h3 {
  font-size: 18px;
  border-bottom: 1px dashed #dcdcda;
  line-height: 35px;
  padding-bottom: 10px;
  font-weight: normal;
}
.major .index_major_list_right_con {
  font-size: 14px;
  line-height: 25px;
  margin-top: 20px;
  padding: 0 10px;
  text-align: left;
}
</style>
<script>
export default {
    data(){
        return{
            arr:[
                '精美蛋糕/Bakery/Desserts<br>精美蛋糕/Bakery/Desserts',
                '纸杯蛋糕/Bakery/Desserts<br>纸杯蛋糕/Bakery/Desserts',
                '下午茶点/Bakery/Desserts<br>下午茶点/Bakery/Desserts',
                '精选面包/Bakery/Desserts<br>精选面包/Bakery/Desserts'
            ],
            anim:"",
            i:0,
            ted:"", 
            arr1:[
                {src:require("../../assets/img/cake8.png"),text:`<h2>精美蛋糕</h2>
                                <h2>Baking sweets</h2>
                                <h3>营业时间:周一至周五上午8点 / 周六周日上午9点</h3>
                                <div class="index_major_list_right_con">
                                    <p>
                                        口味：
                                        <br>
                                        ●口味丰富
                                        <br>
                                        ●当季水果现做
                                        <br>
                                        ●保质期短
                                    </p>
                                </div>`},
                {src:require("../../assets/img/cake9.png"),text:`<h2>纸杯蛋糕</h2>
                                <h2>Baking sweets</h2>
                                <h3>营业时间:周二至周五上午8点 / 周六周日上午9点</h3>
                                <div class="index_major_list_right_con">
                                    <p>
                                        口味：
                                        <br>
                                        ●口味丰富
                                        <br>
                                        ●当季水果现做
                                        <br>
                                        ●保质期短
                                    </p>
                                </div>`},
                {src:require("../../assets/img/cake12.png"),text:`<h2>下午茶点</h2>
                                <h2>Baking sweets</h2>
                                <h3>营业时间:周三至周五上午8点 / 周六周日上午9点</h3>
                                <div class="index_major_list_right_con">
                                    <p>
                                        口味：
                                        <br>
                                        ●口味丰富
                                        <br>
                                        ●当季水果现做
                                        <br>
                                        ●保质期短
                                    </p>
                                </div>`},
                {src:require("../../assets/img/cake11.png"),text:`<h2>精选面包</h2>
                                <h2>Baking sweets</h2>
                                <h3>营业时间:周周四至周五上午8点 / 周六周日上午9点</h3>
                                <div class="index_major_list_right_con">
                                    <p>
                                        口味：
                                        <br>
                                        ●口味丰富
                                        <br>
                                        ●当季水果现做
                                        <br>
                                        ●保质期短
                                    </p>
                                </div>`}
            ]
        }
    },
    methods:{
         start(e,index){
             if(e.target.nodeName=='P'){
                 if(e.target){
                this.i=index
                this.anim=" d1";
                this.ted="actives";
                }
            }
         },
         stop(e){
             if(e.target.nodeName=='P'){
                 if(e.target){
                    this.anim="d2"
                 }
             }
         }
    }
}
</script>