import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  newPostContent: object = {
    title: '',
    blogpost: '',
  };
  updatePostContent: Object = {
    title: '',
    blogpost: '',
  };

  blogposts: any;
  updateId: string;

  /**
   * Beállítja az ID az felülíráshoz
   * @param data az felülírandó postnak az id-je
   */
  setUpdateId(data) {
    this.updateId = data;
  }

  /**
   * Ellenőrzi, hogy a post form ki va töltve
   */
  postCheck(data) {
    if (data['title'] && data['blogpost']) {
      return true;
    }
    return false;
  }

  /**
   * Lekéri a blogpostokat és kiírja a blogpost változóba
   */
  getPost() {
    this.http.get('http://localhost:8080/post/getpost').subscribe(
      data => {
        if (data['error']) {
          console.log(`Backend error: ${data['error']}`);
        } else {
          console.log(`No error. Result is: ${JSON.stringify(data)}`);
          this.blogposts = data;
        }
      })
  }

  /**
   * Létrehoz egy új blogpostot
   */
  newPost() {
    if (!this.postCheck(this.newPostContent)) {
      return console.log('post error');
    }
    const postData = this.newPostContent;
    this.http.post('http://localhost:8080/post/newpost', postData).subscribe(
      data => {
        if (data['error']) {
          console.log(`Backend error: ${data['error']}`);
        } else {
          console.log(`No error. Result is: ${(data)}`);
        }
        this.getPost();
        this.newPostContent = {
          title: '',
          blogpost: '',
        };
      });
  }
  updatePost() {
    if (!this.postCheck(this.updatePostContent)) {
      return console.log('post error');
    }
    if (!confirm('Biztos vagy benne?')) {
      return console.log('törlés megszakítva')
    }
    const postData = this.updatePostContent;
    this.http.put(`http://localhost:8080/post/${this.updateId}`, postData).subscribe(
      data => {
        if (data['error']) {
          console.log(`Backend error: ${data['error']}`);
        } else {
          console.log(`No error. Result is: ${(data)}`);
        }
        this.getPost();
        this.updatePostContent = {
          title: '',
          blogpost: '',
        };
      });
  }

  /**
   * töröl egy postot
   * @param id :string postid body._id, blogpost genrált azonosítója
   */
  deletePost(id) {
    if (!confirm('Biztos vagy benne?')) {
      return console.log('törlés megszakítva')
    }
    this.http.delete(`http://localhost:8080/post/${id}`).subscribe(
      data => {
        if (data['error']) {
          console.log(`Backend error: ${data['error']}`);
        } else {
          console.log(`No error. Result is: ${JSON.stringify(data)}`);
        }
        this.getPost();
      });
  }
  ngOnInit() {
    this.getPost()
  }
}
