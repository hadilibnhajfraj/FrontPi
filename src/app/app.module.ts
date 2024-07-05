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
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ReclamationsComponent,
    AddreclamationComponent,
    EditreclamationComponent,
    ViewreclamationComponent,
    FloatingButtonComponent,
    ChatBoxComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
