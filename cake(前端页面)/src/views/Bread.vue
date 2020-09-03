<template>
<div>
    <headers :headerIndex="headerIndex"></headers>
        <main>
            <div class="bread">
                <div class="bread_contain">
                    <ul class="bread_list">
                        <li class="bread_item" v-for="(item,index) of bread" :key="index" @click="goTodetail($event,item.produce_id)">
                            <div class="bread_img">
                                <a href="JavaScript:;">
                                    <img :src="item.image" alt="">
                                </a>
                            </div>
                            <div class="bread_info">
                                <div class="bread_name">
                                    <a href="javascript:;">
                                        <span>{{item.produce_name}}</span>
                                    </a>
                                </div>
                                <div class="bread_price">
                                    <p>¥{{item.produce_price1.toFixed(2)}}/一份</p>
                                    <a href="javascript:;" @click="buy($event,item)" class="iconfont iconjia">加入购物车</a>
                                </div>
                            </div>
                         <!--   <div class="cart_success" v-show="successShow">
                                <p>成功添加购物车</p>
                                <a href="javascript:;">查看购物车</a>
                            </div>-->
                        </li>
                    </ul>
                </div>
                <div class="pull">
                    <span>没有更多了</span>
                </div>
            </div>
        </main>
    <footers></footers>
</div>
</template>
<script>
export default {
    data(){
        return{
            bread:[],
            successShow:false,
            user_id:0,
            headerIndex:2
        }
    },
    mounted(){
        this.user_id=sessionStorage.getItem('$user_id');
        this.axios.get('/case/bread').then(res=>{
            let data=res.data.results;
            data.forEach(item=>{
                item.image=require('../assets/image/bread/'+item.image1);
                this.bread.push(item);
            })
        });
    },
    methods:{
        buy(e,val){
            e.stopPropagation();
            let user_id=sessionStorage.getItem('$user_id');
            if(user_id==null){
                this.$router.push('/login');
            }else{
               this.axios.post('/case/addCart',`user_id=${this.user_id}&product_id=${val.produce_id}&count=${1}&specs=${val.specs1}&produce_name=${val.produce_name}&produce_price=${val.produce_price1}&image1=${val.image1}`).then(res=>{
                       if(res.data==1){
                             this.$router.push(`/cart?produce_id=${val}`);
                       }
               });
              
                // this.$router.push(`/cart?produce_id=${val}`);
            }
        },
        goTodetail(e,val){
           this.$router.push(`/detail?produce_id=${val}`);
        },
    },
}
</script>
<style scoped>
main{
    width: 70%;
    margin: 150px auto 50px auto;
    text-align: left;
}
main a{
    text-decoration: none;
    color: #791a1e;
}
.bread{
    background-color: #f7f8f8;
    padding: 2%;
}
.bread_contain{
    background-color: #fff;
    padding: 1% 2%;
}
.bread_list{
    display: flex;
    flex-flow: row wrap;
    overflow: hidden;
}
.bread_list .bread_item{
    padding: 3% 1% 2.5%;
    border: 0;
    overflow: hidden;
    box-sizing: border-box;
    flex-basis: 25%;
    position: relative;
}
.bread_item .bread_img{
    width: 100%;
    height: 250px;
}
.bread_item img{
    width: 100%;
    height: 100%;
    transition: 0.3s linear;
}
.bread_item img:hover{
    width: 105%;
    height: 105%;
}
.bread_info .bread_name{
    height: 60px;
}
.bread_info .bread_name span{
    font-size: 14px;
}
.bread_info .bread_price{
    height: 40px;
}
.bread_info .bread_price p{
    color: #791a1e;
    font-size: 18px;
    margin-bottom: 1%;
}
.bread_info .bread_price a{
    font-size: 12px;
}

.pull{
    padding-top: 2%;
    text-align: center;
    color: #595757;
    font-size: 12px;
}
.cart_success{
    width: 80%;
    height: 100px;
    background: #f8f8f8;
    padding: 7% 7% 12% 7%;
    position: absolute;
    top: 69%;
}
.cart_success p{
    text-align: center;
    font-size: 14px;
    color: #B08C7E;
    line-height: 25px;
    padding: 6% 0 4%;
}
.cart_success a{
    background: #684029;
    color: #fff;
    font-size: 13px;
    height: 30px;
    width: 80%;
    display: block;
    line-height: 30px;
    text-align: center;
    margin: 1% auto 0;
}
</style>