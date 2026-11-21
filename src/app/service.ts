import { Service ,signal,debounced ,inject} from '@angular/core';
import {httpResource,HttpClient} from '@angular/common/http';
import{map,switchMap,from} from'rxjs';

@Service()
export class ServiceCart {
    apiUrl='https://jsonplaceholder.typicode.com/posts';
    apiUrlNews='https://newsapi.org/v2/everything?q=tesla&from=2026-10-21&sortBy=publishedAt&apiKey=bedde18907cd421b8a8e5537db6600f0';

    //*********************** get api with fetch  
    // async getData(){ //async function is return a promise
    //     console.log("ok");
    //     let  res=await fetch(this.apiUrl);
    //     if(!res.ok){
    //         console.log("error");
    //     }
    //     let data=await res.json()
    //     return data;
    // };

    //*********************** get api with httpResource

    query=signal("");
    qDebounced=debounced(()=>this.query(),1000);
    // httpRes is return a signal and work with httpClient

    // _posts=httpResource<any>(()=>`${this.apiUrlNews}&q=${this.qDebounced.value()}` ,{parse:(res :any)=>res.articles});

    // _posts=httpResource<any>(()=>  {
    //     return {
    //         url:this.apiUrlNews,
    //         params:{
    //             country:'us',
    //             apiKey:"bedde18907cd421b8a8e5537db6600f0",
    //             q:this.qDebounced.value()
    //         }
    //     };
    // },{parse:(res :any)=>res.articles});


    //*********************** get api with  rxjs

    http=inject(HttpClient)
    // getPosts(text:string){
    //    return this.http.get(`${this.apiUrlNews}$q=${text}`).pipe(
    //     map((posts :any)=>{
    //         return posts.map((post :any)=> ({id:post.id ,title:post.title}))
    //     }),
    //     switchMap((posts)=>from(posts))
    //    );
    // }

    getPosts(text: any){
       return this.http.get(`${this.apiUrlNews}$q=${text}`).pipe(
        map((res:any)=>{
            console.log(res);
            console.log(res.articles);
            return res.articles;
        })
       )
    }
}
