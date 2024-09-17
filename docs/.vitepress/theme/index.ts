import  defaultTheme from "vitepress/theme"
// import DefaultTheme from 'vitepress/theme-without-fonts'
import MyLayout from "./components/MyLayout.vue"

import './custom.css'

export default {
    extends: defaultTheme ,
    Layout: MyLayout,
    enhanceApp({app}){
        
    }
};