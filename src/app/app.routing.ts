import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard"; // Importez la garde d'authentification
import { RegisterComponent } from "../app/register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { GeneratecodeComponent } from "./generatecode/generatecode.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent, // S'assurer que cette route est bien définie ici
  },
  { path: "reset-password", component:ResetPasswordComponent  },
  { path: "generateCode/:email/:resetCode", component:GeneratecodeComponent  },
  {
    path: 'updatePassword/:email',
    component: UpdatePasswordComponent, // Route vers la nouvelle composante de mise à jour du mot de passe
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // Ajoutez la garde d'authentification ici
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
