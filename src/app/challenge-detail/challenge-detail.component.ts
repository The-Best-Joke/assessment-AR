import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChallengesService } from '../services/challenges.service';

import { Logo } from '../logo';
import { Challenge } from '../challenge';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit {

  challenge: Challenge;
  logo: Logo;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private challengesService: ChallengesService
    ) { }

  ngOnInit(): void {
    this.getChallengeDetail();
  }

  getChallengeDetail():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.challengesService.getChallenge(id)
      .subscribe(challenge => {
        this.logo = {
          height: (challenge.hasOwnProperty('height') ? challenge.height : null),
          width: (challenge.hasOwnProperty('width') ? challenge.width : null),
          url: (challenge.hasOwnProperty('url') ? challenge.url : null),
        }
        this.challenge = {
          id: challenge.id,
          title: challenge.title,
          teaser: challenge.teaser,
          logo: this.logo
        }
      });
  }

  setBack(): void {
    this.location.back();
  }

}
