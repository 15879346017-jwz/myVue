<template>
  <div class="purchase">
    <div class="purchase_part">
      <div class="InformationTitle">
        <h5>当日下单名单</h5>
      </div>
      <div class="InformationInfo_auto">
        <div class="InformationInfo">
          <h5>当日下单</h5>
          <ul>
            <li>
              <p>客户姓名</p>
              <p>时间</p>
              <p>电话号码</p>
            </li>
          </ul>
          <ul class="scroll_box" @mouseenter="stop" @mouseleave="start">
            <div :style="tra">
              <li v-for="(item,index) of arr" :key="index">
                <span>{{hideName(item.name)}}</span>
                <span>{{item.time}}</span>
                <span>{{hidePhone(item.phone)}}</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.purchase {
  width: 100%;
  height: 627px;
  background: url(../../assets/img/cake17.png) no-repeat center fixed;
  margin-top: 50px;
  background-size: cover;
}
.purchase_part {
  width: 100%;
  height: 627px;
  margin: 10px auto 50px;
  box-sizing: border-box;
  /* background-color: rgba(0, 0, 0, 0.75); */
}
.InformationTitle h5 {
  font-size: 34px;
  color: #fff;
  line-height: 2.5;
  font-weight: 600;
}
.InformationInfo_auto {
  display: flex;
  justify-content: space-around;
}
.InformationInfo {
  width: 342px;
  height: 522px;
  border: 1px solid #c1c1c1;
}
.InformationInfo h5 {
  text-align: center;
  font-size: 26px;
  color: #333333;
  line-height: 2.4;
}
.InformationInfo ul {
  padding: 0 15px;
  overflow: hidden;
}
.InformationInfo ul li p {
  float: left;
  text-align: center;
  font-size: 16px;
  width: 115.44px;
  height: 45px;
  line-height: 45px;
}
.InformationInfo ul li p:nth-child(2) {
  width: 81.11px;
}
.scroll_box {
  height: 415px;
  overflow: hidden;
  padding: 0 15px;
}
.scroll_box li {
  width: 100%;
  float: left;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  border-top: 1px dashed #c1c1c1;
}
.scroll_box li span {
  float: left;
  text-align: center;
  font-size: 16px;
  width: 115.44px;
  height: 45px;
  line-height: 45px;
}
.scroll_box li span:nth-child(2) {
  color: #eaae32;
}
.scroll_box li span:nth-child(2) {
  width: 81.11px;
}
</style>
<script scope>
export default {
  data() {
    return {
      arr: [],
      timer: null,
      i: 1,
      tra: { marginTop: "0px" }
    };
  },
  methods: {
    stop() {
      clearInterval(this.timer);
    },
    hideName(name) {
      name = name.split("");
      for (var i in name) {
        if (i != 0 && i != name.length - 1) {
          name[i] = "*";
        }
      }
      name[1] = "*";
      return name.join("");
    },
    hidePhone(phone){
      return parseInt(phone/100000000)+'****'+(phone%10000);
    },
    start() {
      this.timer = setInterval(() => {
        // 添加过渡，div上移
        this.tra = {
          marginTop: "-45px",
          transition: "all 1s"
        };
        setTimeout(() => {
          // 将第一个数据添加到最后
          this.arr.push(this.arr[0]);
          // 删除第一个数据
          this.arr.splice(0, 1);
          // div归位，同时删除过渡
          this.tra = {
            marginTop: "0px",
            transition: ""
          };
          //在动画执行之后再清除动画
        }, 1000);
      }, 2000);
    }
  },
  mounted() {
    var mt = this.tra.marginTop.slice(0, -2);
    this.start();
    this.axios.get("/case/roder").then(result => {
      // console.log(result.data);
      // result.data.forEach((item,index) => {
      //   result.data[index].phone=this.hidePhone(item.phone);
      //   result.data[index].name=this.hideName(item.name);
      // });
      this.arr = result.data;
    });
  }
};
</script>