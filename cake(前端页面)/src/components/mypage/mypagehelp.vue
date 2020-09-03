<template>
    <div class="mypage-help">
        <div class="page_aside_detail" >
            <!-- style="display: none;" -->
            <div class="detail_title">
                帮助中心
            </div>
            <div class="detail_mod">
                <div class="detail_mod_form">
                    <div class="newcode">
                        <ul>
                            <li>
                                <span class="connect_tt">联系我们</span><br>
                                <span
                                    class="connect_tex">为了给予您更优质的服务，请拨打品质奢华的400服务热线提出您的宝贵建议或任何疑问，品质奢华在此感谢您的信任与支持。</span><br>
                                <span class="connect_tex">客服电话：4006-678-678（8:00 - 20:00)</span><br>
                               

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'mypage-help'   
    }
</script>
<style>
     .mypage-help .page_aside_detail {
    position: relative;
    width: 965px;
    height: 550px;
}
.mypage-help .detail_title {
    color: #791a1e;
    font-size: 16px;
    padding-bottom: 10px;
}
.mypage-help .detail_mod {
    height: 400px;
    width: 100%;
    border: 1px solid #e1e1e2;
    /* position: relative; */
}
.mypage-help .detail_mod_form {
    padding: 26px;
    text-align: left;
}
.mypage-help .newcode {
    margin: 0 auto;
}
   .mypage-help .connect_tt {
    font-size: 14px;
    color: #595757;
    font-weight: 700;
}

.mypage-help .connect_tex {
    font-size: 14px;
    color: #595757;
    font-weight: 400;
}
</style>