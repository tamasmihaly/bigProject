import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: object = {
    username: '',
    email: '',
    password: ''
  };

  constructor(public http: HttpClient, public authService: AuthService) {

  }



  login() {
    this.authService.login(this.user)
  }
  register() {
    this.authService.register(this.user)
  }
  logout() {
    this.authService.logout(this.user)
  }
}
