import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  userForm:any=FormGroup;
  formLink: string | null = null;

     constructor(private _fb:FormBuilder,
        private formService : FormService
     ){}

     ngOnInit(){
      this.userForm =this._fb.group({
        title:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
        question:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
     
      })
     }

     onSave(){
      const formId = new Date().getTime();
      const formvalue = this.userForm.value
      localStorage.setItem(`form_${formId}`, JSON.stringify(formvalue)); // Save form data locally
      this.formLink = `${window.location.origin}/form/${formId}`;
      console.log(formvalue);
      this.formService.addform(formvalue,formId).subscribe({
        next:(res:any)=>{
          console.log("stored successfully",res);
          
        },error :(err:any)=>{
          console.log("errrorrr");
          
        }
      })
  
    
      
      //console.log(formData.value);
     // console.log(this.regForm.value);
     // console.log(formData.valid);
      
     // console.log(this.regForm.get('fname').value);
      // this.regForm.reset({
      //   'fname':"harshada"
      // })
      
    }

    fillData(){
      this.userForm.setValue({  //or patchValue() but for setValue we cannot miss even singal control unlike patchValue.
        id:101,
        fname:'Harshada',
        lname:'bhondave',
        email:"harshada@gmail.com",
        mobileno:8007307303
      })

    }

}
