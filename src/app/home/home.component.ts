import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { SettingsService } from '../settings.service';

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
  projects: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getUsersList();
    this.getProjectList();
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

  viewList(page: any) {
    if(page == 'users') {
      this.router.navigate(['/users']);
    } else if (page == 'projects') {
      this.router.navigate(['/projects']);
    }
  }

  getProjectList() {
    this.spinner = true;
    this.settingService.getProjectList().subscribe(res => {
      if(res['success'] == true) {
        console.log('Get all project list', res);
        this.projects = res['data'];
        this.spinner = false;
        this.hideLen = true;
      } else {
        console.log('Unable to get project list');
        this.spinner = true;
      }
    })
  }
}
