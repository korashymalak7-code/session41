import { Component,inject,signal} from '@angular/core';
import{ServiceCart} from './../../service';
import{FormsModule} from '@angular/Forms';
import{observable,distinctUntilChanged,map,debounceTime,switchMap} from'rxjs';
import { toObservable,toSignal} from '@angular/core/rxjs-interop';

@Component({
  imports: [FormsModule],
  
  selector: 'app-user',
  styleUrl: './user.component.scss',
  templateUrl: './user.component.html',
})
export class UserComponent {
  service=inject(ServiceCart);
   
  posts=signal<any>([]);

  // fetch**************************
  // async ngOnInit(){
  //   this.posts.set(await this.service.getData());
  //   console.log(this.posts());
  // }

  //httpClient**************************

  // constructor(){
  //   this.service.getPosts().subscribe({
  //     next:(res :any)=> {console.log(res) },
  //     error:(err :any)=> {console.log(err) },
  //     complete:()=>{console.log("complete");} //run when complet all streem of responses
  //   });  
  // };

  //rxjs **************************

  search=signal("");
  search$=toObservable(this.search).pipe(
    map((text:string)=>text.trim()),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((text: any)=>{
      return this.service.getPosts(text);
    })
  ); 
  news=toSignal(this.search$);
   
}
