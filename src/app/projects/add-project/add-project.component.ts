import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SettingsService } from 'src/app/settings.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project_type: any;
  project_title: any;
  organization: any;
  startDate: any;
  endDate: any;
  description: any;
  project_role: any;
  technologies: any;

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

  addProject() {
    let projectObj = {
      project_type: this.project_type,
      project_title: this.project_title.toUpperCase(),
      organization: this.organization,
      duration: moment(this.startDate).format('DD MMMM,YYYY') + '-' + moment(this.endDate).format('DD MMMM,YYYY'),
      description: this.description,
      project_role: this.project_role,
      technologies: this.technologies,
      created_at: new Date(),
      updated_at: new Date(),
    }
    console.log(projectObj);
    this.settingService.addProject(projectObj).subscribe(res => {
      if (res['success'] == true) {
        console.log("Project added successful");
        this.router.navigate(['/dashboard']);
        this.toastr.successToastr(res['message'], '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
      } else if (res['success'] == false) {
        console.log("Unable to add project");
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
