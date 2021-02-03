import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChallengesService } from '../services/challenges.service';

import { Challenge } from '../challenge';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit {

  /** The Challenge object */
  challenge: Challenge;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private challengesService: ChallengesService
    ) { }

  /**
   * Initializes the `ChallengeDetail` component by calling the component's
   * `getChallengeDetail` function.
   * 
   * @return void
   */
  ngOnInit(): void {
    this.getChallengeDetail();
  }

  /**
   * Establishes the component's `challenge` object by calling the
   * `getChallenge` function from the component's `challengesService` object.
   *
   * @returns void
   */
  getChallengeDetail():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.challenge = this.challengesService.getChallenge(id);
  }

  /**
   * Traverses back to the previous page.
   *
   * @returns void
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Flips the `favorite` attribute of the component's `challenge` object and
   * sets it to Local Storage by calling `challengesServices`'s `setChallenge`
   * function.
   *
   * @returns void
   */
  setFavorite(): void {
    this.challenge.favorite = !this.challenge.favorite;
    this.challengesService.setChallenge(this.challenge);
  }

}
