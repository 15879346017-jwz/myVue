<template>
    <div class="wrap-fluid">
        <div class="paper-wrap"></div>
        <div class="tile_count">
            <index v-if="this.$store.state.isShows==0"></index>
            <goodList v-else-if='this.$store.state.isShows==1'></goodList>
            <changeCake v-else-if='this.$store.state.isShows==2'></changeCake>   
            <detailPic v-else-if='this.$store.state.isShows==3'></detailPic>   
            <addCake v-else-if='this.$store.state.isShows==4'></addCake>
            <user v-else-if='this.$store.state.isShows==5'></user>
            <order v-else-if='this.$store.state.isShows==6'></order>
            <lunbo v-else-if='this.$store.state.isShows==7'></lunbo>
        </div>
    </div>
</template>
<script>
import index from './index/index.vue'
import goodList from './index/goodList.vue'
import detailPic from './index/detail_pic.vue'
import changeCake  from './index/change_cake.vue'
import addCake from './index/add_cake.vue'
import user from './user/user.vue'
import lunbo from './firstPage/lunbo.vue'
import order from './order/order.vue'
export default {
    components:{
        index,
        goodList,
        detailPic,
        changeCake,
        addCake,
        user,
        order,
        lunbo
    },
    data(){
        return {}
    },
    methods:{

    },
    mounted(){
       
    },
}
</script>
<style scoped>
.wrap-fluid{
    float:right;
    margin-top:20px;
    width: 86%;
    position: relative;
    margin-right:10px;
}
.paper-wrap{
    background-color: #fff;
    width: 97.5%;
    height: 42px;
    float: right;
}
.paper-wrap::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-width:0 0 42px 42px;
    border-style: solid;
    border-color:#fff rgba(0,0,0,.1);
    box-shadow: 0 0 0 rgba(0,0,0,.4), 0 0 10px rgba(0,0,0,.3);
}
.tile_count{
    margin-top: 42px;
    width: 100%;
    min-height: 800px;
    background-color: #fff;
}
</style>