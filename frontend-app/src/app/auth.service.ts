import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  writeResult(res) {
    if (res.error) {
      console.log(`Backend error: ${res.error}`);
    } else {
      console.log(`No error. Result is: ${res.success}`);
    }
  }

  constructor(public http: HttpClient) { }
  register(userdata) {
    this.http.post('http://localhost:8080/register', userdata).subscribe(
      data => {
        this.writeResult(data);
      });
  }
  login(userdata) {
    this.http.post('http://localhost:8080/login', userdata).subscribe(
      data => {
        this.writeResult(data);
      });
  }
  logout() {
    this.http.get('http://localhost:8080/logout').subscribe(
      data => {
        this.writeResult(data);
      });
  }
  getUser() {
    this.http.get('http://localhost:8080/').subscribe(
      data => {
        console.log(data)
      });
  }

}
