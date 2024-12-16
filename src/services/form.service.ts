import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  //apiUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }
 

  addform(data:any){
    console.log("data to add", data);
    
   return this.http.post(`${environment.api}/addform`,data)
  }

  getForm(id:any){
    return this.http.get(`${environment.api}/getFrom`,id)
  }

  addFormFields(data:any, formId:any){
    const {title,addformfields} = data
    return this.http.post(`${environment.api}/addformfields`, {data,formId});
  }

  getFormFields(id:any)
  {
    return this.http.get(`${environment.api}/getformfields/${id}`);
  }
     
}
