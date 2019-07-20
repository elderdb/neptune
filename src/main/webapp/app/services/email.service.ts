import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private http: HttpClient) {}

  // fetch(): Observable<HttpResponse<Account>> {
  //   return this.http.get<Account>(SERVER_API_URL + 'api/email', { observe: 'response' });
  // }

  save(email: String): Observable<String> {
    return this.http.post<String>('http://localhost:8080/api/email', email, {});
  }
}
