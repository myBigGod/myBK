<template>
   <div class="contain">
       
            <el-form ref="loginForm" :model="loginUser" :rules="rules" class="loginForm" label-width="80px">
                
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="loginUser.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="subFrom('loginForm')" class="submit_btn">登陆</el-button>
                    <el-button type="primary" icon="el-icon-s-home" class="home-ico"><router-link to="/index">主页</router-link></el-button>
                    <el-button type="primary"><router-link to="/register">没有账号？注册</router-link></el-button>
                </el-form-item>
            </el-form>
       </div>
    
</template>

<script>
export default {
    name:"login",
    data(){
        return{
            loginUser:{
                email:"",
                password:""
            },
            rules:{
                email:[
                    {type:"email",required:true,message:"邮箱格式不对",trigger:"blue"}, 
                ],
                password:[
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ]
            }
        }
    },
    methods:{
        subFrom(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    
                    this.$axios.post("/api/users/login",this.loginUser).then(res=>{
                        console.log(res.data);
                        const {token} = res.data;
                        localStorage.setItem("eleToken",token);
                        this.$router.push("/index");
                    })
                }else {
                    console.log("error submit!!");
                    return false;
                }
            })
           
        }
    }
}
</script>

<style scoped>
    .contain{
        margin: 100px auto;
        width: 30%;
        text-align: center;
    }
    a{
        color: #FFF;
        text-decoration:none;
    }
</style>