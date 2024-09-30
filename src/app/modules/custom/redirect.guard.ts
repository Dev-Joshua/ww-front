import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../shared/services/token.service';

export const redirectGuard: CanActivateFn = () => {
  const token = inject(TokenService).isValidRefreshToken();
  const router = inject(Router);

  if (token) {
    console.log(token);
    router.navigate(['/app']);
  }
  return true;
};
