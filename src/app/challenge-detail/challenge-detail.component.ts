import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Logo } from '../logo';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit {

  @Input() challenge: any;
  title: string;
  teaser: string;
  logo: Logo;

  constructor(
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.setTitle();
    this.setTeaser();
    this.setLogo();
  }

  setTitle(): void {
    this.title = this.challenge.node.title[0].text;
  }

  setTeaser(): void {
    this.teaser = this.challenge.node.teaser[0].text;
  }

  setLogo(): void {
    this.logo.width  = this.challenge.node.logo.dimensions.width;
    this.logo.height = this.challenge.node.logo.dimensions.height;
    this.logo.url    = this.challenge.node.logo.url;
  }

  setBack(): void {
    this.location.back();
  }

}
