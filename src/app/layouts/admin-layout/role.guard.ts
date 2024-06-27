import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../service/AuthService'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data.expectedRoles as Array<string>;
    const userRole = this.authService.getUserRole();

    if (!userRole || !expectedRoles.includes(userRole)) {
      this.router.navigate(['/login']); // Redirige vers la page de connexion si l'utilisateur n'a pas le bon rôle
      return false;
    }

    // Exclure l'accès à /listUser pour les rôles autres que 'admin'
    if (state.url === '/listUser' && userRole !== 'admin') {
      this.router.navigate(['/icons']); // Redirige ailleurs pour les autres rôles
      return false;
    }

    return true;
  }
}
