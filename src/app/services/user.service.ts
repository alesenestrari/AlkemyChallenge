import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user.model';
import { ReplaySubject, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://challenge-react.alkemy.org/';

  userToken = new ReplaySubject<AuthResponse>(1);

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<AuthResponse>(this.url, user).pipe(tap(data => {
      this.userToken.next(data);
    }));
  }
}
