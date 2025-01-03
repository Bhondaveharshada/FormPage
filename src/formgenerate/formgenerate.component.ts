import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormService } from '../services/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formgenerate',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './formgenerate.component.html',
  styleUrl: './formgenerate.component.css'
})
export class FormgenerateComponent {
  previewForm: FormGroup | null = null;
  
  
  // Replace with the ObjectId you want to fetch
  
  userFormData :any ;
  formData: any = null; // Static title and question
  fields: [] = [];
  formfieldId:any;
  
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private formService:FormService, ) {
  
  }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('formId');
    const id = this.route.snapshot.paramMap.get('id');
    this.formfieldId = id
    this.fetchFormFields(id)
    this.previewForm?.get('additionalFields')?.valueChanges.subscribe((fields: any[]) => {
      fields.forEach((field, index) => {
        const fieldControl = (this.previewForm?.get('additionalFields') as FormArray).at(index) as FormGroup;
  
        if (field.isrequired === 'required') {
          fieldControl.get('value')?.setValidators(this.getValidators(field.inputType));
        } else {
          fieldControl.get('value')?.clearValidators();
        }
        fieldControl.get('value')?.updateValueAndValidity(); // Recalculate validations
      });
    });

     
  
  }

  fetchFormFields(id:any): void {
    this.formService.getFormFields(id).subscribe({
      next:(response:any)=>{
        this.formData=response.result
        this.fields=response.result.additionalFields.map((field: any) => field);
        console.log("fields",this.fields);
        
       /*  console.log("formfields",this.formData); */
        this.previewForm = this.fb.group({
          title: [this.formData.title, Validators.required],
          additionalFields: this.fb.array(
            this.formData.additionalFields.map((field: any) =>
              this.fb.group({
                value: ['', this.getDynamicValidators(field)], // Pre-fill values
                inputType: [field.inputType, Validators.required], 
                isrequired: [field.isrequired]
              }) 
            )
          ),
        });
       /*  console.log("preiview from",this.previewForm); */
        
      },error: (err:any)=>{
        console.error("error fetching fields",err);  
      }
    });
  }

  
  getValidators(inputType: string) {
    switch (inputType) {
      case 'email':
        return [Validators.required, Validators.email];
      case 'number':
        return [Validators.required, Validators.pattern(/^[0-9]+$/)];
      case 'text':
        return [Validators.required, Validators.minLength(3)];
      case 'password':
        return [Validators.required, Validators.minLength(6)];
      default:
        return [Validators.required]; // Default validator
    }
  }
  getDynamicValidators(field: any) {
    if (field.isrequired === 'required') {
      return this.getValidators(field.inputType); // Apply validators if 'required'
    }
    return []; // No validators if 'optional'
  }

    // Getter for additional fields
    get additionalFields(): FormArray {
      return this.previewForm?.get('additionalFields') as FormArray;
    }

  onSubmit() {
    if (this.previewForm?.valid) {
      this.formService.addform(this.previewForm.value, this.formfieldId).subscribe({
        next:(res:any)=>{
          const fields = this.fields;
          const userform = res.result.additionalFields
          console.log("userform stored",userform);
          Swal.fire({
            title: 'Success!',
            text: 'form submitted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
          const id = res.result._id
          console.log("Id",id);
   
         this.userFormData = this.processSubmittedData(fields,userform)
         console.log("userformData",this.userFormData);
         
         
          
        },error :(err:any)=>{
          console.log("errrorrr");
        }  
        }) ;
      console.log("Submitted Form Data:", this.previewForm.value);
    } else {
      console.log("Form is invalid");
    }
  }

  processSubmittedData(fields: any[], additionalFields: any[]): any[] {
    // Validate inputs
    if (!Array.isArray(fields) || !Array.isArray(additionalFields)) {
      console.error("Invalid fields or additionalFields:", { fields, additionalFields });
      return [];
    }
  
    return fields.map((field: any, index: number) => {
      return {
        label: field.value || "Unknown Field", // Handle missing value
        value: additionalFields[index]?.value || "No Value", // Handle missing value
      };
    });
  }



}