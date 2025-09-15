import { Component, OnInit } from '@angular/core';
import { MaincontainerComponent } from '../../../components/container/maincontainer/maincontainer.component';
import { NongridcontainerComponent } from '../../../components/container/nongridcontainer/nongridcontainer.component';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaincontainerComponent, NongridcontainerComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users:any =[];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (result) => {
        this.users = result;
      },
      error: (error) => {
        if (error.status === 409) {
        } else {
          console.error(error.message);
        }
      },
    });
  }
}
