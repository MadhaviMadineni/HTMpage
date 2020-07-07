import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService implements OnInit {

  _equipments=new BehaviorSubject([])
  dataStore: {equipments } = { equipments: [] };
  readonly equipments = this._equipments.asObservable();

  authToken: any;
  apiUrl: string = environment.BASE_URI;
  equipmentData: any;
  userEmailData: any;
  editDesciption: string = environment.editDescription ;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  createAuthHeader() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return { headers };
  }
  

  get(id) {
    return this.http
      .get(`${this.apiUrl}/equipment/user/${id}`)
      .pipe(map((data: any) => data));
  }

  // get Equipments @Gaurav
  getEquipments(id, page) {
    this.http.get(
      `${this.apiUrl}/equipment/user/${id}/${page}`,
      this.createAuthHeader()
    ).subscribe((data:any)=>{
      if (data.status === 'success') {
        this.dataStore.equipments=data.result;
        this._equipments.next(Object.assign({},this.dataStore).equipments)
      }
    },(err)=>{
        console.log('err', err);
    })
  }
   // Edit nor Description @Gaurav
  saveNorFileDesc(formData,toaster,dialog){
    this.http.put(`${this.apiUrl}/${this.editDesciption}`, formData,this.createAuthHeader())
    .subscribe(
        (data: any) => {
          if (data.Status === true) {
            this.dataStore.equipments.forEach((equipment,index2)=>{
              equipment.nordata.forEach((norData,index)=>{
                if(norData.nor_id===formData.nor_id){
                  this.dataStore.equipments[index2].nordata[index].norfile_description=formData.norfile_description
                  toaster.success('NorFile Description is Updated Successfully', '', {
                    timeOut: 3000
                  });
                }
              })
            })
            console.log(this.dataStore)
            this._equipments.next(Object.assign({}, this.dataStore).equipments);
            dialog.close();
          }
        },
        (err: any) => {
          console.log('err', err);
        }
      );
  }
  // Delete Nor file @Gaurav
  deleteNorFile(formData,dialog,toaster){
    this.http.post(`${this.apiUrl}/norfile/delete`, formData,this.createAuthHeader())
    .subscribe((data:any)=>{
      if(data.Status==='Success'){
        this.dataStore.equipments.forEach((equipment,index2)=>{
          console.log(equipment);
          equipment.nordata.forEach((norData,index)=>{
            if(norData.nor_id===formData.nor_id){
              this.dataStore.equipments[index2].nordata.splice(index,1)
            }
          })
        })
        this._equipments.next(Object.assign({}, this.dataStore).equipments);
        toaster.success('Nor File Deleted Successfully', '', {
          timeOut: 3000
        });
        dialog.close()
      }
    },(err:any)=>{
      console.log('err',err)
    })
  }
  // get subuser Equipment @Gaurav
  getSubuserEquipment(formData) {
    return this.http.post(
      `${this.apiUrl}/subuserequipment`,
      formData,
      this.createAuthHeader()
    ).subscribe((data:any)=>{
      if (data.status === 'success') {
        this.dataStore.equipments=data.result;
        this._equipments.next(Object.assign({},this.dataStore).equipments)
      }
    },(err)=>{
        console.log('err', err);
    })
  }
  // add Model @Gaurav
  addEquipment(formData,disableBtn,dialog,toaster) {
    this.http.post(`${this.apiUrl}/equipment`, formData)
    .subscribe(
      (data: any) => {
        if (data.Status === 'Success') {
          this.dataStore.equipments.unshift(data.message)
          this._equipments.next(Object.assign({}, this.dataStore).equipments);
          disableBtn = true;
          dialog.close();
          toaster.success('Model Added Successfully ', '', {
            timeOut: 3000
          });
        }
      },
      (err: any) => {
        console.log('err equipment', err);
      }
    );
  }
  // update Equipment @Gaurav
  updateEquipment(id, formData,toaster,dialogRef) {
    return this.http.put(
      `${this.apiUrl}/equipment/${id}`,
      formData,
      this.createAuthHeader())
      .subscribe(
      (data: any) => {
        if (data.Status === 'Success') {
          console.log('data',data)
          this.dataStore.equipments.forEach((equipment,index)=>{
            if(equipment.id===id){
              Object.assign(this.dataStore.equipments[index],formData)
            }
          })
          toaster.success('Model Updated Successfully', '', {timeOut: 3000});
          dialogRef.close();
          this._equipments.next(Object.assign({}, this.dataStore).equipments);
        }
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }

  del(id) {
    return this.http.delete(`${this.apiUrl}/equipment/${id}`);
  }

  getEquipment(id) {
    return this.http.get(
      `${this.apiUrl}/equipmentDetails/${id}`,
      this.createAuthHeader()
    );
  }

  getEquipmentByParent(id) {
    return this.http.get(`${this.apiUrl}/equipmentparentid/${id}`);
  }

  registerEquipment(formData) {
    return this.http.post(`${this.apiUrl}/equipment`, formData);
  }

  editEquipment(norId, locationUrl) {
    this.authService.setNorId(norId);
    return this.http.get(`${this.apiUrl}/editnorfile?nor_id=${norId}&loc_url=${locationUrl}`,this.createAuthHeader());
  }
  // Edit as a new File @Gaurav
  editAsNewEquipment(formData) {
    return this.http.post(`${this.apiUrl}/edit-as-new-norfile`,formData,this.createAuthHeader());
  }


  getUniqueEquipment() {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const data = { equipment_sn: control.value };
      return this.http
        .post(`${this.apiUrl}/checkequipment`, { equipment_sn: control.value })
        .pipe(
          map(
            (users: any) => {
              return users && users.status != 'Success'
                ? { uniqueEquipment: true }
                : null;
            },
            err => {
              console.log('err', err);
            }
          )
        );
    };
  }
  setEquipmentData(data) {
    this.equipmentData = data;
  }
  getEuipmentData() {
    return this.equipmentData !== undefined ? this.equipmentData : JSON.parse(localStorage.getItem('equipmentData'));
  }
  setRegistrationEmailData(data) {
    this.userEmailData = data;
  }
  getRegistrationEmailData() {
    return this.userEmailData;
  }
  getSerialNumValidation(data) {
    return this.http
      .post(`${this.apiUrl}/checkequipment`, data)
      .pipe(
        map(
          (users: any) => {
            return users && users.status != 'Success'
              ? { uniqueEquipment: true }
              : null;
          }
        )
      );
  }
  getConfigurationCode(formData){
    //http://52.167.114.62:3200/api/pro-blu-config
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return this.http.post(`${this.apiUrl}/pro-blu-config`, formData, { headers });
  }
  // deleteNorFile(formData){
  //   return this.http.post(`${this.apiUrl}/norfile/delete`, formData,this.createAuthHeader())
  // }
  getUserEquipment(){
    return this.http.get(`${this.apiUrl}/equipment-list`,this.createAuthHeader())
  }

  //Validate Serial Number and UID for equipment-- @Gaurav
  ValidateEquipment(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.http
        .post(`${this.apiUrl}/checkequipment`, 
        { 
          equipment_sn: control.value.equipment_sn,
          uid:control.value.uid
        },
        this.createAuthHeader())
        .pipe(
          map(
            (equipments: any) => {
              return equipments && equipments.status !== 'Fail' ? null : { uniqueEquipment: true };
            },
            err => {
              console.log('err', err);
            }
          )
        );
    };
  }
}
