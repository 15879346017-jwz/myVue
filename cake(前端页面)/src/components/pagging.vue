<template>
    <div>
         <ul @click="clickLI($event)" class="pagging">
                <li>首页</li>
                <li>上一页</li>
                <li v-for="(v,i) of sum" :key="i" @click="clickLi($event)" :class="{on:index==i}">{{v}}</li>
                <li>下一页</li>
                <li>尾页</li>
             </ul>
    </div>
</template>
<script>
export default {
    props:['sum'],
    data(){
        return {
            // sum:0,
            index:0,
            count:1
        }
    },
    methods:{
        fun(val){
          this.count=Number(val);
          this.index=this.count-1;
          this.$emit('counts',this.count);
        },
        clickLi(e){
           let a=e.target.innerHTML;
           this.fun(a);
        },
        clickLI(e){
            if(e.target.nodeName=='LI'){
                if(e.target.innerHTML=='首页'){
                    this.fun(1);
                };
                if(e.target.innerHTML=='尾页'){
                    this.fun(this.sum);
                };
                if(e.target.innerHTML=='上一页'){
                    this.count==1 ? this.count=1:this.count=this.count-1;
                    this.fun(this.count);
                };
                if(e.target.innerHTML=='下一页'){
                    this.count==this.sum ? this.count=this.sum:this.count=this.count+1;
                    this.fun(this.count);
                }
            }
        },
    },
    mounted(){
        // setTimeout(()=>this.sum=this.$store.state.sum,10);
    }
}
</script>
<style scoped>
  .pagging{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 10px;
    }
    .pagging>li:hover{
        background-color: #87CEFA;
    }
    .pagging>li{
        height: 26px;
        font-size: 16px;
        line-height: 20px;
        padding: 5px;
        cursor: pointer;
        border: 1px solid #dddddd;
    }
    .on{
        background-color: #87CEFA;
    }
    .pagging>li:not(:last-child){
        border-right: 0;
    }
    .pagging>li:first-child{
        border-radius: 4px 0 0 4px;
    }
    .pagging>li:last-child{
        border-radius: 0px 4px 4px 0px;
    }
</style>