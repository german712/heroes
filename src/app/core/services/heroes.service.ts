import { Injectable } from '@angular/core';
import { uniqueId } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaginatedApiParams } from 'src/app/shared/models/utils';
import { Hero } from '../../shared/models/hero-model';
import { HEROES } from '../mocks/heroes-mock';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroesList: Hero[] = localStorage.getItem('heroes')
    ? (JSON.parse(localStorage.getItem('heroes')!) as Hero[])
    : HEROES;
  $heroesList: BehaviorSubject<Hero[]> = new BehaviorSubject(this.heroesList);

  getHeroes(params?: PaginatedApiParams): Observable<Hero[]> {
    const name = params?.filters?.name
      ? params?.filters?.name.toLowerCase()
      : '';
    return of(
      this.heroesList.filter((hero) => hero.name.toLowerCase().includes(name))
    );
  }

  getHero(heroId: string): Observable<Hero> {
    return of(this.heroesList.find((hero) => hero.id === heroId) as Hero);
  }

  createHero(hero: Hero): Observable<any> {
    this.heroesList.push({ ...hero, id: uniqueId('id_') });
    localStorage.setItem('heroes', JSON.stringify(this.heroesList));
    return of({});
  }

  updateHero(updateHero: Hero): Observable<any> {
    const index = this.heroesList.findIndex(
      (hero) => hero.id === updateHero.id
    );
    this.heroesList[index] = { ...updateHero };
    localStorage.setItem('heroes', JSON.stringify(this.heroesList));
    return of({});
  }

  deleteHero(heroId: string): Observable<any> {
    this.heroesList = this.heroesList.filter((hero) => hero.id !== heroId);
    localStorage.setItem('heroes', JSON.stringify(this.heroesList));
    return of({});
  }
}
