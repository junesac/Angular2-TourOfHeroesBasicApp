import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import  { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

// Added for http calls
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // getHeroes() : Hero[] {
  //   return HEROES;
  // }

  // getHeroes() : Observable<Hero[]> {
  //   this.messageService.add('HelloService: Fetched Heroes');
  //   return of(HEROES);
  // }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`Hello Service fetched hero id =${id}`);
    return of(HEROES.find(hero => {
      return hero.id === id;
    }));
  }

  // Added for http
  private heroesUrl = 'api/heroes';

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
}
