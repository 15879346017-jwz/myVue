<template>
    <div class="my-pageadd">
        <div class="page_aside_detail">
            <div class="ad_title">
                地址管理
                <span class="ad_num" v-text="'已保存'+alladd.length+'个收货地址(最多添加4个)'"></span>
                <button class="ad_btn" @click="showadd">添加收货地址</button>
            </div>
            <div class="detail_mod">
                <!-- 添加地址 -->
                <div class="ad_admain" v-show="addshow">
                    <ul class="add_ul">
                        <li>
                            <span class="ad_china">
                                <label class="add_text" for="">
                                    <em class="em_1">*</em>
                                    详细地址:
                                </label>
                                <input v-model="newadd" type='text' class="add_ad" name='' @blur="textadd">
                                <span v-show="tadd" class="coderr">
                                    <p class="err"></p>
                                    <p>详细地址不能为空</p>
                                </span>
                                <br>
                            </span>
                        </li>
                        <li>
                            <span class="ad_china">
                                <label class="add_text" for="">
                                    <em class="em_1">*</em>
                                    收货人姓名：
                                </label>
                            </span>
                            <input type='text' v-model="add_name" class="" name='' @blur="textname">
                            <span v-show="tname" class="coderr">
                                <p class="err"></p>
                                <p>收货人姓名不能为空</p>
                            </span>
                            <br>
                        </li>
                        <li>
                            <span class="ad_china">
                                <label class="add_text" for="">
                                    <em class="em_1">*</em>
                                    联系电话：
                                </label>
                            </span>
                            <input type='text' v-model="add_phone" class="" name='' @blur="textphone">
                            <span v-show="tphone" class="coderr">
                                <p class="err"></p>
                                <p>联系电话格式不正确</p>
                            </span>
                            <br>
                        </li>
                        <li class="add_btn_li">
                            <button class="add_btn add_btn1" @click="addnew">确定</button>
                            <button class="add_btn add_btn2" @click="showadd">取消</button>
                        </li>
                    </ul>
                </div>

                <!-- 添加地址结束 -->
                <!-- 地址详情页开始 -->
                <div class="">
                    <!-- style="display: none;" -->
                    <div>
                        <ul class="ad_ul">
                            <li class="ad_li1 ad_li11">地址</li>
                            <li class="ad_li2 ad_li11">收货人</li>
                            <li class="ad_li3 ad_li11">联系电话</li>
                            <li class="ad_li4 ad_li11">操作</li>
                        </ul>
                    </div>
                    <div v-for="(
                        item, i) of add" :key="i">
                        <ul class="ad_ul">
                            <li class="ad_li1 ad_1" v-text="item"></li>
                            <li class="ad_li2" v-text="alldata.add_name"></li>
                            <li class="ad_li3" v-text="alldata.add_phone"></li>
                            <li class="ad_li4">

                                <span class="ad_tex" @click="adddelete(i)">删除</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 地址详情结束 -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'my-pageadd',
        data() {
            return {
                tadd: false,
                tname: false,
                tphone: false,
                addshow: false,
                alldata: {},
                alladd: [],
                add: {},
                newadd: '',
                add_name: '',
                add_phone: '',
                user_id: sessionStorage.getItem('$user_id')
            }
        },
        methods: {

            showadd: function () {
                if(this.alladd.length>=4){
                    alert('地址已达到上限')
                }else{
                this.addshow = !this.addshow
                }
            },
            adddelete: function (i) {
                let user_id = sessionStorage.getItem('$user_id')
                if (false) {

                } else {
                    this.axios.post('/case/adddel', 'user_id=' + user_id + '&add_add=' + i).then(res => {
                        let data = res.data
                        // console.log(data)
                        // this.$router.go(0);
                        this.$emit('famod');
                    });
                }
            },
            addnew: function () {
                if (this.textphone()&&this.textname()&&this.textadd()) {
                    let user_id = sessionStorage.getItem('$user_id')
                    // console.log(user_id)
                    let add_add = ''
                    let add = this.add
                    if (this.alladd.length < 4) {
                        for (var i = 1; i < 5; i++) {
                            // console.log(i)
                            let str = "add_add" + i
                            let n = str in add
                            if (!n) {
                                add_add = str
                                break
                            }
                        }
                        // console.log(add_add)
                        // console.log(this.add_name)
                        // console.log(this.add_phone)
                        this.axios.post('/case/addnew', `user_id=${user_id}&${add_add}=${this.newadd}&add_name=${this.add_name}&add_phone=${this.add_phone}`).then(res => {
                            let data = res.data
                            // console.log(data)
                            // this.$router.go(0);
                            this.$emit('famod');
                        })
                    } else {
                        alert('地址已达到上限')
                    }
                }
            },
            textphone() {
                let unameReg = /^1[3456789]\d{9}$/;
                let uphone = this.add_phone;
                //判断账号是否符合要求
                if (unameReg.test(uphone)) {
                    this.tphone = false
                    return true
                } else {
                    this.tphone = true
                    return false
                }
            },
            textadd() {
                var str = this.newadd
               var res = str.trim();
                if (res.length == 0) {
                    this.tadd = true
                    return false
                } else {
                    this.tadd = false
                    return true
                }
            },
            textname() {
                var str = this.add_name
                var res = str.trim();
                if (res.length == 0) {
                    this.tname = true
                    return false
                } else {
                    this.tname = false
                    return true
                }
            }
        },
            mounted() {
                console.log(this.add, 1)
                let user_id = sessionStorage.getItem('$user_id')
                this.axios.get('/case/add/?user_id=' + user_id).then(res => {
                    let data = res.data.results[0]
                    this.alldata = data
                    let obj = {}
                    for (let i = 1; i <= 4; i++) {

                        for (let key in data) {
                            let str = key.toString()
                            if (str == ('add_add' + i)) {
                                // console.log(data[key])
                                if (data[key]) {
                                    obj[key] = data[key]
                                    // console.log(obj)
                                    this.alladd.push(data[key])
                                }
                            }
                        } this.add = obj
                    }
                    // console.log(this.add)
                })
            },
        }
</script>
<style>
    .my-pageadd .page_aside_detail {
        position: relative;
        width: 965px;
        height: 550px;
    }



    .my-pageadd input {
        height: 26px;
        border: 1px solid #e1e1e2;
        outline: none;
        padding-left: 10px;
    }

    .my-pageadd .ad_title {
        color: #791a1e;
        font-size: 16px;
        padding-bottom: 15px;
    }

    .my-pageadd .ad_num {
        font-size: 14px;
        color: #595757;
    }

    .my-pageadd .ad_btn {
        padding: 4px;
        position: absolute;
        right: 0;
        cursor: pointer;
    }

    .my-pageadd .ad_ul {
        display: flex;
        flex: row;
        justify-content: space-around;
    }

    .my-pageadd .ad_ul li {
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #595757;
    }



    .my-pageadd .my-pageadd .ad_li11 {
        background-color: #DCDDDD;
        text-align: center;
        font-size: 14px;
        color: #666666;
    }

    .my-pageadd .ad_li1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 27%;
        height: 40px;
    }

    .my-pageadd .ad_li2 {
        width: 11%;
        height: 40px;
    }

    .my-pageadd .ad_li3 {
        width: 20%;
        height: 40px;
    }

    .my-pageadd .ad_li4 {
        /* width: 42%; */
        height: 40px;
    }

    .my-pageadd .ad_ul .ad_1 {
        text-align: left;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .my-pageadd .ad_defalut {
        background-color: #791a1e;
        color: #fff;
        padding: 4px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .my-pageadd .ad_tex {
        color: #791a1e;
        font-size: 14px;
        cursor: pointer;
        margin-left: 10px;
        text-align: center;
    }

    /* 添加地址的 */
    .my-pageadd .ad_admain {
        width: 100%;
        padding: 15px;
        position: absolute;
        background-color: #fff;
    }

    .my-pageadd .ad_china label {
        width: 96px;
        height: 25px;
        display: inline-block;
    }

    .my-pageadd .em_1 {
        color: red;
    }

    .my-pageadd .add_text {
        font-size: 14px;
        color: #595757;
        text-align: right;
    }

    .my-pageadd .add_ul {
        padding: 15px;
        border: 1px solid #e1e1e2;
    }

    .my-pageadd .add_ul li {
        margin-bottom: 10px;
        text-align: left;
    }

    .my-pageadd .add_ad {
        width: 360px;
    }

    .my-pageadd .add_btn {
        width: 60px;
        height: 25px;
        outline: none;
        border: 0;
        cursor: pointer;
    }

    /* 地址框 */
    .my-pageadd .x-select {
        font-size: 12px;
        padding: 2px;
        outline: none;
    }

    .my-pageadd .x-select option {
        outline: none;
    }

    .my-pageadd .add_btn1 {
        background-color: #791a1e;
        color: #fff;
    }

    .my-pageadd .add_btn2 {
        background-color: #fff;
        border: 1px solid #CCCCCC;
        margin-left: 20px;
    }

    .my-pageadd .add_btn2:hover {
        background-color: #EBEBEB;
    }

    .my-pageadd .add_btn_li {
        margin-left: 96px;
    }

    .my-pageadd .coderr p:first-child {
        width: 12px;
        height: 12px;
        text-indent: -999px;
        overflow: hidden;
        display: inline-block;
        background: url(../../assets/image/cart/icons.png) no-repeat right -100px;
        margin-left: 10px;
    }

    .my-pageadd .coderr p {
        padding-left: 10px;
        display: inline-block;
    }

    .my-pageadd .coderr {
        color: #d9260f;
        vertical-align: middle;
        display: inline-block;
        line-height: 16px;
        font-size: 12px;
    }
</style>