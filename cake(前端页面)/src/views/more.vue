<template>
  <div class="body">
    <Headers class="header" :headerIndex='headerIndex'></Headers>
    <div class="team">奢华之选,专业团队</div>
    <div class="heartPic">
      <ul>
        <li></li>
        <li>
          <div class="in">
            <img width="100" height="100" src="../assets/img/cp9.jpg" />
            <p class="pTxt">蛋糕</p>
          </div>
        </li>
        <li>
          <div class="in">
            <img width="100" height="100" src="../assets/img/cp10.jpg" />
            <p class="pTxt">蛋糕</p>
          </div>
        </li>
        <li></li>
        <li>
          <div class="in">
            <img width="100" height="100" src="../assets/img/cp11.jpg" />
            <p class="pTxt">蛋糕</p>
          </div>
        </li>
        <li>
          <div class="in">
            <img width="100" height="100" src="../assets/img/cp12.jpg" />
            <p class="pTxt">蛋糕</p>
          </div>
        </li>
        <li></li>
      </ul>
      <ul>
        <li v-for="(item,index) of arr" :key="index">
          <div class="in">
            <img width="100" height="100" :src="item.src" />
            <p class="pTxt">{{item.text}}</p>
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) of brr" :key="index">
          <div class="in">
            <img width="100" height="100" :src="item.src"  />
            <p class="pTxt">{{item.text}}</p>
          </div>
        </li>
      </ul>
      <ul>
        <li></li>
        <li v-for="(item,index) of crr" :key="index">
          <div class="in">
            <img width="100" height="100" :src="item.src" />
            <p class="pTxt">{{item.text}}</p>
          </div>
        </li>
        <li></li>
      </ul>
      <ul>
        <li></li>
        <li></li>
        <li v-for="(item,index) of drr" :key="index">
          <div class="in">
            <img width="100" height="100" :src="item.src" />
            <p class="pTxt">{{item.text}}</p>
          </div>
        </li>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li>
          <div class="in">
            <img width="100" height="100" src="../assets/img/cp8.jpg" />
            <p class="pTxt">蛋糕</p>
          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Headers from "../components/headers.vue";
import Footer from "../components/Footer";
export default {
    components:{
        Headers,
        Footer
    },
    data(){
        return{
            arr:[
                {src:require('../assets/img/13.jpg'),text:'蛋糕'},
                {src:require('../assets/img/15.jpg'),text:'蛋糕'},
                {src:require('../assets/img/1.jpg'),text:'倪佳锋'},
                {src:require('../assets/img/2.jpg'),text:'徐亚军'},
                {src:require('../assets/img/3.jpg'),text:'潘勇祥'},
                {src:require('../assets/img/16.jpg'),text:'蛋糕'},
                {src:require('../assets/img/17.jpg'),text:'蛋糕'},
            ],
            brr:[
                {src:require('../assets/img/18.jpg'),text:'蛋糕'},
                {src:require('../assets/img/19.jpg'),text:'蛋糕'},
                {src:require('../assets/img/9.png'),text:'专业团队'},
                {src:require('../assets/img/log.png'),text:'奢华之选'},
                {src:require('../assets/img/9.png'),text:'专业团队'},
                {src:require('../assets/img/cp1.jpg'),text:'蛋糕'},
                {src:require('../assets/img/cp2.jpg'),text:'蛋糕'},
            ],
            crr:[
                {src:require('../assets/img/cp3.jpg'),text:'蛋糕'},
                {src:require('../assets/img/4.jpg'),text:'王靖'},
                {src:require('../assets/img/5.jpg'),text:'丁祁东'},
                {src:require('../assets/img/20.jpg'),text:'纪雯正'},
                {src:require('../assets/img/cp4.jpg'),text:'蛋糕'},
            ],
            drr:[
                 {src:require('../assets/img/cp5.jpg'),text:'蛋糕'},
                {src:require('../assets/img/cp6.jpg'),text:'蛋糕'},
                {src:require('../assets/img/cp7.jpg'),text:'蛋糕'},
            ],
           headerIndex:6
        }
    },
     mounted() {
    $(".heartPic li").hover(
      function () {
        $(this).addClass("on");
        $(this).find("img").animate({ width: "200px", height: "200px" });
        $(this).find("div").animate({ width: "200px", height: "200px" });
        $(this).find(".pTxt").animate({ width: "200px", height: "20px" });
        $(this).find("p").addClass("showDiv");
      },
      function () {
        $(this).animate({ height: "100px" }, 100).removeClass("on");
        $(this)
          .find("img")
          .stop(true, true)
          .animate({ width: "100px", height: "100px" });
        $(this)
          .find("div")
          .stop(true, true)
          .animate({ width: "100px", height: "100px" });
        $(this)
          .find(".pTxt")
          .stop(true, true)
          .animate({ width: "0px", height: "0px" });
      }
    );
  },
}
</script>
<style  scoped>
.header{
    position: relative !important;
}
.team{
     background: #f9f2c3;
     color: #999;
     font-size: 35px;
     margin-top: 20px;
     height: 40px;
     line-height: 40px;
}
ul,
li {
  list-style: none;
}
.body {
  font: 12px/20px "Microsoft Yahei", "SimSun", Arial, sans-serif;
  background: #f9f2c3;
}

/* heartPic */
.heartPic {
  width: 749px;
  height: 630px;
  margin: 60px auto 0 auto;
}
.heartPic ul {
  float: left;
  width: 749px;
}
.heartPic ul li {
  float: left;
  width: 100px;
  height: 100px;
  padding: 2px;
  cursor: pointer;
}
.heartPic ul li.on {
  z-index: 99;
}
.heartPic ul li.on .in {
  position: relative;
  left: -50px;
  top: -50px;
  padding: 5px 5px 20px 5px;
  background: #fad5fa;
}
.heartPic ul li .pTxt {
  display: none;
  width: 100px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: rgb(15, 15, 15);
  overflow: hidden;
}
.heartPic .showDiv {
  display: block;
}
</style>