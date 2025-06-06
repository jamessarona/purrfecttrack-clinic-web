import { Component } from '@angular/core';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
})
export class UserProfileComponent {

  user$: Observable<UserDetailModel | null> = of(null);

  constructor(private userService: UserService){ }
  
  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }
}
