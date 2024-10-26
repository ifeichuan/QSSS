---
title: KMP算法
source: 
aliases: 
tags:
  - 数据结构
draft: false
date_created: 星期6 2024-08-10, 9:29:19 晚上
date_modified: 星期6 2024-10-26, 11:51:09 晚上
---

```toc
```
# KMP算法
由于暴力匹配字串(这里我们称为朴素算法)的算法时间复杂度接近 $O(n^2)$ 所以为了优化寻找子串的算法，KMP算法应运而生.
KMP由三位大佬发明:Knuth，Morris和Pratt，所以取了三位学者名字的首字母。所以叫做KMP 
## KMP的基本思想
由于朴素算法每次匹配失败后,都会跳回`i`进行重新匹配,浪费了大量已获取信息.1
KMP的基本思想是 **当出现字符串不匹配时,根据已知晓的信息,可重复式的移动当前匹配窗口起始位置至上一个`最长相等前后缀和`的`前缀+1`位置**

## 前缀表(部分匹配表)
**前缀表`next`记录的是从当前下标`i`为止的最长相同前后缀长度.**
什么是前缀?即一个字符串中不包含最后一个字符的子字符串.
什么是后缀?即一个字符串中不包含第一个字符的子字符串.
什么是最长相同前后缀?即以当前下标`i`为止的字符串最长的前缀与后缀相同的子缀长度.
例如:
```Python
'ABCA' # 0 0 0 1 
'ABBCBA' # 0 0 0 0 0 1
'ABBCAB' # 0 0 0 0 1 2
```

所以前缀表`next`里记录的是以从下标`0`开始的以`i`为止的最长相同前后缀的长度.
这里我们暂不讨论前缀表的生成.
## KMP主函数算法
```cpp
int kmp_search(string str, string pattern){
    vector<int> next = build_next(pattern);
    int i=0,j=0;
    while(i<str.size()){
        // 打印状态
        printf("i = %d,j = %d\n",i,j);
        cout<<str<<endl;
        for(int x = 0;x<i-j;x++) printf(" ");
        cout<<pattern<<endl;
        // 字符匹配
        if(str[i]==pattern[j]){    
            i++;
            j++;

        }
        // 若j>0,则至少匹配到了一个字符,当pattern[j]不匹配时,pattern[j-1]必然匹配str[i-1],next[j-1]记录的是当前位置的最长相同前后缀长度
        // 即从开头有next[j-1]个字符与next[j-1]个缀字符相同前缀
        // 移动开头
        else if(j>0) j = next[j-1];
        // 字串第一个字符就失配,则
        else i++;
        // 匹配成功
        if(j==pattern.size()){
            return i-j;
        }
    }
    return -1;
}
```
在kmp算法的主函数中,定义了两个变量`i,j`,其中`i`为主串指针,`j`为模式串指针.
在构建完成`next`数组后,我们知道了模式串中每个位置`j`对应的`next[j]`值,然后我们开始循环匹配字符,结束条件为`i<str.size()`即`主串指针小于主串长度`
在循环里,我们判断`str[i]==pattern[j]`,若相等,则`i++;j++;`,若不相等,则再判断`j>0`,若`j>0`,则令`j=next[j-1]`
`next[j-1]`代表什么呢?首先我们已知`j>0`,则前面必有`j`个字符匹配主串,即`str[i-j] ~ str[i] == pattern[0]~pattern[j]`
举个例子
> next = [0,0,1,2,0,1,2,3,4]
> i = 4,j = 4
> ABAB<font color="#ff0000">A</font>BABCABABC // str
> ABAB<font color="#ff0000">C</font>ABAB //pattern
> i = 4,j = 2
> ABAB<font color="#ff0000">A</font>BABCABABC
>   AB<font color="#ff0000">A</font>BCABAB

这里我们可以看到,前4个字符是匹配的,所以`i++;j++`,当`i=4`时,第五个字符失配,则令`j=next[j-1]`,已知`next[j-1]`为`0~j-1`的**最长相同前后缀长度**,又由于`j>0`,即主串中已经有`j`个字符匹配,这`j`个字符的最长相同前后缀即为`next[j-1]`,所以我们可以移动`j`到`next[j-1]`位置,**同时也是`next[j-1]`前缀的下一位**,又由于前缀与后缀相同,等于跳过了`next[j-1]`个字符的匹配(也可以理解为前`next[j-1]`字符已经匹配,所以可以跳过).
如此循环往复,当`j==pattern.size()`时,代表匹配完成,返回`i-j`.
> Q:为什么是`i-j`
> A:因为当匹配完成时,`i`指针指向的是主串中匹配到的模式串的末尾位置,`j`指向的是模式串的末尾位置,看作模式串的长度,返回`i-j`即为返回主串中模式串开头的位置.

## 前缀表的生成
```cpp
vector<int> build_next(string pattern){
    // 寻找字串中相同前后缀的最长长度.
    int len = pattern.size();
    vector<int> next(len,0);
    // 上一个相同前后缀的长度
    int prefixLen = 0;
    int i =1;
    // prefixLen 代表 pattern[0] ~ pattern[i]这个闭区间中的 最长-相同-前后缀-长度
    while(i<len){
        if(pattern[prefixLen]==pattern[i]){
            prefixLen++;
            next[i] = prefixLen;
            i++;
    }
    else{
        // 若prefixLen = 0 则前面没有匹配的共同前后缀,则next[i] = 0
        if(prefixLen==0){
            //
            next[i] = 0;
            i++;
            }
        else{
            prefixLen = next[prefixLen-1];
            }
        }
    }
    return next;
}
```

说完了KMP算法的主函数部分,那么最令人疑惑的就是`next`数组的生成部分了.接下来我们跟着程序代码来理解学习.
首先,在明确了前缀与后缀的概念后,很明显下标`0`不具备相同的前后缀,所以可以初始化`next`数组为`next = [0,](python)`.
随后进入循环,结束条件为`i<len`,`i`初始化为`1`,同时也是后缀指针; 同时初始化一个变量`prefixLen = 0`,用来记录上一个相同前后缀的长度,同时也是前缀指针.
循环判断`pattern[prefixLen]==pattern[i]`,即匹配前缀与后缀是否相等.若相等,则
```cpp
prefixLen++; // 前缀+1 即为当前最长相同前后缀长度
next[i] = prefixLen; // 即prefixLen为当前位置的最长相同前后缀长度.
i++ // 后缀后移
```
若不同,则判断`prefixLen==0`,若等于,则说明在`next`数组`0~i`这个区间的最长相同前后缀为`0`,且当前`pattern[prefixLen] = pattern[0] != pattern[i]`,则可以判断当前位置没有匹配的共同前后缀,所以令
```cpp
next[i] = 0;
i++ // 后缀后移
```
若`prefixLen>0`,则说明前面有相等的前后缀,我们回溯`prefixLen = next[prefixLen-1]`.
> Q:为什么回退到`next[prefixLen-1]`,而不是`next[prefixLen]`呢?
> A:可能会卡死,例如:字符串`aaacaaa`的next数组为`0 1 2 0 1 2 3`,当`patter[i]`匹配到`c`时,显然会失配,且`prefixLen>0`,那么我们试着将`prefixLen = next[prefixLen] = 2`则`prefixLen`无变化,所以可能会出现卡死的情况.
> Q:那为什么不令`prefixLen = next[0]`?
> A:因为浪费时间....令`prefixLen = next[prefixLen-1]`即可以防止卡死,有可以避免浪费掉已获取的信息,避免了从头开始的办法.

## 完整代码
```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> build_next(string pattern){
    // 寻找字串中相同前后缀的最长长度.
    int len = pattern.size();
    vector<int> next(len,0);
    // 上个相同前后缀的长度
    int prefixLen = 0;
    int i =1;
    // prefixLen 代表 pattern[0] ~ pattern[i]这个闭区间中的 最长-相同-前后缀-长度
    while(i<len){
        if(pattern[prefixLen]==pattern[i]){
            prefixLen++;
            next[i] = prefixLen;
            i++;
    }
    else{
        if(prefixLen==0){
            next[i] = 0;
            i++;
            }
        else{
            prefixLen = next[prefixLen];
            }
        }
    }
             for(int j=0;j<next.size();j++){
            printf("%d",next[j]);
         }
        cout<<endl;
    return next;
}

int kmp_search(string str, string pattern){
    vector<int> next = build_next(pattern);
    int i=0,j=0;
    while(i<str.size()){
        // 打印状态
        printf("i = %d,j = %d\n",i,j);
        cout<<str<<endl;
        for(int x = 0;x<i-j;x++) printf(" ");
        cout<<pattern<<endl;
        // 字符匹配
        if(str[i]==pattern[j]){    
            i++;
            j++;
        }
        // 若j>0,则至少匹配到了一个字符,当pattern[j]不匹配时,pattern[j-1]必然匹配str[i-1],next[j-1]记录的是当前位置的最长相同前后缀长度
        // 即从开头有next[j-1]个字符与next[j-1]个缀字符相同前缀
        // 移动开头
        else if(j>0) j = next[j-1];
        // 字串第一个字符就失配,则
        else i++;
        // 匹配成功
        if(j==pattern.size()){
            return i-j;
        }
    }
    return -1;
}

int main(){
    string s1 = "ABABABABCABABCABAB";
    string s2 = "ABABCA";
    cout<<s1<<endl<<s2<<endl;
    int pos = kmp_search(s1,s2);
    cout<<pos<<endl;
}

```