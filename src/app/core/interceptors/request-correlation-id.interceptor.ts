import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RequestContextCorrelationId } from '../services/correlation-id.service';

export const requestCorrelationIdInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const context = inject(RequestContextCorrelationId);

  const correlationId = context.createCorrelationId();

  const requestWithId = req.clone({
    setHeaders: {
      'X-Correlation-Id': correlationId
    }
  });

  return next(requestWithId);
};
