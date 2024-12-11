import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }
 

  addform(data:any,formId:Number){
    const {title ,question} = data ;
   return this.http.post(`${this.apiUrl}/addform`,{title,question,formId})
  }
}
