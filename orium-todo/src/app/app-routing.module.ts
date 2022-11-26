import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
import { RegisterLoginModule } from './pages/register-login/register-login.module';
import { TodoListModule } from './pages/todo-list/todo-list.module';
import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', loadChildren: () => RegisterLoginModule },
  { path: 'todo', loadChildren: () => TodoListModule, canActivate: [AuthGuard] },
  { path: '**', loadChildren: () => PageNotFoundModule, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
