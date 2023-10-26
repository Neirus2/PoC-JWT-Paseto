import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  token: String | any;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenJWT');

  }


}
