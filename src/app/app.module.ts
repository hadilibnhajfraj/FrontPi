import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RepasComponent } from './repas/repas.component';
import { RepasaffichageComponent } from './repasaffichage/repasaffichage.component';
import { ModifRepasComponent } from './modif-repas/modif-repas.component';
import { ModifcomponentComponent } from './modifcomponent/modifcomponent.component';
import { BusComponent } from './bus/bus.component';
import { EditBusComponent } from './edit-bus/edit-bus.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModifchauffeurComponent } from './modifchauffeur/modifchauffeur.component';
import { AfficheChauffeurComponent } from './affiche-chauffeur/affiche-chauffeur.component';
import { BusafficheComponent } from './busaffiche/busaffiche.component';
import { ActiviteComponent } from './activite/activite.component';


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
    MatRadioModule,
    MatSlideToggleModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
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
    ActiviteComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
