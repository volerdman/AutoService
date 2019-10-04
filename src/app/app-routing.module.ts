import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {StartPageComponent} from './start-page/start-page.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
  {path:'home', component:StartPageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path:'', redirectTo:'/home',  pathMatch:'full'},
  {path:'**', component:NotFoundComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
