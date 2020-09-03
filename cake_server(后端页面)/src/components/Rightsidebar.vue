<template>
<div>
    <div class="collapse">
		<img src="../assets/icon/true.png">
		<div class="head" @click="show">
			<div>
				<img src="../assets/head/head.png">
			</div>
			<span>Hi! 超级管理员</span>
			<img src="../assets/icon/arrow.png">
			</div>
		<div class="subscript"></div>
    </div>
	<div class="drop-down" v-show="isShow">
        <ul>
            <li>
                <div>基本信息
                <img src="../assets/icon/essential.png">
				</div>
            </li>
            <li>
                <div>用户设置
                <img src="../assets/icon/user.png">
				</div>
            </li>
            <li>
                <div>使用说明
                <img src="../assets/icon/instructions.png">
				</div>
            </li>
            <li>
				<div @click="leaveAdmin">退出登录
                <img src="../assets/icon/out.png">
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<style scoped>
	.collapse{
		height: 55px;
		float:right;
		position: relative;
	}
 	.collapse>img:first-child{
		width:24px;
		height: 24px;
		cursor: pointer;
		position: absolute;
		top:-21px;
		right: 226px;
	}
	.head{
		width: 150px;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		top:-28px;
		right: 56px;
	}
	.head>div:first-child{
		display: inline-block;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: #fff;
		position: relative;
		vertical-align:middle;
		margin-right: 8px;
		cursor: pointer;
	}
	.head>div:first-child>img{
		position: absolute;
		top:2px;
		left:2px;
	}
	.head>span{
		color:#fff;
		font-size: 13px;
		cursor: pointer;
	}
	.head>img{
		vertical-align:middle;
		cursor: pointer;
	}
	.drop-down{
        position: absolute;
        background: #fff;
        margin-top: 0;
        border: 1px solid #D9DEE4;
        right: 19px;
        top:70px;
        width: 160px;
        z-index: 33;
        padding: 5px 0;
    }
	.drop-down li a{
		color:#777777;
		text-decoration: none;
	}
    .drop-down li{
        padding:8px 30px;
        font-size: 13px;
        cursor: pointer;
    }
    .drop-down li img{
        vertical-align: middle;
        float:right;
    }
    .drop-down ul::before{
        content: "";
        display: inline-block;
        border: 8px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        top: -16px;
        right: 40px;
    }
</style>
<script>
export default {
	data(){
		return {isShow:false}
		
	},
	methods:{
		show(){
			this.isShow=!this.isShow
			// (this.isShow==1?0:1);
		},
		leaveAdmin(){
		sessionStorage.clear();
		this.$router.push('/');
	    }
	},
    
}
</script>