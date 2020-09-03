<template>
    <div class="loge">
        <h1>后台管理系统
            <span>奢华之选</span>
        </h1>
        <span class="shrink" @click="indexCake">三</span>
    </div>
</template>
<style scoped>
.loge{
  display: inline-block; 
  /* width: 279px; */
  height: 30px;
  margin-left:20px;
}
h1{
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 200;
  color:#fff;
}
h1>span{
  background: none repeat scroll 0 0 rgba(0,0,0,.2);
  border-radius: 3px;
  font-size: 11px;
  padding: 0 5px;
  position: relative;
  top: -6px;
}
.shrink{
  background: none repeat scroll 0 0 rgba(0,0,0,.3);
  border-radius: 3px;
  color: rgba(255,255,255,.8);
  cursor: pointer;
  display:block;
  height: 30px;
  line-height: 30px;
  left:269px;
  text-align: center;
  top: 26px;
  width: 30px;
  position: absolute;
  font-size: 14px;
}
</style>
<script>
export default {
  methods:{
    indexCake(){
      this.$store.commit('changeState0');
    }
  }
}
</script>