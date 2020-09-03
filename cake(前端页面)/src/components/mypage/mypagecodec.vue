<template>
    <div class="my-pagecodec">
        <div class="page_aside_detail">
            <div class="detail_title">
                修改密码
            </div>
            <div class="detail_mod">
                <div class="detail_mod_form">
                    <div class="newcode">
                        <ul>
                            <li>
                                <span class="detail_form_span">新密码:</span>
                                <input v-model="newpassword" class="detail_inpa" placeholder="请输入请输入8~12位新密码"
                                    type='password' name=''  @blur="checknewcode">
                                <span v-show="code1" class="coderr">
                                    <p></p>
                                    <p> 输入不正确，请输入8~12个字符</p>
                                </span>
                                <br>
                            </li>
                            <li>
                                <span class="detail_form_span">确认密码:</span>
                                <input placeholder="确认密码" v-model="newpassword2" class="detail_inpa" type='password'
                                    @blur="checkcode" name=''>
                                <span v-show="code2" class="coderr">
                                    <p></p>
                                    <p>两次密码输入不相符，请重新输入</p>
                                </span>
                                <br>
                            </li>
                            <li> <button class="detail_code_btn" @click="codecertain">确 定</button> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'my-pagecodec',
        data() {
            return {
                newpassword: '',
                newpassword2: '',
                code1: false,
                code2: false

            }
        },
        methods: {

            checkcode: function () {
                
                if (this.newpassword !== this.newpassword2) {
                    this.code2 = true
                } else {
                    this.code2 = false
                }
            
            },
            checknewcode: function () {
                let upwdReg = /^[\w.]{8,12}$/;
                // console.log(this.newpassword)
                // console.log(upwdReg.test(this.newpassword))
                if (upwdReg.test(this.newpassword)) {
                    // console.log(upwdReg.test(this.newpassword))
                    this.code1 = false
                } else {
                    this.code1 = true
                }
                
            },
            codecertain: function () {
                this.checkcode()
                let user_id=sessionStorage.getItem('$user_id')
                // console.log(user_id)
                // console.log(this.code1,this.code2)
                if (!this.code1 && !this.code2) {
                    this.axios.post('/case/changecode', 'newpassword='+ this.newpassword+'&user_id=' + user_id ).then(res => {
                        // console.log(res)
                        if (res.data.code==1) {
                            alert('修改成功')
                            // this.$router.go(0);
                            this.$emit('famod');
                        }
                    })
                } else {
                     alert('密码不一样')
                }
            }
        },
    }
</script>
<style>
    .my-pagecodec .page_aside_detail {
        position: relative;
        width: 965px;
        height: 550px;
    }

    .my-pagecodec .detail_title {
        color: #791a1e;
        font-size: 16px;
        padding-bottom: 10px;
    }

    .my-pagecodec .detail_mod_title {
        line-height: 40px;
        background-color: #f7f8f8;
        border-bottom: 1px solid #e1e1e2;
        padding-left: 26px;
        color: #791a1e;
        font-size: 14px;
    }

    .my-pagecodec .detail_mod {
        height: 400px;
        width: 100%;
        border: 1px solid #e1e1e2;
        /* position: relative; */
    }

    .my-pagecodec .detail_mod_form {
        padding: 26px;
        padding-left: 330px;
    }

    .my-pagecodec .detail_mod_form li {
        height: 46px;
    }

    .my-pagecodec .detail_form_span {
        width: 64px;
        font-size: 14px;
        display: inline-block;
    }

    .my-pagecodec .detail_inpa {
        width: 198px;
        height: 26px;
        border: 1px solid #e1e1e2;
        outline: none;
    }

    .my-pagecodec .detail_form_btn {
        width: 90px;
        height: 30px;
        background: #791a1e;
        filter: none;
        color: #fff;
        outline: none;
        border: 0;
        cursor: pointer;
    }

    /* 修改密码界面 */

    .my-pagecodec input {
        outline: none;
        border: 1px solid #A9A9A9;
        padding-left: 10px;
        height: 21px;
    }

    .my-pagecodec .newcode {
        margin: 0 auto;
        text-align: left;
    }

    .my-pagecodec .detail_code_btn {
        width: 200px;
        height: 32px;
        background: #791a1e;
        color: #fff;
        outline: none;
        border: 0;
        cursor: pointer;
        margin-left: 65px;
    }

    .my-pagecodec .coderr p:first-child {
        width: 12px;
        height: 12px;
        text-indent: -999px;
        overflow: hidden;
        display: inline-block;
        background: url(../../assets/image/cart/icons.png) no-repeat right -100px;
        margin-left: 10px;
    }

    .my-pagecodec .coderr p {
        padding-left: 10px;
        display: inline-block;
    }

    .my-pagecodec .coderr {
        color: #d9260f;
        vertical-align: middle;
        display: inline-block;
        line-height: 16px;
        font-size: 12px;
    }
</style>