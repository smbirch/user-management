import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersRegistryComponent } from './users-registry/users-registry.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { CreateTeamModalComponent } from './create-team-modal/create-team-modal.component';
import { CreateAnnouncementModalComponent } from './create-announcement-modal/create-announcement-modal.component';
import { EditProjectModalComponent } from './edit-project-modal/edit-project-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    HomeComponent,
    TeamsComponent,
    ProjectsComponent,
    UsersRegistryComponent,
    NavbarComponent,
    CreateProjectModalComponent,
    CreateTeamModalComponent,
    CreateAnnouncementModalComponent,
    EditProjectModalComponent,
    AddUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
