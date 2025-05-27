import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/auth/token.interceptor';

export const appConfig = [
  provideHttpClient(withInterceptors([tokenInterceptor]))
];