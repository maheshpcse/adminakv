import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  isSuccess: boolean = false;
  isFalied: boolean = false;
  isInfo: boolean = false;
  isBlock: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  userLogin() {
    this.isLoading = true;
    let userData = {
      username: this.username,
      password: this.password
    }
    console.log("userdata is:", userData);
    this.authService.userLogin(userData).subscribe(res => {
      console.log("response is:", res);
      if (res['success'] == true) {
        console.log("Login successful", res);
        localStorage.setItem('token', res['token']);
        sessionStorage.setItem('userid', res['data'][0].user_id);
        sessionStorage.setItem('id', res['id']);
        sessionStorage.setItem('role', res['role']);
        sessionStorage.setItem('firstname', res['firstname']);
        sessionStorage.setItem('lastname', res['lastname']);
        sessionStorage.setItem('username', res['username']);
        sessionStorage.setItem('password', res['password']);
        sessionStorage.setItem('phonenumber', res['phonenumber']);
        sessionStorage.setItem('designation', res['designation']);
        sessionStorage.setItem('department', res['department']);
        sessionStorage.setItem('created_at', moment(res['created_at']).format('YYYY-MM-DD'));
        this.isSuccess = true;
        // this.sharedService.getModulesData();
        setInterval(() => {
          this.isLoading = false;
          this.route.navigate([`/dashboard`]);
        },1000);
      } else if (res['statusCode'] == 204) {
        console.log("Required fields are empty");
        this.isInfo = true;
        setInterval(() => {
          this.isInfo = false;
        }, 5000);
      } else if (res['statusCode'] == 404) {
        console.log("Invalid username or password");
        this.isFalied = true;
        setInterval(() => {
          this.isFalied = false;
        }, 5000);
      } else if (res['statusCode'] == 405) {
        console.log("User is blocked");
        this.isBlock = true;
        setInterval(() => {
          this.isBlock = false;
        }, 5000);
      }
      else {
        console.log('Login failed');
      }
    })
  }

}
