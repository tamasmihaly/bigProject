import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


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
  currentUser: any;
  constructor(public http: HttpClient, public authService: AuthService) {

  }



  getUser() {
    this.http.get('http://localhost:8080/').subscribe(
      data => {
        return data;
      });
  }
  async login() {
    await this.authService.login(this.user);
    this.currentUser = await this.getUser();
    console.log(this.currentUser)
  }
  register() {
    this.authService.register(this.user);
  }
  logout() {
    this.authService.logout();
  }
}
