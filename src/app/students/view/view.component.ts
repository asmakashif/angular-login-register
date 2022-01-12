import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  users: any;

  constructor(private apiService: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id).subscribe((data) => {
      this.users = this.users.filter((u: User) => u !== user);
    });
  }

  editUser(user: User): void {
    this.router.navigate(['edit/' + user.id]);
  }
}
