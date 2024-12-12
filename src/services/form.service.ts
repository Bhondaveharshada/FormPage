import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }
 

  addform(data:any){
    const {title ,question} = data ;
   return this.http.post(`${this.apiUrl}/addform`,data)
  }

  getForm(formId:any){
    return this.http.get(`${this.apiUrl}/getFrom`,formId)
  }

  addFormFields(data:any, formId:any){
    const {title,addformfields} = data 
    return this.http.post(`${this.apiUrl}/addformfields`, {data},formId);
  }
}
