<template>
     <div class="index">
         <topNav></topNav>
        
        <div class="rightContainer"> 
            <router-view></router-view>
        </div>
     </div>
</template>

<script>
import topNav from "../components/topNav";

export default {
    name:"index",
    components:{
        topNav
    }
}
</script>

<style scoped>
    .index{
        width: 80%;
        margin: 0 auto;
    }
    .router-view .rightContainer{
        background-color: antiquewhite
    }
</style>