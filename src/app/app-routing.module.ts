import { AuthGuardService } from './auth/auth-guard.service';
import { JournalComponent } from './journal/journal.component';
import { FormComponent } from './form/form.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: AuthComponent },
{ path: 'list', component: JournalComponent, canActivate: [AuthGuardService]},
{ path: 'journal-entry', component: FormComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
