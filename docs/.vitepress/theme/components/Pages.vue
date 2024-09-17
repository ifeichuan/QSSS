<template>
    <div class="container">
        <h2>Blogs</h2>
    </div>
    <div class="pages">
        <div class="page" v-for="post in theme.posts" :key="post.link">
            <!-- <div class="content"> -->
                <a :href="post.link">
            <div class="title">{{post.text}}</div>
            <div class="date">{{post.date}}</div>
        </a>
        <!-- </div> -->
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useData } from 'vitepress';
const {theme} = useData()
console.log(theme.value.posts)

</script>

<style scoped>
.container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
h2{
    font-size: 2rem;
    font-weight: 600;
}
.pages{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.page{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;    
    margin:20px;
    width: 60vw;
    max-width: 800px;
    border: 3px solid;
    border-radius: 10px;
    box-shadow: 5px 5px;
}
.page .title{
    font-size: 1.5rem;
    font-weight: 600;
}
.title,.date{
    margin: 5px;
}
.page:hover{
    background:linear-gradient(to right, #0079d5, #0079d5);
}
</style>