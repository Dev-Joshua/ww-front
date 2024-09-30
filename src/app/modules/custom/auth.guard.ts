import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../shared/services/token.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).isValidToken();
  const router = inject(Router);

  if (!token) {
    console.log('No se encontró un token, redirigiendo al login.');
    router.navigate(['/login']);
    return false;
  }
  console.log('Token encontrado, acceso permitido.');
  return true;
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const token = localStorage.getItem('token') || '';
//   const router = inject(Router);

//   if (token != '') {
//     return true;
//   } else {
//     const url = router.createUrlTree(['']);

//     return url;
//   }
// };
