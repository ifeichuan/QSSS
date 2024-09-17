<template>
  <div class="container">
    <FeiChuan/>
  </div>
  <div class="title">
    <span>A newbie who dreams of becoming a full-stack developer👋.</span>
  </div>
</template>

<script lang='ts' setup name="HomeHero">
import { useData } from 'vitepress';
import FeiChuan from './FeiChuan.vue';
const Data = useData()
console.log(Data)
console.log(Data.theme.value.postsLength)
</script>

<style scoped>
/*  样式  */
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  margin-top: 100px;
}
.title{
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 50px;
}
</style>