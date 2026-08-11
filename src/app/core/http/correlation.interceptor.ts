import { HttpInterceptorFn } from '@angular/common/http';

/** Genera e propaga X-Correlation-Id su ogni richiesta (Solution Design, capitolo 11.2). */
export const correlationInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId =
    'fv-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  const cloned = req.clone({ setHeaders: { 'X-Correlation-Id': correlationId } });
  return next(cloned);
};
