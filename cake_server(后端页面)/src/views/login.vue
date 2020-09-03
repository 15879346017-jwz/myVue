<template>
 <div class="main">
        <h1>
            奢华之选
        </h1>
        <div>
            <input type="text"  placeholder= '管理员账号'  v-model="admin">
            <input type="password" placeholder= '管理员密码' v-model="apwd" >
            <input type="submit" value="登录" @click="aLogin">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{ 
            admin:'',
            apwd:'',
            }
    },
    methods:{
        aLogin(){
            this.axios.get('/server/aLogin',{params:{admin:this.admin,apwd:this.apwd}}).then(res=>{
                let id=res.data[0].about_id;
                sessionStorage.setItem('admin_id',id);
                this.$router.push('/Manage');
            });
        }
    }
}
</script>
<style>
body{
	font-family: 'Cabin', sans-serif !important;
	background:url(../assets/user/login.jpg) 0px 0px;
}
/*-- main --*/
.main{
	width: 35%;
    margin: 8em auto 0;
    padding: 0em 4em 5em;
}
.main h1{
	color: #791a1e;
    text-align: center;
    font-size: 2.5em;
    margin: 0 0 1.5em;
}
.main input[type="text"],.main input[type="password"]{
	outline: none;
    border: 1px solid #FFF;
    background: #fed2ed;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
    padding: 15px 10px;
    width: 96%;
    font-size: 1.3em;
    color: #7e8fad;
    text-align: center;
    font-family: 'Syncopate', sans-serif;
}
.main input[type="password"]{
	margin:1.5em 0;
}
.main input[type="submit"]{
	outline:none;
	border:1px solid #DBA9C8;
	background:#b47c9f;
	border-radius:5px;
	-webkit-border-radius:5px;
	-moz-border-radius:5px;
	-o-border-radius:5px;
	-ms-border-radius:5px;
	padding:35px 10px;
	width:100%;
	color:#fdbfe6;
	font-size:1.5em;
	font-family: 'Syncopate', sans-serif;
	cursor:pointer;
}
.main input[type="text"]:hover{
    border: 1px solid #b47c9f;
}
.main input[type="password"]:hover{
    border: 1px solid #b47c9f;
}
.main input[type="submit"]:hover{
	background:#fed2ed;
	color:#b47c9f;
	border: 1px solid #FFF;
}
</style>