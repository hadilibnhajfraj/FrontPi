import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { RegisterComponent } from "./register/register.component";
import { ListeUserComponent } from "./liste-user/liste-user.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { GeneratecodeComponent } from "./generatecode/generatecode.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import { RepasComponent } from "./repas/repas.component";
import { RepasaffichageComponent } from "./repasaffichage/repasaffichage.component";
import { ModifRepasComponent } from "./modif-repas/modif-repas.component";
import { ModifcomponentComponent } from "./modifcomponent/modifcomponent.component";
import { BusComponent } from "./bus/bus.component";
import { EditBusComponent } from "./edit-bus/edit-bus.component";
import { ChauffeurComponent } from "./chauffeur/chauffeur.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ModifchauffeurComponent } from "./modifchauffeur/modifchauffeur.component";
import { AfficheChauffeurComponent } from "./affiche-chauffeur/affiche-chauffeur.component";
import { BusafficheComponent } from "./busaffiche/busaffiche.component";
import { ActiviteComponent } from "./activite/activite.component";
import { AjoutAcctiviteComponent } from "./ajout-acctivite/ajout-acctivite.component";
import { ActiviteModifieComponent } from "./activite-modifie/activite-modifie.component";

import { EnvoiEmailComponent } from "./envoi-email/envoi-email.component";
import { LoginComponent } from "./login/login.component";
import { AfficherepasParentComponent } from "./afficherepas-parent/afficherepas-parent.component";
import { AffichebusParentComponent } from "./affichebus-parent/affichebus-parent.component";
import { FetchNotificationComponent } from "./fetch-notification/fetch-notification.component";
import { FetchActiviteComponent } from "./fetch-activite/fetch-activite.component";
import { InscriptionComponent } from "./inscription/inscription.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ListeUserComponent,
    ResetPasswordComponent,
    GeneratecodeComponent,
    UpdatePasswordComponent,
    RepasComponent,
    RepasaffichageComponent,
    ModifRepasComponent,
    ModifcomponentComponent,
    BusComponent,
    EditBusComponent,
    ChauffeurComponent,
    ModifchauffeurComponent,
    AfficheChauffeurComponent,
    BusafficheComponent,
    ActiviteComponent,
    AjoutAcctiviteComponent,
    ActiviteModifieComponent,
    EnvoiEmailComponent,
    AfficherepasParentComponent,
    AffichebusParentComponent,
    FetchNotificationComponent,
    FetchActiviteComponent,
    InscriptionComponent,
    UserProfileComponent,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
