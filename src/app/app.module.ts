
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
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
import { ListChequeComponent } from './list-cheque/list-cheque.component';
import { ChequeComponent } from './cheque/cheque.component';
import { OffreComponent } from './offre/offre.component';
import { FraisComponent } from './frais/frais.component';
import { FactureComponent } from './facture/facture.component';
import { VirementComponent } from './virement/virement.component';
import { UpdatechequeComponent } from './updatecheque/updatecheque.component';

import { EmploiDetailComponent } from './emploi-detail/emploi-detail.component';

// Import Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


import { ReclamationsComponent } from './reclamations/reclamations.component';
import { AddreclamationComponent } from './addreclamation/addreclamation.component';
import { EditreclamationComponent } from './editreclamation/editreclamation.component';
import { ViewreclamationComponent } from './viewreclamation/viewreclamation.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';


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
    MatCardModule, // Ajouter MatCardModule ici
    MatTableModule, // Ajouter MatTableModule si nécessaire
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
    ChequeComponent,
    OffreComponent,
    FraisComponent,
    FactureComponent,
    VirementComponent,
    UpdatechequeComponent,
    EmploiDetailComponent,
    ReclamationsComponent,
    AddreclamationComponent,
    EditreclamationComponent,
    ViewreclamationComponent,
    FloatingButtonComponent,
    ChatBoxComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajoutez CUSTOM_ELEMENTS_SCHEMA si nécessaire

})
export class AppModule {}
