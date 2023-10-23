import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';
  private _userRole: string | null = null;
  get userRole(): string | null {
    return this._userRole;
  
  }
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  logIn(user: any): Observable<any> {
    return this.http.post<any>(this.URL + '/login', user).pipe(
      tap((response) => {
        localStorage.setItem('tokenJWT', response.tokenJWT);
        localStorage.setItem('tokenPaseto', response.tokenPaseto);
        this._userRole = response.role;
      })
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}