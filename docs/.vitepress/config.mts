import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import fs from 'fs'
import { getPostsLength,getPosts } from './theme/serverUtils'
import { RssPlugin,RSSOptions } from 'vitepress-plugin-rss'

// https://vitepress.dev/reference/site-config
let RSS:RSSOptions ={
  title:"扉川川のBlog",
  baseUrl:"https://feichuans.com",
  copyright:"Copyright © 2024 扉川川",
  
}
async function config(){
  return {lang: "zh-CN",
  cleanUrls: true,
  srcDir: resolve(__dirname, '../../'),
  title: "扉川川のBlog",
  description: "这个人很懒,还没有写介绍",
  head:[
    // ['link',{rel:'icon',href:'/public/logo.jpg'}],
  ],
  rewrites:{
    // "/posts/:page": "/:page.md"
  },
  vite:{
    plugins:[RssPlugin(RSS)]
  },
  themeConfig: {
    siteTitle:"扉川川の博客",
    posts:await getPosts(),
    pageSize: 5,
    postsLength: await getPostsLength(),
    logo: '/logo.jpg',
    search: {
      provider:"local"
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/archives' }
    ],
    // aside: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown:{
    math:true,
    config:(md)=>{
      md.options.breaks=true
    }
  },
  base:'/',
  }
}
export default config
