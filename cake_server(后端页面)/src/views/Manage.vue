<template>
  <div id="manage">
    <div>
     <Index></Index>
     </div>
     <Leftsidebar></Leftsidebar>
     <Rightsidebar></Rightsidebar>
     <ColLeft></ColLeft>
     <WrapFluid></WrapFluid>
  </div>
</template>
<script>
import Index from '../components/Index.vue'
import Leftsidebar from '../components/Leftsidebar'
import Rightsidebar from '../components/Rightsidebar'
import ColLeft from '../components/Col-left'
import WrapFluid from '../components/Wrap-fluid'
export default {
  components:{
    Index,
    Leftsidebar,
    Rightsidebar,
    ColLeft,
    WrapFluid,
    },
mounted(){
  let admin_id=sessionStorage.getItem('admin_id');
   if(admin_id==null){
       this.$router.push('/login');
   }
},
}
</script>
<style scoped>
  #manage{
    width: 100%;
    height:970px;
    background-image: url(../assets/bg.png);
    background-size:100% 1400px;
  }
</style>