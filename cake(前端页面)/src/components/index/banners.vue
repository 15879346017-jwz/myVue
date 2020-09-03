<template>
  <div class="banners">
    <div class="title">
      <h3>蛋糕精选专栏 / Cake selection column</h3>
    </div>
    <div class="slide">
      <div class="tablists">
        <span>精选美食</span>
        <div class="tab-btn">
          <ul>
            <li>
              <img src="../../assets/icon/cake.png">
              <span>精美甜品</span>
            </li>
            <li>
              <img src="../../assets/icon/desserts.png">
              <span>精致蛋糕</span>
            </li>
            <li>
              <img src="../../assets/icon/food.png">
              <span>精美面包</span>
            </li>
            <li>
              <img src="../../assets/icon/foodsnacks.png">
              <span>新品上市</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="left" @click="move(-1)">
          <span class="iconfont iconleft"></span>
        </div>
        <ul class="carousel" :style="ulStyle" :class="ulClass" @mouseenter="stop" @mouseleave="start">
          <li v-for="(item,i) of imgs" :key="i" @click="lunboDrop(item)">
            <img :src="item.pic_img" />
          </li>
        </ul>
        <div class="right" @click="move(1)">
          <span class="iconfont iconleft"></span>
        </div>
      </div>
      <ul class="indicators">
        <!-- <li v-for="(item,index) of 4" :key="index" :class="index==x?'active':''" @click="moveTo(index)"></li> -->
        <li v-for="(item,index) of imgslength" :key="index" :class="{'active':index==x}" @click="moveTo(index)"></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .title {
    font-size: 24px;
    color: #791a1e;
    font-weight: normal;
    padding: 60px 0 30px;
    font-family: ShinePersonalUse;
  }

  .slide {
    margin-left: 18%;
  }

  .tablists {
    width: 315px;
    height: 480px;
    background: #848484;
    float: left;
  }

  .tablists>span {
    display: block;
    font-size: 21px;
    color: white;
    letter-spacing: 3px;
    text-align: center;
    padding-top: 58px;
  }

  .banners {
    width: 100%;
    position: relative;
    text-align: center;
  }

  .tab-btn {
    width: 250px;
    padding: 52px 32px 95px 33px;
    overflow: hidden;
  }

  .tab-btn>ul>li:first-child {
    background-color: rgb(68, 68, 68);
  }

  .tab-btn>ul>li {
    position: relative;
    width: 120px;
    height: 120px;
    display: inline-block;
    margin: 2px;
    border-radius: 7px;
    background-color: rgb(97, 97, 97);
    transition: all .4s;
    display: inline-block;
    font-size: 18px;
    color: white;
  }

  .tab-btn>ul>li:hover {
    cursor: pointer;
    box-shadow: 0 0 30px #ffffff;
    background-color: rgb(68, 68, 68);
    transition: all .4s;
    transform: translate(0, -5px);
  }

  .tab-btn>ul>li img {
    width: 55px;
    height: 55px;
    margin-top: 8px;
  }

  .tab-btn>ul>li span {
    display: inline-block;
    padding-top: 10px;
    font-size: 18px;
    letter-spacing: 2px;
  }

  .item {
    width: 885px;
    height: 480px;
    overflow: hidden;
    position: relative;
  }

  .carousel {
    width: 4525px;
    height: 480px;
  }

  .carousel.hasTrans {
    transition: all 0.8s linear;
  }

  .carousel>li {
    margin-right: 20px;
    float: left;
  }

  .carousel>li>img {
    width: 885px;
    height: 480px;
  }

  .left,
  .right {
    width: 44px;
    height: 44px;
    background-color: rgba(95, 95, 92, 0.3);
    top: 89%;
    border-radius: 50%;
    position: absolute;
    line-height: 44px;
    text-align: center;
    color: #fff;
    z-index: 33;
  }
  .left span:hover,.right span:hover{
    color:yellow;
  }
  .left {
    transform: rotate(180deg);
    left: 603px;
  }

  .right {
    right: 42px;
  }

  .indicators {
    bottom: 130px;
    display: flex;
    position: absolute;
    bottom: 20px;
    left: 70%;
  }

  .indicators li {
    width: 15px;
    height: 15px;
    background-color: #fff;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 50%;
    top: 60px;
  }

  .indicators>li:hover,
  .indicators>li.active {
    transform: scale(1.3);
  }

  .indicators>li:first-child {
    background-color: #f68cc6;
  }

  .indicators>li:nth-child(2) {
    background-color: #fa9c77;
  }

  .indicators>li:nth-child(3) {
    background-color: #c67ee79b;
  }

  .indicators>li:nth-child(4) {
    background-color: #02c0f0f5;
  }
</style>
<script>
  export default {
    data() {
      return {
        imgslength:0,
        ulClass: {
          hasTrans: true,
        },
        i: 0,
        x: 0,
        imgs: [],
        canClick: true,
        timer: null,
      };
    },
    created() {
      this.start();
    },
    mounted() {
      this.axios.get('/case/lunbo').then(res => {
        let obj= res.data.a;
       obj.forEach(item=>{
         if(item.pic_img!=''){
           item.pic_img=require('../../assets/img/'+item.pic_img)
         }
         this.imgs.push(item);
       });
       this.imgs.push(this.imgs[0]);
        this.imgslength=this.imgs.length-1;
      })
    },
    methods: {
      stop() {
        clearInterval(this.timer);
      },
      start() {
        this.timer = setInterval(() => {
          this.move(1);
        }, 4000);
      },
      move(i) {
        if (this.canClick) {
          this.canClick = false;
          if (i == -1 && this.i == 0) {
            //如果向右移动，且正在显示第1张图片，就要骗
            this.ulClass.hasTrans = false; //去掉父级div上的transition样式类
            this.i = this.imgs.length - 1; //悄悄的将父级div移动到最左边
            setTimeout(() => {
              //等50ms后，再进行后续操作
              this.ulClass.hasTrans = true; //打开父级div上的transition效果
              this.i += i; //正式向右移动一次
              setTimeout(() => {
                //200s后，才允许单击
                this.canClick = true;
              }, 1000);
            }, 20);
          } else if (i == 1 && this.i == this.imgs.length - 1) {
            //如果向左移动，且现在已经显示最后一张了
            //等左移完，再去掉transition效果，骗用户
            this.ulClass.hasTrans = false;
            //等50ms后，瞬间将父级div移动到显示第一张图片
            this.i = 0;
            setTimeout(() => {
              //等50ms后，再次启用transition，为下次提供动画
              this.ulClass.hasTrans = true;
              //稍等片刻之后允许单击
              this.i = 1;
              this.canClick = true;
            }, 1000);
          } else {
            //如果不是两端的情况，则保持原来的逻辑
            // this.canClick=false
            this.i += i;
            setTimeout(() => {
              this.canClick = true;
            }, 1000);
          }
        }
      },
      moveTo(i) {
        if (this.canClick) {
          this.i = i;
          this.canClick = false;
          setTimeout(() => {
            this.canClick = true;
          }, 300);
        }
      },
      //点击图片跳转到相应的路径
      lunboDrop(val){
        this.$router.push(val.pic_href)
      }
    },
    computed: {
      ulStyle() {
        var marginLeft = -this.i * 905 + "px";
        return { marginLeft };
      },
    },
    watch: {
      i() {
        if (this.i == 0 || this.i == 4) {
          this.x = 0;
        } else {
          this.x = this.i;
        }
      },
    },
  };
</script>