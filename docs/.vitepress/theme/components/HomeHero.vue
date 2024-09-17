<template>
  <div class="container">
    <FeiChuan/>
    
  </div>
  <div class="introduce">
    <h1> A newbie who dreams of becoming a full-stack developer<span style="font-size: x-large;">👋</span>.</h1>
  </div>
</template>

<script lang='ts' setup name="HomeHero">
import { useData } from 'vitepress';
import FeiChuan from './FeiChuan.vue';
const Data = useData()
// console.log(Data)
// console.log(Data.theme.value.postsLength)
</script>

<style scoped>
/*  样式  */
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  margin-top: 100px;
}
.introduce{
  /* margin:10px; */
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  text-align: center;
}
</style>