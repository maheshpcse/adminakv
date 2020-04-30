import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = [];
  project: any;
  apiUrl: string;

  data: any = [];
  settings: any = {};
  isValid: any = true;

  firstname: any;
  lastname: any;
  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  designation: any;
  department: any;
  created_on: any;
  role: any;
  imgSrc: SafeResourceUrl;
  textData: any;
  pdfData: any;
  excelData: any = [];
  headersArr: any = [];

  constructor(
    private route: Router,
    private authService: AuthService,
    private sanitization: DomSanitizer
  ) { 
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe((res: any) => {
      console.log("response:", res);
      if (res['success'] == true) {
        this.userData = res['data'];
        let extName = res['ext'];
        console.log("user data is:", this.userData);
        console.log("File extension name is:", extName);
        this.firstname = this.userData[0].firstname;
        this.lastname = this.userData[0].lastname;
        this.username = this.userData[0].username;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.designation = this.userData[0].designation;
        this.department = this.userData[0].department;
        this.role = this.userData[0].role;
        this.created_on = this.userData[0].created_at;
        if (extName == 'jpg' || extName == 'png' || extName == 'gif' || extName == 'JPEG' || extName == 'PNG' || extName == 'GIF') {
          this.profileImage = res['file'];
          this.imgSrc = this.sanitization.bypassSecurityTrustResourceUrl('data:image/*;base64,' + `${this.profileImage}`);
        }
        else if (extName == 'txt' || extName == 'TXT') {
          this.textData = res['file'];
        }
        else if (extName == 'pdf' || extName == 'PDF') {
          this.pdfData = res['file'];
          console.log("type of pdf data is:", typeof (this.pdfData));
        }
        else if (extName == 'xlsx' || extName == 'xls' || extName == 'XLSX' || extName == 'XLS') {
          this.excelData = res['file'];
          this.headersArr = res['thead'];
        }
        else {
          console.log("No file data is found");
        }
      } else {
        console.log("Error while getting user data");
      }
    })
  }

}
