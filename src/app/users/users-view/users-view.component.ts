import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';
import * as _ from 'underscore';

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
  finalObj = {};
  userOne:any = {};
  role: any = sessionStorage.getItem('role');

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

}
