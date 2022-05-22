// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  userName: string;
  validaty: string;
  refreshToken: string;
  id: string;
  emailId: string;
  guidId: string;
  expiredTime: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'https://localhost:7082/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  // Handle errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  // Verify user credentials on server to get token
  loginForm(data: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api/Account', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('name', resp.userName);
    localStorage.setItem('token', resp.token);
    this.router.navigate(['/dashboard']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


  // Get data from server for Dashboard
  getData(): Observable<LoginResponse> {
    return this.http
      .get<any>(this.basePath + 'api/WeatherForecast', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
