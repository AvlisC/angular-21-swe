import {
  ApplicationConfig,
  ErrorHandler,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './core/handler/global-error.handler';
import { requestCorrelationIdInterceptor } from './core/interceptors/request-correlation-id.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, requestCorrelationIdInterceptor])
    ),
    provideRouter(routes),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
