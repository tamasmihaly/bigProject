import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient) { }
  post: object = {
    title: '',
    blogpost: ''
  };
  blogposts: any;
  ngOnInit() {
  }
  writeResult(res) {
    if (res.error) {
      console.log(`Backend error: ${res.error}`);
    } else {
      console.log(`No error. Result is: ${res.success}`);
    }
  }
  newPost() {
    const postData = this.post;
    this.http.post('http://localhost:8080/post/newpost', postData).subscribe(
      data => {
        this.writeResult(data);
      });
  }
  getPost() {
    this.http.get('http://localhost:8080/post/getpost').subscribe(
      data => {
        if (data['error']) {
          console.log(`Backend error: ${data['error']}`);
        } else {
          console.log(`No error. Result is: ${JSON.stringify(data)}`);
          this.blogposts = data;
        }
      });
  }


}
