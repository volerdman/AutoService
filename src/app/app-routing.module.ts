import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {StartPageComponent} from './start-page/start-page.component';
import {AboutComponent} from './about/about.component';
import {ServicesComponent} from './services/services.component';
import {AdminComponent} from './admin/admin.component';
import {RegComponent} from './reg/reg.component';
import {AuthComponent} from './auth/auth.component';


const routes: Routes = [
  {path:'home', component:StartPageComponent},
  {path:'auth', component:AuthComponent},
  {path:'reg', component:RegComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'admin', component: AdminComponent},
  {path:'', redirectTo:'/home',  pathMatch:'full'},
  {path:'**', component:NotFoundComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
