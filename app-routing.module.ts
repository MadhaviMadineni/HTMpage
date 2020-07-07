import { NgModule } from '@angular/core';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { SignupComponent } from './profile/register/signup.component';
import { SignupemailComponent } from './profile/register/signupemail.component';
import { DashboardComponent } from './dashboard/dashboard-home/dashboard.component';
import { EquipmentRegistrationComponent } from './dashboard/equipment-registration/equipment-registration.component';
import { ManageSubuserComponent } from './dashboard/manage-subuser/manage-subuser.component';
import { ForgotpasswordComponent } from './profile/login/forgotpassword.component';
import { SettingsSidenavComponent } from './settings/settings-sidenav/settings-sidenav.component';
import { SecurityComponent } from './settings/security/security-main/security.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import {ContactGuard} from './guards/contact.guard';
import { ModifyPrivilageComponent } from './settings/security/modify-privilage/modify-privilage.component';
import {
  SubuserComponent,
  DailogAddSubuser
} from './dashboard/subuser/subuser.component';
import { UploadNorFileComponent } from './upload-nor-file/upload-nor-file.component';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EmailConfirmationComponent } from './profile/email-confirmation/email-confirmation.component';
import { EmailLinkComponent } from './profile/email-link/email-link.component';
import { EventLogFilesComponent } from './dashboard/event-log-files/event-log-files.component';
import { ImportedSettingsFilesComponent } from './dashboard/imported-settings-files/imported-settings-files.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { TermsOfServicesComponent } from './terms-of-services/terms-of-services.component';
import { MediaCenterComponent } from './dashboard/media-center/media-center.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AdminGuard } from './guards/admin.guard';
import { TechSupportGuard } from './guards/tech-support.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { UserGuard } from './guards/user.guard';
import { SetupToolsGuard } from './guards/setup-tools.guard';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { SetuptoolComponent } from './setuptool/setuptool.component';
import { PressureOutputSettingsComponent } from './pressure-output-settings/pressure-output-settings.component';





const routes: Routes = [
  { path: '', loadChildren:'./landing-page/landing.module#LandingModule' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signupemail', component: SignupemailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard,UserGuard],
    data: { sideNavDashboard: true }
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {
    path: 'equipment-registration',
    component: EquipmentRegistrationComponent,
    canActivate: [AuthGuard,UserGuard]
  },
  {
    path: 'manage-subuser',
    component: ManageSubuserComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'settings',
    loadChildren:'src/app/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard,SetupToolsGuard]
  },
  {
    path: 'settingssidenav',
    component: SettingsSidenavComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user-management', component: SecurityComponent, canActivate: [AuthGuard,SetupToolsGuard] },
  {
    path: 'user-management/modify-privilage',
    component: ModifyPrivilageComponent,
    canActivate: [AuthGuard,SetupToolsGuard]
  },
  {
    path: 'upload',
    component: UploadNorFileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subuser',
    component: SubuserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { sideNavDashboard: true }
  },
  { path: 'sub-user-reg/:subuserid', component: RegisterComponent },
  { path: 'signup/:parentid', component: SignupComponent },
  { path: 'signupemail/:parentid', component: SignupemailComponent },

  { path: 'reset-password', loadChildren:'./resetpassword/resetpassword.module#ResetpasswordModule' },
  { path: 'subuser', component: SubuserComponent },
  { path: 'reset/password/pwdtoken/:token', loadChildren:'./resetpassword/resetpassword.module#ResetpasswordModule'},
  {
    path: 'user-profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'tools',
    loadChildren:'src/app/tools/tools.module#ToolModule',
    canActivate: [AuthGuard,SetupToolsGuard]
  },

  {
    path: 'scheduler',
    loadChildren:'src/app/HeatSchedule/heatSchedule.module#HeatScheduleModule',
    canActivate: [AuthGuard,SetupToolsGuard]
  },


  { path: 'change-password',canActivate:[AuthGuard], component: ChangePasswordComponent },

  { path: 'email-confirmation/:vertkn', component: EmailConfirmationComponent },
  { path: 'email-link', component: EmailLinkComponent },
  { path: 'event-log-files', component: EventLogFilesComponent,canActivate: [AuthGuard] },
  {
    path: 'imported-settings-files',
    component: ImportedSettingsFilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nor-files',
    component: ImportedSettingsFilesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'superadmin',
    loadChildren:"src/app/superadmin/superAdmin.module#SuperAdminModule",
    canActivate: [AuthGuard,SuperAdminGuard]
  },
  
  {
    path: 'Admin',
    canActivate: [AuthGuard,AdminGuard],
    loadChildren:'src/app/Admin/admin.module#AdminModule'
  },
  {
    path: 'plc-mapping',
    loadChildren:'src/app/communication-settings/plc-mapping/plc.module#PlcModule',
    canActivate: [AuthGuard,SetupToolsGuard]
  },
  {
    path: 'tech',
   loadChildren:'src/app/tech/tech.module#TechModule',
    canActivate: [AuthGuard,TechSupportGuard]
  },
 
  { path: 'recipe',
    loadChildren:'src/app/recipe/reciepe.module#ReciepeModule',
    canActivate: [AuthGuard,SetupToolsGuard] 
  },
  
  {path: 'contactUs', component: GetInTouchComponent,canActivate: [ContactGuard] },
  {path:'termsofservice',component: TermsOfServicesComponent},
  {path:'media-center',component: MediaCenterComponent,canActivate:[AuthGuard,UserGuard]},
  {path:'access-denied',component: AccessdeniedComponent},
  {path :"setuptool",component:SetuptoolComponent,data: { sideNavDashboard: true }},
  {path:"pressure-output-settings",component:PressureOutputSettingsComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
