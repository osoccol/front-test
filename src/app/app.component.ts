import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { ObjectService } from './services/object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-test';
  clientID = environment.client_id;

  email?: string;
  name?: string;
  objects?: any;

  constructor(private authService: AuthService, private objectService: ObjectService) {

  }

  ngOnInit(): void {
    if (this.authService.hasToken()) {
      this.authService.loginWithGoogle()
        .then((response: any) => {
          console.log(response);
          const user = response.user;
          const token = response.token;
          window.sessionStorage.setItem('userEmail', user.email);
          window.sessionStorage.setItem('userToken', token);

          this.email = user.email;
          this.name = user.name;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  logout() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  loadObjects() {
    this.objectService.getObjects().then((objectList: any) => {
      this.objects = objectList;
    }).catch((err) => {
      console.log(err)
    })
  }
}
