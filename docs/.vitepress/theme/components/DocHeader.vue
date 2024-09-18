<template>
    <div class="header">
<h1>{{ data.title }}</h1>
<hr>
tags:<span v-for="tag,index in tags" :key="index">{{ tag }}</span>
</div>
</template>

<script lang='ts' setup>
import { useData,useRoute } from 'vitepress';
const {data} = useRoute()
let tags:Array<string> = data.frontmatter.tags

</script>

<style scoped>
/*  样式  */
h1{
    font-size: 2rem;
    text-align: center;
}
span{
    /* border-bottom: none; */
    margin: 3px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%,rgba(11, 105, 200,0.5) 50%, rgb(11, 105, 200,0.5) 100%);
  /* padding: 5px; */
  position: relative;
  padding-bottom: 2px;
  outline: 1px;
  border-radius: 10px;
}
.header{
    margin-bottom: 50px;
}

</style>