import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userId: any = sessionStorage.getItem('userid');
  username: any;
  password: any;
  password1: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  changeUsername() {
    let userObj = {
      user_id: this.userId,
      username: this.username
    }
    console.log(userObj);
    this.authService.changeUsername(userObj).subscribe(res => {
      if (res['success'] == true) {
        console.log("Username changed successful");
        this.router.navigate(['/dashboard']);
        this.toastr.successToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      } else if (res['success'] == false) {
        console.log("Unable to change username");
        this.toastr.errorToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      }
    })
  }

  changePassword() {
    if (this.password != this.password1) {
      this.toastr.errorToastr('Passwords not match', '',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
      return;
    }
    let userObj = {
      user_id: this.userId,
      password: this.password
    }
    console.log(userObj);
    this.authService.changePassword(userObj).subscribe(res => {
      if (res['success'] == true) {
        console.log("Password changed successful");
        this.router.navigate(['/dashboard']);
        this.toastr.successToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      } else if (res['success'] == false) {
        console.log("Unable to change password");
        this.toastr.errorToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      }
    })
  }

}
