import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import  { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  // getHeroes() : Hero[] {
  //   return HEROES;
  // }

  getHeroes() : Observable<Hero[]> {
    this.messageService.add('HelloService: Fetched Heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`Hello Service fetched hero id =${id}`);
    return of(HEROES.find(hero => {
      return hero.id === id;
    }));
  }

}
