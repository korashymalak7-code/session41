import { Component, signal} from '@angular/core';
import{UserComponent} from './component/user/user.component';
import{FormsModule} from '@angular/Forms';

@Component({
  imports: [UserComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl:'./app.html',
})
export class App {


}
