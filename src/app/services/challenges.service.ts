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


@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  constructor(
    private apollo: Apollo
    ) { }

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
}
