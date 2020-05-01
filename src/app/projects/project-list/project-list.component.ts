import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public settingService: SettingsService,
    public sharedService: SharedService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getProjectList();
  }

  addProject() {
    this.router.navigate(['/project/add']);
  }

  getProjectList() {
    this.settingService.getProjectList().subscribe(res => {
      if(res['success'] == true) {
        console.log('project list', res);
        this.projects = res['data'];
      } else {
        console.log('Unable to get project list');
      }
    })
  }

}
