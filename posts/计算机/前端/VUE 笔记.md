---
title: VUE 笔记
source: 
aliases: 
tags: 
draft: false
date_created: 星期1 2024-07-22, 2:22:53 下午
date_modified: 星期2 2024-09-17, 4:16:43 下午
---

# VUE 笔记

## Ssetup

没有this,数据非响应

可以和VUE2语法共存,且VUE2的语法可以读取setup中的数据,用`this.`,但setup不能读取VUE2的数据,因为setup最先被执行

### Setup语法糖

```vue
<script lang = 'ts' setup>
	varRa = 404
    // 自动返回
</script>
```

省略了返回,但不能和`except `和在一起

### Ref 响应式变量

```vue
import {ref} frm 'vue'
let name = ref('张三')
let age = ref(18)
```



## toRefs/toRef
将对象或变量转变为`ref`对象
相当于指针指向`person`内的`name,age`
```vue 
<script>
let {name,age} = toRefs(person)
let age1 = toRef(person,'age')
</script>
```

## 单向绑定与双向绑定

- `v-bind` 为单向绑定，只能从数据流向页面 
- `v-model` 为双向绑定，可以双向流动

## 计算属性computed
惰性计算,节省计算资源,函数情况下只读,对象情况下可以使用`get`和`set`方法进行读写

```js
<script lang="ts" setup name = 'Person'>

    import { log } from 'console';

import { ref,computed} from 'vue';

    let firstName = ref('zhang')

    let lastName = ref('san')

    //这么计算的fullName是一个计算属性，且只读

    // let fullNmae = computed(()=>{

    //     return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + '-' +lastName.value

    // })

    //这么计算的fullName是一个计算属性，且可读可写

    let fullNmae = computed({

        get(){

            return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + '-' +lastName.value

        },

        set(val){

            const [str1,str2] = val.split('-')

            firstName.value = str1

            lastName.value = str2

            console.log('set',val);

        }

    })

    function changeName(){

        fullNmae .value = '李-四'

    }

</script>
```

## Watch 监视
- 作用：监视数据的变化 
- 特点：`Vue3`中的`watch`只能监视以下四种数据: 
> 1. `ref`定义的数据 
> 2. `reactive`定义的数据 
> 3. 函数返回一个值
> 4. 一个包含上述内容的数组

### 情况一

### 情况二
监视`ref`定义的对象类型数据:直接写数据名,监视的是对象的地址值,若想监视对象内部的数据,要手动开启深度监视
```js 
<script>
    watch(person,(newValue,oldValue)=>{

        console.log(newValue,oldValue);

    },{deep:true,})

</script>
```

第四种情况,监视对象中某个值,可以使用函数式返回该值
一般使用函数式

第五种情况 
```Vue 
    watch([()=>person.car,()=>person.name],(newValue,oldValue)=>{

        console.log(newValue,oldValue);

    },{deep:true})
    
```


## watchEffect
- 官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。
  
- `watch`对比`watchEffect`
  
    > 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
    >     
    > 2. `watch`：要明确指出监视的数据
    >     
    > 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性
    >


## 【标签的 Ref 属性】

作用：用于注册模板引用。

> - 用在普通`DOM`标签上，获取的是`DOM`节点。
>     
> - 用在组件标签上，获取的是组件实例对象。
>     

用在普通`DOM`标签上：
```js
<template>  
  <div class="person">  
    <h1 ref="title1">尚硅谷</h1>  
    <h2 ref="title2">前端</h2>  
    <h3 ref="title3">Vue</h3>  
    <input type="text" ref="inpt"> <br><br>  
    <button @click="showLog">点我打印内容</button>  
  </div>  
</template>  

<script lang="ts" setup name="Person">  
  import {ref} from 'vue'  
      
  let title1 = ref()  
  let title2 = ref()  
  let title3 = ref()  
​  
  function showLog(){  
    // 通过id获取元素  
    const t1 = document.getElementById('title1')  
    // 打印内容  
    console.log((t1 as HTMLElement).innerText)  
    console.log((<HTMLElement>t1).innerText)  
    console.log(t1?.innerText)  
      
        /************************************/  
          
    // 通过ref获取元素  
    console.log(title1.value)  
    console.log(title2.value)  
    console.log(title3.value)  
  }  
</script>
```

用在组件标签上：
```js
<!-- 父组件App.vue -->  
<template>  
  <Person ref="ren"/>  
  <button @click="test">测试</button>  
</template>  
​  
<script lang="ts" setup name="App">  
  import Person from './components/Person.vue'  
  import {ref} from 'vue'  
​  
  let ren = ref()  
​  
  function test(){  
    console.log(ren.value.name)  
    console.log(ren.value.age)  
  }  
</script>  
​  
​  
<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->  
<script lang="ts" setup name="Person">  
  import {ref,defineExpose} from 'vue'  
    // 数据  
  let name = ref('张三')  
  let age = ref(18)  
  /****************************/  
  /****************************/  
  // 使用defineExpose将组件中的数据交给外部  
  defineExpose({name,age})  
</script>
```

## defineProps 接收外部数据
```vue
<!--person.vue-->
<script lang='ts' setup name = 'person'>
	import {defineProps} from 'vue';
    let x = defineprops(['a','b'])
    // 可接收多个参数,
</script>

<!--App.vue-->
<template>
        <Person a = "哈哈" :list= "personList"/>
// 加冒号表示变量或对象
</template>

<script lang="ts" setup name="App">
    //JS或TS
    import Person from './compoments/Person.vue';//导入组件
    import {Persons} from '@/types'
    let personList:Persons= [
    {id:'121312x',name:'张三',age:60},
    {id:'121312x',name:'张三',age:61},
    {id:'121312x',name:'张三',age:30}
    ]
</script>



```



## 路由的props配置
