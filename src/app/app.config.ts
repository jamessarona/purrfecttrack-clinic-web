import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/auth/token.interceptor';
import { authRetryInterceptor } from './services/auth/auth-retry.interceptor';

export const appConfig = [
  provideHttpClient(
    withInterceptors([
      tokenInterceptor,
      authRetryInterceptor,  
    ])
  )
];
