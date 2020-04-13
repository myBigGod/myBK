

<template>
   <div class="contain">
        <el-form ref="registerForm" :model="registerUser" :rules="rules" class="registerForm" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="registerUser.name"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerUser.email"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="registerUser.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="subFrom('registerForm')" class="submit_btn">注册</el-button>
                <el-button type="primary" icon="el-icon-s-home" class="home-ico"><router-link to="/index">主页</router-link></el-button>
                <el-button type="primary"><router-link to="/login">已有账号？登陆</router-link></el-button>
            </el-form-item>
        </el-form>
   </div>
</template>

<script>
export default {
    name:"register",
    data(){
        return{
            registerUser:{
                name:"",
                email:"",
                password:""
            },
            rules:{
                name:[
                    {required:true,message:"用户名不能为空",trigger:"blue"},
                ],
                email:[
                    {type:"email",required:true,message:"email格式不对",trigger:"blue"}
                ],
                password:[
                    {required:true,message:"用户名不能为空",trigger:"blue"},
                    {min:6,max:12,message:"密码长度为6~12"}
                ]
            }
        }
    },
    methods:{
        subFrom(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    this.$axios.post("/api/users/register",this.registerUser).then(res=>{
                        // const {token} = res.data;
                        // localStorage.setItem("eleToken",token);
                        // this.$router.push("/index");
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
        width: 30%;
        margin: 100px auto;
        text-align: center;
    }
    a{
        color: #FFF;
        text-decoration: none;
    }
</style>