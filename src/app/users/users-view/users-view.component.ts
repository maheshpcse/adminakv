import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';
import * as _ from 'underscore';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  usersList: any = [];
  public spinner: any = true;
  hideLen: boolean = false;
  hideBlock: boolean = false;
  finalObj: any = {};
  userOne:any = {};
  role: any = sessionStorage.getItem('role');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.spinner = true;
    this.settingService.getAllUsers().subscribe(res => {
      if (res['success'] == true) {
        console.log("Get all users list", res['data']);
        this.usersList = res['data'];
        this.usersList = _.filter(this.usersList, (e: any) => {
          return e.role != 'admin';
        });
        this.spinner = false;
        this.hideLen = true;
      } else if (res['success'] == false) {
        console.log("Unable to get users list");
        this.spinner = true;
      }
    })
  }

  editUser(item: any, config: any) {
    if(config == 'view') {
      // document.getElementById('id01').style.display = 'block';
      this.userOne = item;
      console.log(this.userOne);
      this.router.navigate(['/user/profile', this.userOne]);
    }
    else if(config == 'block') {
      this.hideBlock = false;
      // document.getElementById('id02').style.display = 'block';
      this.finalObj = {
        user_id: item.user_id,
        status: 'Inactive',
        configure: 'Blocked'
      }
      this.router.navigate(['/user/settings', this.finalObj]);
    } 
    else if (config == 'unblock') {
      this.hideBlock = true;
      // document.getElementById('id02').style.display = 'block';
      this.finalObj = {
        user_id: item.user_id,
        status: 'Inactive',
        configure: 'Unblocked'
      }
      this.router.navigate(['/user/settings', this.finalObj]);
    }
    else if (config == 'delete') {
      this.hideBlock = true;
      // document.getElementById('id02').style.display = 'block';
      this.finalObj = {
        user_id: item.user_id,
        status: 'Inactive',
        configure: 'Delete'
      }
      this.router.navigate(['/user/settings', this.finalObj]);
    }
  }

  updateUser() {
    this.settingService.updatedUserStatus(this.finalObj).subscribe(res => {
      if (res['success'] == true) {
        console.log('User status changed success');
        this.toastr.successToastr(res['message'], '',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        document.getElementById('id02').style.display = "none";
        this.getUsersList();
      } else if (res['success'] == false) {
        this.toastr.errorToastr(res['message'],'',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        document.getElementById('id02').style.display = "none";
        this.getUsersList();
      }
    })
  }

  resetUser() {
    document.getElementById('id01').style.display = "none";
    document.getElementById('id02').style.display = "none";
  }

}
