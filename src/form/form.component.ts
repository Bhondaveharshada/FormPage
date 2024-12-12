import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
        additionalFields: this._fb.array([]), // Dynamic fields
      });
    }
  
    // Getter for additionalFields
    get additionalFields(): FormArray {
      return this.userForm.get('additionalFields') as FormArray;
    }


    addField(): void {
      const newField = this._fb.group({
        value: ['', Validators.required], // Add validation as needed
      });
      this.additionalFields.push(newField);
    }

     onSave(){
      const formId = new Date().getTime();
      const formvalue = this.userForm.value
      console.log("formdata", formvalue);
      
      localStorage.setItem(`form_${formId}`, JSON.stringify(formvalue)); 
      this.formLink = `${window.location.origin}/form/${formId}`;
      // Save form data locally
      this.formService.addFormFields(formvalue,formId).subscribe({
        next:(res:any)=>{
          console.log("stored successfully",res.result);
          const id = res.result._id
          this.formLink = `${window.location.origin}/form/${id}/${formId}`;

          
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
