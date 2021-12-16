import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { uniqueId } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedApiParams } from 'src/app/shared/models/utils';
import { Hero } from '../../shared/models/hero-model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  url = ' http://localhost:3000/heroes';
  constructor(private http: HttpClient) {}

  getHeroes(params?: PaginatedApiParams): Observable<any> {
    let query = '';
    if (params) {
      query = `?_page=${params.offset}&_limit=${params.count}`;
      const filters = params.filters?.name
        ? `&name_like=${params.filters?.name}`
        : '';
      query += filters;
    }

    return this.http
      .get(this.url + query, { observe: 'response' })
      .pipe(map((data) => this.formatData(data)));
  }
  formatData(data: any) {
    return {
      data: data.body,
      total: data.headers.get('X-Total-Count'),
    };
  }
  getHero(heroId: string): Observable<any> {
    return this.http.get(this.url + '/' + heroId);
  }

  createHero(hero: Hero): Observable<any> {
    return this.http.post(this.url, { ...hero, id: uniqueId('id_') });
  }

  updateHero(updateHero: Hero): Observable<any> {
    return this.http.patch(this.url + '/' + updateHero.id, { ...updateHero });
  }

  deleteHero(heroId: string): Observable<any> {
    return this.http.delete(this.url + '/' + heroId);
  }
}
