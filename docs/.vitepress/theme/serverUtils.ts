import {globby} from 'globby'
import matter from 'gray-matter'
import fs from 'fs'
export async function getPosts(){ 
const paths = await getPostMDFilePaths()
const posts = paths.map((item)=>{
    const content = fs.readFileSync(item,'utf-8')
    const {data} = matter(content)
    console.log(item);  
    return {
        text: data.title,
        link: item.substr(0,item.length-3),
        date: data.date_created.split(' ')[1].split(',')[0],
        tags: data.tags
    }
})
// 根据日期排序
posts.sort((a,b)=>{
    return new Date(b.date).getTime() - new Date(a.date).getTime()
})
// console.log(posts);

return posts
}


async function getPostMDFilePaths() {
    let paths = await globby(["**.md"], {
      ignore: ["node_modules", "README.md",'index.md'],
    });
    // 只取posts目录下的md文件
    // console.log(paths);
    return paths.filter((item) => item.includes("posts/"));
  }


export async function getPostsLength(){
    const posts = await globby(['**.md'],{
        ignore:["node_modules","README.md",'index.md']
    })
    // console.log(posts)
    return posts.length
}
