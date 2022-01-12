import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServicesService,
    private router: Router
  ) {}
  addForm: FormGroup;
  token: any;
  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
      this.router.navigate(['login']);
    }
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    //more code
    console.log(this.addForm.value);
    if (this.addForm.invalid) {
      return;
    }

    this.apiService.createUser(this.addForm.value).subscribe((data) => {
      this.router.navigate(['view']);
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
