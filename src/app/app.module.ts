import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartPageComponent } from './start-page/start-page.component';
import { HeaderComponent } from './header/header.component';
import { PriceComponent } from './price/price.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component'
import {AuthCookie } from './auth-cookies-handler';
import { ActivateGuard } from './activate-guard';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NotFoundComponent,
    StartPageComponent,
    HeaderComponent,
    PriceComponent,
    AboutComponent,
    ServicesComponent,
    AdminComponent,
    AuthComponent,
    RegComponent,
    FilesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthCookie,
    ActivateGuard
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
