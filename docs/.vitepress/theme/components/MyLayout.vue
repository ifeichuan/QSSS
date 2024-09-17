<template>
  <Layout>
      <!-- <template #layout-top style="background:rgba(0, 0, 0, 0.5);"></template> -->
      <template #doc-before></template>
      <template #doc-footer-before><DocFooter/></template>
      <!-- Home Slot -->
       <template #home-hero-after><HomeHero/></template>
       <template #home-features-after><Pages/></template>
  </Layout>
  </template>
  
  <script lang='ts' setup>
  import  DefaultTheme  from 'vitepress/theme';
  import HomeHero from './HomeHero.vue';
  import { useData } from 'vitepress';
  import { nextTick, provide } from 'vue'
  import Pages from './Pages.vue'
  const {Layout} = DefaultTheme
  const { isDark } = useData()
  // 检查浏览器是否支持视图过渡和用户是否偏好减少动画
  // 如果支持，则允许视图过渡
  // 如果不支持，则直接切换主题
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }
    
    // 创建一个从底部向上的矩形裁剪路径动画
    const clipPath = [
      
      `inset(100% 0 0 0)`,
      `inset(0 0 0 0)`
    ]
    
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready
  
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 800, // 增加持续时间以更好地观察效果
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // 使用自定义的缓动函数
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
      }
    )
  })
  </script>
  
  <style>
  /*  样式  */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  
  ::view-transition-old(root),
  .dark::view-transition-new(root) {
    z-index: 1;
  }
  
  ::view-transition-new(root),
  .dark::view-transition-old(root) {
    z-index: 9999;
  }
  
  .VPSwitchAppearance {
    width: 22px !important;
  }
  
  .VPSwitchAppearance .check {
    transform: none !important;
  }
  
  /* 添加新的过渡样式 */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  
  ::view-transition-old(root) {
    z-index: 1;
  }
  
  ::view-transition-new(root) {
    z-index: 9999;
  }
  </style>