<template>
  <div class="dh">
      <ul class="title">
      <li
        v-for="(item,index) of arr"
        :key="index"
        :class="index==i?'active':''"
        @mouseenter="start($event,index)"
      >
        <i class="iconfont" :class=" item.icon"></i>
        <span>{{item.text}}</span>
      </li>
      </ul>
    <div class="matter">
      <ul>
        <li v-for="(item,index) of arr1" :key="index" v-show="index==i">
          <ul class="matter-one">
            <li v-for="(key,i) of item" :key="i" class="img_tr">
              <div class="foet">
                <router-link to="#">
                  <img :src="key.src" />
                </router-link>
                <p>{{key.text}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) of arr2" :key="index" v-show="index==i" class="img_td">
          <router-link to="#">
            <img :src="item.src" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      i: "",
      arr: [
        { icon: "iconicon-test", text: "精美蛋糕" },
        { icon: "iconicon-test", text: "面包甜点" },
        { icon: "iconicon-test", text: "div蛋糕" },
      ],
      arr1: [
        
        [
          {
            src: require("../../assets/dh/7.jpg"),
            text: "羊角面包&emsp;Croissant",
          },
          {
            src: require("../../assets/dh/2.jpg"),
            text: `白巧克力慕斯&emsp; White chocolate mousse`,
          },
          {
            src: require("../../assets/dh/4.jpg"),
            text: `法式柠檬塔&emsp; Lemon tart`,
          },
          {
            src: require("../../assets/dh/5.jpg"),
            text: `蝴蝶酥 &emsp;Butterfly Cookies`,
          },
          {
            src: require("../../assets/dh/6.jpg"),
            text: `黑白巧克力慕斯 &emsp;Black and White Chocolate Mousse`,
          },
        ],
        [
          {
            src: require("../../assets/dh/8.jpg"),
            text: "羊角面包&emsp;Croissant",
          },
          {
            src: require("../../assets/dh/17.jpg"),
            text: `白巧克力慕斯&emsp; White chocolate mousse`,
          },
          {
            src: require("../../assets/dh/22.jpg"),
            text: `法式柠檬塔&emsp; Lemon tart`,
          },
          {
            src: require("../../assets/dh/24.jpg"),
            text: `蝴蝶酥 &emsp;Butterfly Cookies`,
          },
          {
            src: require("../../assets/dh/25.jpg"),
            text: `黑白巧克力慕斯 &emsp;Black and White Chocolate Mousse`,
          },
        ],
        [
          {
            src: require("../../assets/dh/9.jpg"),
            text: "羊角面包&emsp;Croissant",
          },
          {
            src: require("../../assets/dh/26.jpg"),
            text: `白巧克力慕斯&emsp; White chocolate mousse`,
          },
          {
            src: require("../../assets/dh/27.jpg"),
            text: `法式柠檬塔&emsp; Lemon tart`,
          },
          {
            src: require("../../assets/dh/20.jpg"),
            text: `蝴蝶酥 &emsp;Butterfly Cookies`,
          },
          {
            src: require("../../assets/dh/23.jpg"),
            text: `黑白巧克力慕斯 &emsp;Black and White Chocolate Mousse`,
          },
        ],
      ],
      arr2: [
        { src: require("../../assets/dh/3.jpg") },
        { src: require("../../assets/dh/3.jpg") },
        { src: require("../../assets/dh/3.jpg") },
        { src: require("../../assets/dh/3.jpg") },
      ],
    };
  },
  methods: {
    start(e, index) {
      if (e.target.nodeName == "LI") {
        if (e.target) {
          this.i = index;
          // console.log(this.i)
        }
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
div.dh{
  background: url('../../assets/img/cake16.png') no-repeat center fixed;
 padding: 30px 0px;
}

div.dh .title {
  width: 720px;
  height: 50px;
  margin: 20px 0;
  padding: 0 240px 0 240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
div.dh .title li {
  list-style: none;
  background: #383637;
  width: 150px;
  color: #fff;
  border: 4px solid #ad8957;
  text-align: center;
  line-height: 42px;
  border-radius: 3px;
}
@keyframes fade{
  0%{
    opacity: 0%;
  }
  100%{
    opacity: 1%;
  }
}
div.dh .title li i {
  margin-right: 5px;
}
div.dh .title li.active {
  color: #e1c679;
}
/* 图片区域*/
.matter {
  /* margin-top: 20px; */
  width: 1200px;
  height: 598px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  box-sizing: border-box;
}
.matter > ul:nth-child(2) {
  height: 100%;
  text-align: center;
}
.matter > ul:nth-child(2) li {
  margin-top: 3px;
}
.matter-one {
  width: 915px;
  height: 598px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
  box-sizing: border-box;
  /* animation: 5s fade linear; */
}
.matter-one li {
  position: relative;
  margin: 0px 20px 20px 0;
}
.matter-one > li:nth-child(1),
.matter-one > li:nth-child(2) {
  margin-bottom: 17px !important;
  margin-top: 3px;
}
.img_tr {
  overflow: hidden;
}
.img_tr img {
  transition: all 0.6s linear;
}
.img_tr img:hover {
  transform: scale(1.2);
}
.img_tr:hover p {
  margin-top: 50px;
  /* height: 0; */
  overflow: hidden;
}
.img_tr:first-child>.foet>a>img{
  width: 590px;
  height: 280px;
}
.img_tr:not(:first-child)>.foet>a>img{
  width: 285px;
  height: 279px;
}
.img_td img{
  width:300px;
  height: 578px;
}
</style>
<style>
.matter-one li p {
  position: absolute;
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.46);
  top: 240px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  transition: all 0.8s ease-in-out;
   overflow: hidden;
}
</style>