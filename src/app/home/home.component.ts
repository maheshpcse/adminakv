import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usersList: any = [];
  public spinner: any = true;
  hideLen: boolean = false;
  hideBlock: boolean = false;
  finalObj = {};
  userOne:any = {};
  role: any = sessionStorage.getItem('role');
  currentMonth: any = moment(new Date()).format('MMMM YYYY');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.spinner = true;
    this.authService.getAllUsers().subscribe(res => {
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

  viewList() {
    this.router.navigate(['/users']);
  }
}
