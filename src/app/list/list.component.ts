import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengesService } from '../services/challenges.service';
import { Challenge } from '../challenge';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  challenges: Observable<any>;

  constructor(
    private challengesService: ChallengesService
    ) { }

  ngOnInit(): void {
    this.challenges = this.challengesService.getChallenges();
  }

}
