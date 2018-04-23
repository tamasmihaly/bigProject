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
  newUser: object = {
    username: '',
    email: '',
    password: ''
  }
  loggedIn: boolean;
  public currentUser: any;

  constructor(public http: HttpClient, public authService: AuthService) {
  }

  userCheck(data) {
    if (data['username'] && data['password']) {
      return true;
    }
    return false;
  }

  getUser() {
    this.authService.getUser();
  }
  login() {
    const userdata = this.user;
    if (!this.userCheck(userdata)) { return console.log('hiányzó adatok') }
    this.http.post('http://localhost:8080/login', userdata).subscribe(
      data => {
        this.loggedIn = true;
        this.currentUser = data['user'];
      });
  }
  register() {
    if (!this.userCheck(this.newUser) && !this.newUser['email']) {
      this.newUser = {
        username: '',
        email: '',
        password: ''
      };
      return console.log('hiányzó adatok');
    }
    this.authService.register(this.newUser);
    this.newUser = {
      username: '',
      email: '',
      password: ''
    };
  }
  logout() {
    const userdata = this.user;
    this.http.post('http://localhost:8080/login', userdata).subscribe(
      data => {
        this.loggedIn = false;
      });
  }

}
