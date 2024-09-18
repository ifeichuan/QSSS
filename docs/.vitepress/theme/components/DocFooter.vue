<template>
    <a href="/">back to home</a>
    <div id="gitalk-container">

    </div>
</template>

<script lang='ts' setup>
import'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk';
import { onMounted } from 'vue';
import { useRoute } from 'vitepress';

// console.log(useRoute().data.title);

const gitalk = new Gitalk({
    clientID:'Ov23liwzcxCw5gaywY5K',
    clientSecret:'4f8318a101f427a94c16c1c0bde57b48a89afab6',
    repo:'QSSS',
    owner:'ifeichuan',
    admin:['ifeichuan'],
    id:location.href,
    title: useRoute().data.title
})
onMounted(()=>{
    gitalk.render("gitalk-container")
})
</script>

<style>
/*  样式  */

</style>