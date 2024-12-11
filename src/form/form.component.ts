import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  userForm:any=FormGroup;

     constructor(private _fb:FormBuilder){}

     ngOnInit(){
      this.userForm =this._fb.group({
        fname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
        lname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
        username:['',[Validators.required,Validators.email]],
        city:['',[Validators.required]],
        state: [false,[Validators.required]],
        zipCode: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(6),Validators.minLength(6)]],
        isAgree :[false,[Validators.requiredTrue]]

      })
     }

     onSave(){

      const formvalue = this.userForm.value
      console.log(formvalue);
      
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
