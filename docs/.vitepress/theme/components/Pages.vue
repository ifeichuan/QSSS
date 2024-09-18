<!--主页的文章链接组件 -->
<template>
    <div class="container">
        <h2>Blogs</h2>
    </div>
    <div class="pages">
        <div class="page" v-for="post,index in currPagePosts" :key="index" >
            <!-- <div class="content"> -->
                <a :href="post.link">
            <div class="title">{{post.text}}</div>
            <div class="date">{{post.date}}</div>
        </a>
        <!-- </div> -->
        </div>
        <div class="pageFoot">
            <!-- 11111111111 -->
            <div class="previous"><button @click="减少页数()">Previous Page</button></div>
            <div class="currpage">{{ currPage+1 }}/{{ pages }}</div>
            <div class="next"><button @click="增加页数()">Next Page</button></div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useData } from 'vitepress';
import { reactive, Ref, ref, toRef } from 'vue';
const {theme} = useData()
// console.log(theme.value.posts)
let posts:Ref = toRef(theme.value.posts)
console.log(posts);

const pageSize:any = theme.value.pageSize
const postsLength:any = theme.value.postsLength

console.log(pageSize,postsLength);

let pages = Math.ceil(postsLength/pageSize)
let currPage = ref(0)
let allMap = reactive({})
for(let i = 0;i<pages;i++){
    // 增加键值对
    allMap[i] = [];
}
console.log(allMap[0].length);

let index = 0
for(let i =0;i<postsLength;i++){
    if(allMap[index].length<pageSize){
        allMap[index].push(posts.value[i])
    }
    else index++
}
console.log(allMap);
let currPagePosts = reactive(allMap[0])
function go(index:number){
    console.log(allMap[index]);
    currPagePosts = allMap[index]
    console.log(currPagePosts);
    
}

function 减少页数(){
    if(currPage.value>0){
        currPage.value--
        go(currPage.value)
        if(currPage.value==0){
            let previous = document.querySelector('.previous')
            previous.style.visibility="hidden";
        }
    }
}
function 增加页数(){
    let previous = document.querySelector('.previous')
    previous.style.visibility="visible";
    if(currPage.value<pages){
        currPage.value++
        go(currPage.value)
    }
}
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
    /* border: 3px solid; */
    border-radius: 10px;
    box-shadow: 5px 5px ;
    transition: all .3s ease;
    outline:  3px solid;
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
    transform: translate(-5px,-5px);
    box-shadow: 5px 5px 0px 3px;
}

.pageFoot{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
    max-width: 800px;
    border: 3px solid;
    position: relative;
}
.previous{
    visibility: hidden;
    align-self: flex-start;
    margin: 10px;
}
.next{
    margin: 10px;
}
.currpage{
    /* position: absolute; */
    margin: 10px;
}
</style>