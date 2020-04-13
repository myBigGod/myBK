<template>
    <div class="top-Nav">
        <el-menu class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="login">登陆</el-menu-item>
        <el-menu-item index="3" @click="register">注册</el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
    name:"top-Nav",
    methods:{
        login:function(){
            this.$router.push("/login");
        },
        register:function(){
            this.$router.push("/register");
        }
    }
}
</script>