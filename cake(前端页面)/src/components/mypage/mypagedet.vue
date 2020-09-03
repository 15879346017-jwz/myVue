<template>
    <div class="my-pagedet">
        <div class="page_aside_detail">
            <!-- style="display: none;" -->
            <div class="detail_title">
                个人资料
            </div>
            <div class="detail_mod">
                <div class="detail_mod_title">基本资料</div>
                <div class="detail_mod_form">
                    <ul>
                        <li>
                            <span class="detail_form_span detail_name">昵称：</span>
                            <input v-model="alldata.nickname" class="detail_inpa" type='text' name=''>
                            <span v-show="nickname" style="margin-left:10px;color: red;">该昵称已被使用</span>
                            <br>
                        </li>
                        <li class="detail_phone">

                            <span class="detail_form_span">手机：</span>
                            <span v-text="alldata.iphone"></span>
                            <!-- <div style="color: #791a1e; margin-left: 10px;">修改手机</div> -->
                        </li>

                        <li>
                            <span class="detail_form_span">邮箱:</span>
                            <input v-model="alldata.email" class="detail_inpa" type='text' name=''><br>
                        </li>
                        <li>
                            <span class="detail_form_span">性别：</span>
                            男<input type="radio" v-model="alldata.user_gender" value="1" name="sex" id=""> 女 <input
                                type='radio' v-model="alldata.user_gender" name='sex' value="0"><br>
                        </li>
                        <li>
                            <button class="detail_form_btn" @click="savechange"> 保存 </button>
                        </li>
                    </ul>
                   <!--  <div class="form_headimg" @click="uploadAvatar">
                        <input type="file" ref='inputFile' @change="imageURL($event)">
                        <span class="iconfont iconjia1"></span>
                        <img :src="userAvatar" alt="">
                       <div class="from_change">
                            <form action="/case/avatar" method="post" enctype="multipart/form-data">
                                <span class="from_avatar" @click="avatar_1" >
                                    <input type="file"   ref="avatarfile" name="avatar" multiple>
                                    style="display: none;" 
                                     v-model="avatarpath" 
                                    <img class="from_img" src="../../assets/image/cart/avatar.png" alt="">
                                    <div class="ava_text">点击选择头像
                                    </div>
                                </span>
                                <p v-text="avatarpath"></p>
                                <p><input type="submit" class="from_upload" value="上传头像"></p>
                            </form>
                        </div> 
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                alldata: {},
                nickname:false,
                // avatarpath:'',
                userAvatar:''
            }
        },
        name: 'my-pagedet'
        ,
        mounted() {
            let user_id = sessionStorage.getItem('$user_id')
            this.axios.get('/case/mypageid/?user_id=' + user_id).then(res => {
                let data = res.data.results;
                this.alldata = data;
                console.log(this.alldata)
            })
        },
        methods: {
            savechange: function () {
                var data
                let user_id = sessionStorage.getItem('$user_id')
                this.axios.post('/case/update', 'nickname=' + this.alldata.nickname + '&user_id=' + user_id+ '&user_gender=' + this.alldata.user_gender+ '&email=' + this.alldata.email+'&user_avatar='+this.alldata.user_avatar).then(res => {
                    data=res.data;
                    if (data.code) {
                    alert('修改成功')
                    
                }else{
                    alert('修改失败')
                    
                }
                });
                this.axios.post('/case/updateAvatar',`user_avatar=${this.userAvatar}&user_id=${user_id}`).then(res=>{
                     
                })
                this.$router.go(0);
                // this.$emit('famod');
                
            },
            uploadAvatar(){
                this.$refs.inputFile.click();
            },
            imageURL(e){
                this.userAvatar=e.target.value;
                 let x=this.userAvatar.lastIndexOf('\\');
                 this.userAvatar=this.userAvatar.slice(x+1);
                 this.alldata.user_avatar=this.userAvatar;
                 this.userAvatar=require('../../assets/userImg/'+this.userAvatar);
            }
           
        }
    }
</script>
<style>
    .my-pagedet .page_aside_detail {
        position: relative;
        width: 965px;
        height: 550px;
    }

    .my-pagedet .detail_title {
        color: #791a1e;
        font-size: 16px;
        padding-bottom: 10px;
    }

    .my-pagedet .detail_mod_title {
        line-height: 40px;
        background-color: #f7f8f8;
        border-bottom: 1px solid #e1e1e2;
        padding-left: 26px;
        color: #791a1e;
        font-size: 14px;
    }

    .my-pagedet .detail_mod {
        height: 400px;
        width: 100%;
        border: 1px solid #e1e1e2;
        /* position: relative; */
    }

    .my-pagedet .detail_mod_form {
        padding-left: 20%;
        padding-top: 5%;
        position: relative;
    }

    .my-pagedet .detail_name::before {
        color: red;
        content: '*';
    }

    .my-pagedet .detail_mod_form li {
        height: 46px;
    }
    .my-pagedet .detail_mod_form ul{
        text-align: left;
    }
    .my-pagedet .detail_form_span {
        width: 64px;
        font-size: 14px;
        display: inline-block;
    }

    .my-pagedet .detail_phone div {
        display: inline-block;
        cursor: pointer;
    }

    .my-pagedet .detail_inpa {
        width: 198px;
        height: 26px;
        border: 1px solid #e1e1e2;
        outline: none;
        padding-left: 10px;
    }

    .my-pagedet .detail_form_btn {
        width: 90px;
        height: 30px;
        background: #791a1e;
        filter: none;
        color: #fff;
        outline: none;
        border: 0;
        cursor: pointer;
    }
    .my-pagedet .detail_form_btn:active{
        background: #521215;
    }
    .my-pagedet .form_headimg{
        width: 160px;
        height: 160px;
        position: absolute;
        top: 20%;
        left: 60%;
        border-radius: 50%;
        background-color: pink;

    }
    .my-pagedet .form_headimg>input{
        display: none;
    }
    .my-pagedet .form_headimg>span{
        position: absolute;
        top: 33%;
        left: 35%;
        font-size: 50px;
        color: #E1E1E2;
    }
    .my-pagedet .form_headimg div{
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }
    .my-pagedet .from_avatar{
        display: block;
        height: 150px;
        width: 150px;
        border-radius: 75px;
        border: 1px solid #333333;
        position: relative;
    }
    .my-pagedet .from_avatar .ava_text{
        top: 0 ;
        left: 0;
        margin: auto auto;
        opacity: 0;

    }
    .my-pagedet .from_avatar:hover img{
        color: #999999;
        opacity: .7;
        z-index: 2;
    }
    .my-pagedet .from_avatar:hover .ava_text{
        opacity: 1;
    }
    .my-pagedet .from_img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 1;

    }
    /* .my-pagedet .from_avatar:hover{
        opacity: .7;
        content: '点击上传';
    } */
    .my-pagedet .from_upload{
        outline: none;
        margin-top: 10px;
    }
   
    .my-pagedet .ava_text{
        text-align: center;
        align-items: center;
        box-sizing: border-box;
        padding-top: 75px;
        color: #999999;
        
    }


</style>