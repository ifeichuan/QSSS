<template>
    <a href="/">back to home</a>
    <div id="gitalk-container">

    </div>
</template>

<script lang='ts' setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onContentUpdated, useRouter } from "vitepress";

// const { route, go } = useRouter();
function deleteChild(element: HTMLDivElement | null) {
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}
onContentUpdated(() => {
  // reset gittalk element for update
  const element = document.querySelector("#gitalk-container");
  if (!element) {
    return;
  }
  deleteChild(element);
  const gitalk = new Gitalk({
    clientID:'Ov23liwzcxCw5gaywY5K',
    clientSecret:'4f8318a101f427a94c16c1c0bde57b48a89afab6',
    repo:'QSSS',
    owner:'ifeichuan',
    admin:['ifeichuan'],
    id: location.pathname.substring(0, 50),
    // title:'WebComments' ,
    language: "zh-CN",
    distractionFreeMode: true, // Facebook-like distraction free mode
  });
  gitalk.render("gitalk-container");
});
</script>

<style>
/*  样式  */

</style>