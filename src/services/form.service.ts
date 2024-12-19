import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  //apiUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }
 

  addform(data:any,fieldsId:any){
    const payload = { ...data, fieldsId };
   return this.http.post(`${environment.api}/addform`,payload)
  }

  getForm(id:any){
    return this.http.get(`${environment.api}/getForm`,id)
  }

  addFormFields(data:any, formId:any){
    const {title,addformfields} = data
    return this.http.post(`${environment.api}/addformfields`, {data,formId});
  }

  getFormFields(id:any)
  {
    return this.http.get(`${environment.api}/getformfields/${id}`);
  }

  getAllFormFields(){
    return this.http.get(`${environment.api}/getallformsFields`)
  }
  
  updateFormFields(id:any,data:any){
    const {title,addformfields} = data
    return this.http.patch(`${environment.api}/updateFormFields/${id}`,{data})
  }

  saveFormLink(id:any,formLink:string){
    console.log('Sending data to server:', formLink);
    return this.http.put(`${environment.api}/savelinktoFormFields/${id}`,{formLink})
  }

  deleteFormFields(id: any) {
    return this.http.delete(`${environment.api}/deleteformfields/${id}`);
  }
}
