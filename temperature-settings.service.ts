import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureSettingsService {
  authToken: any;
  private apiUrl: string = environment.BASE_URI;
  options;
  constructor(private http: HttpClient, private authService: AuthService) {}

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  updateTempSettings(formData) {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    formData.nor_id = this.authService.getNorId();
    return this.http.post(`${this.apiUrl}/recipe/temp`, formData, { headers });
  }
}
