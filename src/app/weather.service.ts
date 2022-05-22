import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly APIUrl = "https://localhost:7082";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) {}

  getWeatherList(): Observable <any[]> {
      return this.http.get<any>(this.APIUrl + '/WeatherForecast');
  }
}
