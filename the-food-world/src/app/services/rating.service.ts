import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  public addOrUpdateRating(rating: any): Observable<any> {
    return this.http.post(BASE_URL, rating);
  }

  public getRating(foodId: any, accountId: any): Observable<any> {
    const params = new HttpParams()
          .set('foodId', foodId)
          .set('accountId', accountId);
    return this.http.get(BASE_URL, {params});
  }

  public getRatingInfo(foodId: any): Observable<any> {
    return this.http.get(BASE_URL + '/' + foodId);
  }
}
