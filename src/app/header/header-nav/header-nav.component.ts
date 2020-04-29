import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  firstname: any = sessionStorage.getItem('firstname');
  lastname: any = sessionStorage.getItem('lastname');
  username: any = sessionStorage.getItem('username');
  public userid = sessionStorage.getItem('userid');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public sharedService: SharedService
    ) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.userLogout({ user_id: this.userid }).subscribe(res => {
      console.log('User is logged out');
      this.router.navigate(['']);
    })
  }

}
