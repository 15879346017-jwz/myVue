<template>
    <div>
        <div class="headers">
            <headers :headerIndex='headerIndex'></headers>
        </div>
        <div class="banner">
            <banners></banners>
            <item></item>
        </div>
        <div>
            <myPicture> </myPicture>
        </div>
        <div class="maopao">
           <maopao></maopao>
        </div> 
        <div class="goods">
            <Goods></Goods>
        </div>
        <div>
            <purchase></purchase>
        </div>
        <div class="footers">
            <footers></footers>
        </div>
    </div>
</template>
<script>
import Banners from "../components/index/banners.vue"
import item from "../components/index/item"
import myPicture from '../components/index/picture'
import purchase from "../components/index/purchase"
import maopao from "../components/index/maopao.vue"
import Goods from "../components/index/Goods"
export default {
    components:
    {
    // Headers,
    item,
    Banners,
    myPicture,
    purchase,
    maopao,
    Goods
    // Footer
    },
    data(){
        return {headerIndex:0}
    }
}
</script>
<style scoped>
   .banner{
    margin-top: 161px;
    width: 100%;
    height: 932px;
    background: url(../assets/img/cake15.png) no-repeat center fixed;
    background-size: cover;
   }
   .maopao,.footers{
       margin-top: 50px;
   }
   .goods{
       margin-top: 60px;
   }
</style>