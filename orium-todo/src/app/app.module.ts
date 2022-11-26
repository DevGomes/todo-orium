import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
import { RegisterLoginModule } from './pages/register-login/register-login.module';
import { TodoListModule } from './pages/todo-list/todo-list.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    TodoListModule,
    RegisterLoginModule,
    PageNotFoundModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
