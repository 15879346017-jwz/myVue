<template>
    <div class="item">
        <ul>
            <li>
                <router-link to="/">
                <img src="../../assets/img/cake6.png">
            </router-link>
            </li>
            <li>
                <router-link to="/">
                <img src="../../assets/img/cake7.png">
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.item{
    width: 100%;
    height: 338px;
}
.item ul{
    width: 1185px;
    height: 338px;
    display: flex;
    margin: 0 auto;
    padding: 30px 0;
    justify-content: space-around;
}
.item ul li{
    height: 278px;
    overflow: hidden;
}
.item ul li img{
    transition: all 0.3s linear;
}
.item ul li img:hover{
    transform: scale(1.05);
}
</style>