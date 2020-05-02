import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { MailService } from 'src/app/mail.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {

  message: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public mailService: MailService,
    public toastr: ToastrManager
  ) { 
    this.route.params.subscribe(res=>{
      this.message = res;
    });
    console.log(this.message);
  }

  ngOnInit() {
  }

}
