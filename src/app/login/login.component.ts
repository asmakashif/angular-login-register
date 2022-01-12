import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServicesService,
    private router: Router
  ) {}
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  message: any;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };

    this.apiService.login(loginData).subscribe((data: any) => {
      //console.log(data)
      this.message = data.message;
      console.log(data.token);
      if (data.token) {
        window.localStorage.setItem('token', data.token);
        this.router.navigate(['view']);
      } else {
        this.invalidLogin = true;
        alert('a' + data.message);
      }
    });
  }
}
