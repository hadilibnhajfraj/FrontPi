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
import { ChequeComponent } from './cheque/cheque.component';
import { OffreComponent } from './offre/offre.component';
import { FraisComponent } from './frais/frais.component';
import { FactureComponent } from './facture/facture.component';
import { VirementComponent } from './virement/virement.component';
import { UpdatechequeComponent } from './updatecheque/updatecheque.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ChequeComponent,
    OffreComponent,
    FraisComponent,
    FactureComponent,
    VirementComponent,
    UpdatechequeComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
