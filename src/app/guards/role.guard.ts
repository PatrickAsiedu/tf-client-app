import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requireRole = route.data['role'];

  // console.log(authService.getRole())

  if (authService.getRole() === requireRole) {
    return true;
  }
  router.navigate(['/unauthorized']);
  return false;
};
