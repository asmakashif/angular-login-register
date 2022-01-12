import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServicesService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  editForm: FormGroup;

  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;

    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.apiService.getUserById(routeParams.id).subscribe((data: any) => {
      this.editForm.patchValue(data);
    });
  }

  onUpdate() {
    //more code
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      return;
    }

    this.apiService.updateUser(this.editForm.value).subscribe((data) => {
      this.router.navigate(['view']);
    });
  }
}
