import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { SharedService } from '../shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MailService } from '../mail.service';
import * as _ from 'underscore';
import * as moment from 'moment';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  inboxMsgs: any = [];
  sentMsgs: any = [];
  importantMsgs: any = [];
  draftMsgs: any = [];
  deleteMsgs: any = [];

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
    this.receiveMessages();
  }

  sendMessage() {
    this.router.navigate(['/inbox/compose']);
  }

  receiveMessages() {
    this.mailService.receiveMessages().subscribe(res=>{
      if(res['success'] == true) {
        console.log("Get messages", res);
        this.sentMsgs = _.filter(res['data'], (e:any) => {
          return e.msg_type == 'sent';
        });
        let arr = [];
        this.sentMsgs.forEach(e => {
          e.sent_time = moment(e.sent_time).startOf('hour').fromNow();
          arr.push(e);
        });
        this.sentMsgs = arr;
        this.draftMsgs = _.filter(res['data'], (e:any) => {
          return e.msg_type == 'draft';
        });
        let arr1 = [];
        this.draftMsgs.forEach(e => {
          e.sent_time = moment(e.sent_time).startOf('hour').fromNow();
          arr1.push(e);
        });
        this.draftMsgs = arr1;
      }
    })
  }

  viewMessage(item: any) {
    this.router.navigate(['/inbox/message/view', item]);
  }

}
