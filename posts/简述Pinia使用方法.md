---
title: 简述Pinia使用方法
source: 
aliases: 
tags:
  - Vue
  - Pinia
date_created: 星期4 2025-03-06, 3:51:35 下午
date_modified: 星期4 2025-03-06, 4:52:52 下午
---

# 简述Pinia使用方法
## 安装
`pnpm install pinia`

创建实例
```ts 
// main.ts
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from 'App.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
```

## 使用
### 定义Store
这里我们只展示Vue3 组合式API setup的写法 因为我只会Vue3（😎）
```ts
// counter.ts
import {defineStore} from 'pinia'
// Pinia官方推荐的命名方式 use + id +  Store 其中id为你想要的名称 如search，counter,user 
// 通过defineStore的方式定义 第一个参数是一个字符串,作为全局唯一ID,第二个参数为一个回调
export const useCounterStore = defineStore('counter',()=>{
	const count = ref(0)
	const doubleCount = computed(() => count.value * 2)
	function increment() {
	    count.value++
	  }
	  return { count, doubleCount, increment }
})
```
**通过Pinia定义的Store是全局的,也就是你从任意组件中引入的Store都共享着同一份数据(state）及方法（action)还有getters（computed）**
>在 _Setup Store_ 中：
>
>  - `ref()` 就是 `state` 属性
>  - `computed()` 就是 `getters`
>  - `function()` 就是 `actions`
>注意，要让 pinia 正确识别 `state`，你**必须**在 setup store 中返回 **`state` 的所有属性**。这意味着，你不能在 store 中使用**私有**属性。不完整返回会影响 [SSR](https://pinia.vuejs.org/zh/cookbook/composables.html) ，开发工具和其他插件的正常运行。

### 使用Store
```ts
import {useCounterStore} from '@/stores/counter'
const counter = useCounterStore()
// 不要解构返回的state !!! 如果需要单独提取 但是只会返回state和getter 并跳过所有action和非响应式属性
const {count,doubleCount} = sotreToRefs（counter) 
// action可以直接解构
const {increment} = store
```


## State
Pinia可以自动推断类型 你也可以用一个接口定义state,并添加`state()`的返回类型
```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```
### 访问state
默认情况下可以通过`store`实例访问`state`,并直接进行**读写**
```ts
const store = useStore() 
store.count++
```
注意，新的属性**如果没有在 `state()` 中被定义**，则不能被添加。它必须包含初始状态。例如：如果 `secondCount` 没有在 `state()` 中定义，我们无法执行 `store.secondCount = 2`
### 重置state
在选项式API中,store自带了`store.$rest()`方法,但是在组合式API中,我们需要自己创建`$rest()`方法
```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### 变更state
除了使用 `store.count++` 直接改变`store`,pinia还支持使用`$patch`（补丁）方法,它允许你用一个`state`的补丁对象在同一时间更改多个属性:
```ts
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```
但是更推荐的方法是使用匿名函数来实现
```ts
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

### 替换state
 为啥要替换 ?不是很理解 所以如果想了解就看官网去吧
 [State | Pinia](https://pinia.vuejs.org/zh/core-concepts/state.html)

## 监听|订阅 State
和使用 watch 一样只不过换成了 
`$subscribe`