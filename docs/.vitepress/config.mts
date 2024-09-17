import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import fs from 'fs'
import { getPostsLength,getPosts } from './theme/serverUtils'


// https://vitepress.dev/reference/site-config
async function config(){
  return {lang: "zh-CN",
  cleanUrls: true,
  srcDir: resolve(__dirname, '../../'),
  title: "扉川川のBlog",
  description: "A VitePress Site",
  head:[
    // ['link',{rel:'icon',href:'/public/logo.jpg'}],
  ],
  rewrites:{
    // "/posts/:page": "/:page.md"
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
      { text: '文章', link: '/archives' }
    ],
    // aside: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
  }
}
export default config
