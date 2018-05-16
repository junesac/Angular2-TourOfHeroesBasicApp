import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import  { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { Http, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

// Added for http calls
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`Hello Service fetched hero id =${id}`);
  //   return of(HEROES.find(hero => {
  //     return hero.id === id;
  //   }));
  // }

  // Added for http
  private heroesUrl = 'api/heroes';


  getHeroes(): Observable<Hero[]> {

    let username : string = 'Sachin';
    let password : string = 'password';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    let url = 'http://localhost:7777/activity/get';

    this.http.get(url, {headers, withCredentials: true}).subscribe(
      data => {
        console.log(data);
        this.messageService.add('Response from actual service : '
          + data.uaName + ' : '+ data.calories);
      },
      err => {
        console.log(err);
      },
      () => console.log('Request Complete')
    );

    return this.http.get<Hero[]>(url, {headers: headers})
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero with id=${id}`)),
      catchError(this.handleError<Hero>(`getHero with id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero = ${hero.id}`)),
        catchError(this.handleError<any>('Update Hero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('Add Hero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/$id`;
    return this.http.delete<Hero>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero with id : ${id}`)),
      catchError(this.handleError<Hero>('deleted hero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
