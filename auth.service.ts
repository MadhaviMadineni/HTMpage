import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  authToken: any;
  decToken: any;
  private apiUrl: string = environment.BASE_URI;
  private endpoint: string = environment.userdetails;
  private subuser: string = environment.subUser;
  private uploadNorFile: string = environment.importNorFile;
  userFUllName: Subject<string> = new Subject<string>();
  timeFormatToChild: Subject<boolean> = new Subject<boolean>();
  private nor_id: string;
  private contactUs: string = environment.contactUs
  userProfile:Observable<any>
  constructor(private http: HttpClient) {
      this.userFUllName.next('---');

  }

  ngOnInit() {


  }
  
  saveToken(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
   // use this function to pass auth header
  createAuthHeader() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return { headers };
  }

  // extract paload from the token
  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('token')
    localStorage.removeItem('nor_id')
    localStorage.removeItem('userData')
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  addSubUser(formValue) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    const { user_id } = this.decodeToken();
    const subUserData = {
      email: formValue.email,
      full_name: formValue.full_name,
      parent_user_id: user_id,
      access_type: formValue.access
    };
    return this.http.post(`${this.apiUrl}/admin/regstats`, subUserData, {
      headers
    });
  }

  inviteAdmin(formValue) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );

    return this.http.post(`${this.apiUrl}/admin/create`, formValue, {
      headers
    });
  }

  uploadNor(formData) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );

    return this.http.post(`${this.apiUrl + this.uploadNorFile}`, formData, {
      headers
    });
  }

  getnorId() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );

    return this.http.get(`${this.apiUrl}/getnorid`, { headers });
  }

  getxmlData() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );

    return this.http.get(`${this.apiUrl}/currentxmldata?nor_id=${this.getNorId()}`, { headers });
  }
  getConfigCodeDataUpdatedCode() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return this.http.get(`${this.apiUrl}/config-code-history?nor_id=${this.getNorId()}`, { headers });
  }

  getConfigCodeLog(){
    return this.http.get(`${this.apiUrl}/config-code-log?nor_id=${this.getNorId()}`,this.createAuthHeader());
  }

  getsecurityData() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return this.http.post(`${this.apiUrl}/getsystemsecurity`, { nor_id: this.getNorId() }, { headers });
  }

  updateXml(formValue, tempUnits) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    const formData = {
      SetpointTempZone0: formValue.grid,
      SetpointTempZone1: formValue.manifold,
      SetpointTempZone2: formValue.hose1,
      SetpointTempZone3: formValue.hose2,
      SetpointTempZone4: formValue.hose3,
      SetpointTempZone5: formValue.hose4,
      SetpointTempZone6: formValue.hose5,
      SetpointTempZone7: formValue.hose6,
      SetpointTempZone8: formValue.hose7,
      SetpointTempZone9: formValue.hose8,
      SetpointTempZone10: formValue.applicator1,
      SetpointTempZone11: formValue.applicator2,
      SetpointTempZone12: formValue.applicator3,
      SetpointTempZone13: formValue.applicator4,
      SetpointTempZone14: formValue.applicator5,
      SetpointTempZone15: formValue.applicator6,
      SetpointTempZone16: formValue.applicator7,
      SetpointTempZone17: formValue.applicator8,
      ZoneControl2: formValue.toogle1,
      ZoneControl3: formValue.toogle2,
      ZoneControl4: formValue.toogle3,
      ZoneControl5: formValue.toogle4,
      ZoneControl6: formValue.toogle5,
      ZoneControl7: formValue.toogle6,
      ZoneControl8: formValue.toogle7,
      ZoneControl9: formValue.toogle8,
      ZoneControl10: formValue.app1,
      ZoneControl11: formValue.app2,
      ZoneControl12: formValue.app3,
      ZoneControl13: formValue.app4,
      ZoneControl14: formValue.app5,
      ZoneControl15: formValue.app6,
      ZoneControl16: formValue.app7,
      ZoneControl17: formValue.app8,
      TempUnits: tempUnits,
      nor_id: this.getNorId()
    };
    // formData.nor_id = this.getNorId();
    return this.http.post(`${this.apiUrl}/recipe/tempzone`, formData, {
      headers
    });
  }

  updateInput(formData) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    formData.nor_id = this.getNorId();
    return this.http.post(`${this.apiUrl}/recipe/sysio`, formData, { headers });
  }

  updateOutput(formData) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    formData.nor_id = this.getNorId();
    return this.http.post(`${this.apiUrl}/recipe/sysio`, formData, { headers });
  }

  getNorId(){
    this.nor_id ? null : this.nor_id = localStorage.getItem('nor_id');
    return this.nor_id;
  }

  // TODO use observable below
  setNorId(norId){
    this.nor_id = norId;
    localStorage.setItem('nor_id',norId);
  }

  inviteTechSupportUser(formValue) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return this.http.post(
      `${this.apiUrl}/admin/create/tecsupportusr`,
      formValue,
      { headers }
    );
  }

  setUserfullName(name) {
    this.userFUllName.next(name);
  }
  preventalpha(evt){
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)   ){
      return false;
    }
}
submitContactData(data){
//contactUs
this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    // formData.nor_id = this.getNorId();
    return this.http.post(`${this.apiUrl}${this.contactUs}`, data);
}

submitNetworPlc(formData) {
  formData.nor_id = this.getNorId();
  return this.http.post(`${this.apiUrl}/recipe/network`, formData, this.createAuthHeader());
}

}
