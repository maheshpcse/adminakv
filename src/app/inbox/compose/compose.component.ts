import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MailService } from 'src/app/mail.service';
import * as moment from 'moment';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  msg_type: any;
  email_To: any;
  subject: any;
  message: any;
  name: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public mailService: MailService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }

  sendNewMessage(type: any) {
    let msg_type;
    if(type == 'sent') {
      msg_type = 'sent';
    } else if (type == 'draft') {
      msg_type = 'draft';
    }
    let msgObj = {
      msg_type: msg_type,
      message: this.message,
      subject: this.subject,
      name: 'Admin',
      email: this.email_To,
      sent_time: moment(new Date()).format('MMMM DD, YYYY, h:mm:ss a'),
      receive_time: moment(new Date()).format('MMMM DD, YYYY, h:mm:ss a'),
      status: 'Unread',
      created_at: new Date(),
      updated_at: new Date()
    }
    console.log('New message information', msgObj);
    this.mailService.sendMessage(msgObj).subscribe(res => {
      if (res['success'] == true) {
        console.log("New message sent successful");
        this.router.navigate(['/dashboard']);
        this.toastr.successToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      } else if (res['success'] == false) {
        console.log("Unable to send a message");
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
