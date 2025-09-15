import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routes } from '../app.routes';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/signin']);
  return false;
};
