import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './students/add/add.component';
import { EditComponent } from './students/edit/edit.component';
import { ViewComponent } from './students/view/view.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add', component: AddComponent },
  { path: 'view', component: ViewComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
