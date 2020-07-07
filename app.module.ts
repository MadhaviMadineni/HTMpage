import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { EquipmentService } from './equipment.service';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemzoneService } from './shared/temzone.service';
import { FillService } from './shared/fill.service';
import { TemperatureSettingsService } from './temperature-settings.service';
import { AdminDhasboardService } from './shared/admin-dhasboard.service';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { FooterComponent,
         DialogContactUs
} from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { SignupComponent } from './profile/register/signup.component';
import { SignupemailComponent } from './profile/register/signupemail.component';
import {
  UserProfileModal,
  LogoutModal,
  SideNavModal,
} from './dashboard/dashboard-header/dashboard-header.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard-home/dashboard.component';
import {
  EquipmentRegistrationComponent,
  DailogAddEquipment,
  DailogEditEquipment,
  DialogNorFileEquipment,
  DeleteNorFileEquip
} from './dashboard/equipment-registration/equipment-registration.component';
import { UserService } from './user.service';
import { ManageSubuserComponent } from './dashboard/manage-subuser/manage-subuser.component';
import { EmailValidationDirective } from './shared/email-validation.directive';
import { ForgotpasswordComponent } from './profile/login/forgotpassword.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { SettingsSidenavComponent } from './settings/settings-sidenav/settings-sidenav.component';
import { SelectRequiredValidatorDirectiveDirective } from './shared/select-required-validator-directive.directive';
import { SecurityComponent } from './settings/security/security-main/security.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { ModifyPrivilageComponent } from './settings/security/modify-privilage/modify-privilage.component';
import {
  SubuserComponent,
  DailogAddSubuser,
  DailogEditSubuser
} from './dashboard/subuser/subuser.component';
import { UploadNorFileComponent } from './upload-nor-file/upload-nor-file.component';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';
import {HeatEventModal} from './HeatSchedule/heat-schedule.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EmailConfirmationComponent } from './profile/email-confirmation/email-confirmation.component';
import { EmailLinkComponent } from './profile/email-link/email-link.component';
import { EventLogFilesComponent } from './dashboard/event-log-files/event-log-files.component';
import { ImportedSettingsFilesComponent,DeleteNorFile } from './dashboard/imported-settings-files/imported-settings-files.component';
import {
  ViewModal,
  EditConfigurationCode
} from './tools/configuration-code/configuration-code.component';
import { TimeconvertPipe } from './pipes/timeconvert.pipe';
import {
  EditUser
} from './superadmin/superadmin-dashboard/superadmin-dashboard.component';
import { NotificationService } from './toastr-notification/toastr-notification.service';
import { FlashserviceService } from './shared/flashservice.service';
import { EventLogFilesService } from './dashboard/event-log-files/event-log-files.service';
import { ConfigDirective } from './shared/config.directive';
import { SerialDirective } from './shared/serial.directive';
import { RoleGuard } from './guards/role.guard';
import { EquipmentValidationDirective } from './shared/equipment-validation.directive';
import {
  SaveAsModal,
  CreateNewModal
} from './recipe/recipe.component';
import { PlcService } from './shared/plc.service';
import { LicenseService } from './shared/license.service';
import { TooltipDirective } from './shared/tooltip.directive';
import { TrimspaceDirective } from './shared/trimspace.directive';
import { UidDirective } from './shared/uid.directive';
import { FormDirective } from './shared/form.directive';
import { PatterncheckPipe } from './pipes/patterncheck.pipe';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { TermsOfServicesComponent } from './terms-of-services/terms-of-services.component';
import { MediaCenterComponent } from './dashboard/media-center/media-center.component';
import { PdfLanguageFilterPipe } from './pipes/pdfLanguageFilter.pipe';
import { ContactGuard } from './guards/contact.guard';
import { AdminGuard } from './guards/admin.guard';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { TechSupportGuard } from './guards/tech-support.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { ShareModule } from './share/share.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserGuard } from './guards/user.guard';
import { SetupToolsGuard } from './guards/setup-tools.guard';
import { AdminSidenavComponent, AddAdmin, TechInviteModal } from './Admin/admin-sidenav/admin-sidenav.component';
import { LanguageService } from './share/language.service';
import { SpinnerService } from './spinner/spinner.service';
import { InterceptorsService } from './shared/interceptors.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Localization } from './shared/localization.interceptor.service';
import { ShiftEventModal } from './HeatSchedule/shift-schedule/shift-schedule.component';
import { AddMaintenanceItem, EditMaintenanceItem, DeleteMaintenanceItem } from './tools/maintenance-status/maintenance-status.component';
import { SetuptoolComponent } from './setuptool/setuptool.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { PressureOutputSettingsComponent } from './pressure-output-settings/pressure-output-settings.component';

@NgModule({
  declarations: [
    SetuptoolComponent,
    AppComponent,
    FooterComponent,
    DialogContactUs,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SignupComponent,
    SignupemailComponent,
    SidenavComponent,
    DashboardComponent,
    UserProfileModal,
    LogoutModal,
    SideNavModal,
    DeleteNorFileEquip,
    EquipmentRegistrationComponent,
    AdminSidenavComponent,
    ManageSubuserComponent,
    EmailValidationDirective,
    ForgotpasswordComponent,
    SettingsSidenavComponent,
    SelectRequiredValidatorDirectiveDirective,
    SecurityComponent,
    NavComponent,
    SubuserComponent,
    DailogAddSubuser,
    DailogEditSubuser,
    DailogAddEquipment,
    DailogEditEquipment,
    DialogNorFileEquipment,
    UploadNorFileComponent,
    ModifyPrivilageComponent,
    UserprofileComponent,
    HeatEventModal,
    ShiftEventModal,
    ChangePasswordComponent,
    EmailConfirmationComponent,
    EmailLinkComponent,
    EventLogFilesComponent,
    ImportedSettingsFilesComponent,
    DeleteNorFile,
    ViewModal,
    EditConfigurationCode,
    TimeconvertPipe,
    ConfigDirective,
    SerialDirective,
    EditUser,
    EquipmentValidationDirective,
    SaveAsModal,
    TooltipDirective,
    TrimspaceDirective,
    CreateNewModal,
    UidDirective,
    FormDirective,
    PatterncheckPipe,
    AddAdmin,
    TechInviteModal,
    GetInTouchComponent,
    TermsOfServicesComponent,
    MediaCenterComponent,
    PdfLanguageFilterPipe,
    AccessdeniedComponent,
    AddMaintenanceItem,
    EditMaintenanceItem,
    DeleteMaintenanceItem,
    PressureOutputSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShareModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    RouterModule.forRoot([]),
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgDragDropModule
  ],
  entryComponents: [
    SubuserComponent,
    DailogAddSubuser,
    DailogEditSubuser,
    SidenavComponent,
    DailogAddEquipment,
    DailogEditEquipment,
    DialogNorFileEquipment,
    HeatEventModal,
    ShiftEventModal,
    ViewModal,
    EditConfigurationCode,
    UserProfileModal,
    LogoutModal,
    DeleteNorFile,
    DeleteNorFileEquip,
    SideNavModal,
    TechInviteModal,
    AddAdmin,
    EditUser,
    SaveAsModal,
    CreateNewModal,
    DialogContactUs,
    AddMaintenanceItem,
    EditMaintenanceItem,
    DeleteMaintenanceItem
  ],

  providers: [
    SpinnerService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorsService,
      multi:true
    },
    {
    provide:HTTP_INTERCEPTORS,
    useClass:Localization,
    multi:true
    },

    UserService,
    AuthService,
    EquipmentService,
    AuthGuard,
    RoleGuard,
    AdminGuard,
    TechSupportGuard,
    SuperAdminGuard,
    ContactGuard,
    UserGuard,
    SetupToolsGuard,
    TemzoneService,
    FillService,
    TemperatureSettingsService,
    NotificationService,
    FlashserviceService,
    AdminDhasboardService,
    EventLogFilesService,
    CookieService,
    LicenseService,
    PlcService,
    {
      provide: APP_INITIALIZER,
      useFactory:(config:LanguageService)=>()=>config.load(),
      deps:[LanguageService],
      multi:true
    }
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule {}
