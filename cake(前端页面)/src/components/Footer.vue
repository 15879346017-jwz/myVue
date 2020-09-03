<template>
    <div class="footer">
       <ul>
            <li>
               <img src="../assets/icon/safety.png">
                <h4 style="color:black">品质保证</h4>
                <p>官方门店直供</p>
            </li>
            <li>
               <img src="../assets/icon/uploading.png">
               <h4 style="color:black">送货上门</h4>
               <p>附近门店直接送货上门</p>
               <p>偏远地区除外</p>
            </li>
            <li>
               <img src="../assets/icon/gift.png">
               <h4 style="color:black">精美礼盒</h4>
               <p>甄选精美礼盒包装</p>
               <p>尊享官网购物体验</p>
            </li>
            <li>
               <img src="../assets/img/code.jpg" class="me">
               <h4 style="color:black"  >关注我们</h4>
               <p>了解我们最新消息</p>
            </li>
       </ul>
       
       <div class="last">
       <p>如果您有任何疑问，请拨打客服电话：15270545791  或发邮件至客服邮箱2030133877@qq.com</p>
        <p>商务合作:如果您有商品或网站方面的合作，联系电话：15270545791</p>
        </div>
    </div>
</template>

<style>
.footer{
    width: 100%; height: 300px;
    padding: 30px 0;
    box-sizing: border-box;
    background-image: linear-gradient(180deg,#f9f29457,#fbf7bb);
}

.footer ul{
    display: flex;
    justify-content: space-around;
    text-decoration: none;  
    margin-top: 50px;
}
.footer li{
    list-style: none;
}
.footer p{
    color: black;
    font-size: 12px;
}
.last p{
    font-size: 15px;
    padding-top: -10px;
}
h4{
    margin-top: 15px;
}
.me{
    width: 100px;
    height: 100px;
}

</style>

