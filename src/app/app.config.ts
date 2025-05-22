import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig = {
  providers: [
    provideRouter(AppRoutes),
    importProvidersFrom(
      ReactiveFormsModule,
      HttpClientModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
