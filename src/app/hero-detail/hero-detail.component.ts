import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // Property name should be same when you call this component 
  // in some html using <app-hero-detail [hero]="selectedHero" /> 
  @Input() hero: Hero; 

  constructor() { }

  ngOnInit() {
  }

}
