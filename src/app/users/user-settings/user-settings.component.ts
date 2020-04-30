import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  finalObj: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public toastr: ToastrManager
  ) { 
    this.route.params.subscribe(res=>{
      console.log(res);
      this.finalObj = res;
    });
  }

  ngOnInit() {
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
        this.router.navigate(['/users']);
      } else if (res['success'] == false) {
        this.toastr.errorToastr(res['message'],'',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        this.router.navigate(['/users']);
      }
    })
  }

  resetUser() {
    this.router.navigate(['/users']);
  }
}
