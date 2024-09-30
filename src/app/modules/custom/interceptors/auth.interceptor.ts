import { HttpInterceptorFn } from '@angular/common/http';
import { getCookie } from 'typescript-cookie';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.indexOf('auth') > 0) return next(req);

  const token = getCookie('token-ww');
  console.log('Token obtenido de la cookie: ', token);
  const clonRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonRequest);
};
