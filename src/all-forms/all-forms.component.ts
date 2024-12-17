import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../services/form.service';
import { response } from 'express';


@Component({
  selector: 'app-all-forms',
  standalone: true,
  imports: [],
  templateUrl: './all-forms.component.html',
  styleUrl: './all-forms.component.css'
})
export class AllFormsComponent implements OnInit {
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private formService:FormService ){}
  fields: [] = [];
  formfieldId:any;
  formData='';

  ngOnInit(){
    const formId = this.route.snapshot.paramMap.get('formId');
    const id = this.route.snapshot.paramMap.get('id');
    this.formfieldId = id
   
    this.formService.getFormFields(id).subscribe({
      next:(response:any)=>{
        this.formData=response.result
        this.fields=response.result.additionalFields.map((field: any) => field);
        console.log("fields",this.fields);

      },
      error:(error:any)=>{
        console.log(error);
        

      }
    })

  }

}
