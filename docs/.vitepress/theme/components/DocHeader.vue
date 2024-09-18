<template>
    <div class="header">
<h1>{{ data.title }}</h1>
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
    font-size:2.5rem;
    text-align: center;
    position: relative;
    margin-bottom: 10px;
    line-height: 1.5;
}
h1::after{
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: black;
    width: 100%;
    margin-bottom: 10px;
}
span{
    /* border-bottom: none; */
    margin: 3px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%,rgba(11, 105, 200,0.5) 50%, rgb(11, 105, 200,0.5) 100%);
  /* padding: 5px; */
  position: relative;
  padding: 2px;
  outline: 1px;
  border-radius: 10px;

}
.header{
    margin-bottom: 50px;
}

</style>
