---
title: ch3-栈
source: 
aliases: 
tags: 
draft: false
date_created: 星期3 2024-05-15, 10:57:36 上午
date_modified: 星期2 2024-09-17, 4:16:43 下午
---

# ch3-栈
栈顶指针:S.top,初始时设置S.top = -1;栈顶元素S.data\[top\]

进栈炒作:栈不满时,栈顶指针先+1,再送值到栈顶
```C++
bool Push(SqStack &S,ElemType x){
	if(++S.top>=MaxSize){
		S.top--;
		return false;
	}
	else{
		S.data[S.top] = x;
	}
	return true;
}
```

习题:
Me:BCBCB