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
    this.challenge = this.challengesService.getChallenge(id);
  }

  goBack(): void {
    this.location.back();
  }

  setFavorite(): void {
    this.challenge.favorite = !this.challenge.favorite;
    this.challengesService.setChallenge(this.challenge);
  }

}
