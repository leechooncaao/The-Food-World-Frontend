import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public getListCommentByFoodId(foodId: any): Observable<any> {
    return this.http.get(BASE_URL + '/' + foodId);
  }

  public createComment(comment: any): Observable<any> {
    return this.http.post(BASE_URL, comment);
  }

  public updateComment(commentId: any, comment: any): Observable<any> {
    return this.http.put(BASE_URL + '/' + commentId, comment);
  }

  public deleteComment(commentId: any): Observable<any>{
    return this.http.delete(BASE_URL + '/' + commentId);
  }
}
