import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private http: HttpClient) {}

  // fetch(): Observable<HttpResponse<Account>> {
  //   return this.http.get<Account>(SERVER_API_URL + 'api/email', { observe: 'response' });
  // }

  save(email: String): Promise<HttpResponse<String>> {
    return this.http.post<String>(SERVER_API_URL + '/api/email', email, { observe: 'response' }).toPromise();
  }
}
