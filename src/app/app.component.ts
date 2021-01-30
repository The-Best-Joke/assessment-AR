import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ChallengesService } from './services/challenges.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // challenges$: Observable<any>;
  title = 'Challenge Logo Viewer App';

  constructor(
  	// private challengesService: ChallengesService
  	) { }

  // ngOnInit() {
  // 	this.challenges$ = this.challengesService.getChallenges();
  // }

}
