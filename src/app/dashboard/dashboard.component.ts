// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  weatherList: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.refreshWeatherList();
  }

  refreshWeatherList() {
    this.authService.getData().subscribe(data =>{
      this.weatherList = data;
    });  }

  logout(){
    this.authService.logout();
  }

}
