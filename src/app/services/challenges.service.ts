import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Challenge } from '../challenge';

const GET_CHALLENGES = gql`
{
  allChallenges{
    edges {
      node {
				title
        teaser
        logo
      }
    }
  }
}
`;

@Injectable({ providedIn: 'root' })
export class ChallengesService {

  constructor(
    private apollo: Apollo
    ) { }

  /**
   * Returns a `challenges: Observable` object of all remote challenges as
   * acquired by the component's Apollo object.
   * 
   * @remarks
   * The objects to be returned by the `Observable` of this function 
   * are not a one-to-one match of a `Challenge` object due to the lack of a
   * `Logo` attribute.
   * 
   * @returns `Observable<any>` object of all remote challenges
   */
  getChallenges(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_CHALLENGES,
      })
      .valueChanges
      .pipe(map(result => {
        if (result.data) {
          let queryResult = (result.data as any).allChallenges.edges;
          let challenges = [];
          let counter = 0;
          for (let entry of queryResult) {
            let challenge = {};
            challenge['id'] = counter;
            challenge['title'] = entry.node.title[0].text;
            challenge['teaser'] = entry.node.teaser[0].text;
            if (entry.node.logo) {
              challenge['height'] = entry.node.logo.dimensions.height;
              challenge['width'] = entry.node.logo.dimensions.width;
              challenge['url'] = entry.node.logo.url;
            }
            counter++;
            challenges.push(challenge);
          }
          return challenges;
        }
      }));
  }

  /**
   * Finds the locally stored challenge object identified with the id provided.
   * 
   * @param id – Unique `number` attribute of a Challenge object
   *
   * @returns `challenges` object of all locally stored challenges
   */
  getChallenge(id: number): Challenge {
    let challenges: Challenge[] = JSON.parse(localStorage.getItem("challenges"));
    return challenges.find(challenge => challenge.id === id);
  }

  /**
   * Flips the `favorite` attribute from the provided `Challenge` object and
   * stores the change into Local Storage.
   * 
   * @params challenge – `Challenge` object whose `favorite` attribute change is
   * to be stored in Local Storage.
   *
   * @returns void
   */
  setChallenge(challenge: Challenge): void {
    let challenges: Challenge[] = JSON.parse(localStorage.getItem("challenges"));
    challenges.find(entry => entry.id === challenge.id).favorite = challenge.favorite;
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }
}
