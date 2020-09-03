<template>
    <div>
       <headers :headerIndex='headerIndex'></headers>
        <div class="main">
            <img src="../assets/image/new.jpg" alt="">
        </div>
        <footers></footers>
    </div>
</template>
<script>
export default {
    data(){
        return {headerIndex:3}
    }
}
</script>
<style scoped>
.main{
    width: 70%;
    margin: 0 auto;
    margin-top: 130px;
}
.main img{
    width: 100%;
    height: 100%;
}
</style>