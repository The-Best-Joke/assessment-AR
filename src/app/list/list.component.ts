import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengesService } from '../services/challenges.service';
import { Challenge } from '../challenge';
import { Logo } from '../logo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  /** The list of challenges */
  challenges: Challenge[];
  /** The title of the list */
  title = "Challenge Logo Viewer App";

  constructor(private challengesService: ChallengesService) { }

  /**
   * Initializes the List Component, either by acquiring all challenges remotely
   * or by restoring Local Storage challenges.
   *
   * @returns void
   */
  ngOnInit(): void {
    if (localStorage.getItem('challenges') && localStorage.getItem("challenges").length > 0) {
      this.challenges = JSON.parse(localStorage.getItem("challenges"));
    } else {
      this.challenges = [];
      this.getChallenges();
    }
  }

  /**
   * Initializes the component's `challenges` object with all the remotely
   * acquired challenges. Store `challenges` in Local Storage.
   *
   * @returns void
   */
  getChallenges(): void {
    this.challengesService.getChallenges()
      .subscribe(challenges => {
        for (let entry of challenges) {
          let logo: Logo = {
            height: (entry.hasOwnProperty('height') ? entry.height : null),
            width: (entry.hasOwnProperty('width') ? entry.width : null),
            url: (entry.hasOwnProperty('url') ? entry.url : null),
          };
          let challenge: Challenge = {
            id: entry.id,
            title: entry.title,
            teaser: entry.teaser,
            logo: logo,
            favorite: false
          };
          this.challenges.push(challenge);
        }
        localStorage.setItem("challenges", JSON.stringify(this.challenges));
      }
    );
  }

  /**
   * Flips the `favorite` attribute of the `challenge` object selected by `id`.
   * Updates LocalStorage to keep track of the new value.
   * 
   * @param id – The id of the Challenge object whose `favorite` attribute is to
   * be flipped
   *
   * @returns void
   */
  setFavorite(id: number): void {
    let challenge: Challenge = this.challenges.find(challenge => challenge.id === id);
    challenge.favorite = !challenge.favorite;
    localStorage.setItem("challenges", JSON.stringify(this.challenges));
  }
}
