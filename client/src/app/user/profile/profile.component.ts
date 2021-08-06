import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = 'User';
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this._authService.getLoggedUserName()
  }
}
