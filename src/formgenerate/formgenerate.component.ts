import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormService } from '../services/form.service';
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
    
    // Get form data from localStorage
    // const storedData = localStorage.getItem(`form_${formId}`);
    // if (storedData) {
    //   this.formData = JSON.parse(storedData);
    // Initialize form with retrieved data
    

     
  
  }

  fetchFormFields(id:any): void {
    this.formService.getFormFields(id).subscribe({
      next:(response:any)=>{
        this.formData=response.result
        this.fields=response.result.additionalFields.map((field: any) => field);
        console.log("fields",this.fields);
        
        console.log("formfields",this.formData);
        this.previewForm = this.fb.group({
          title: [this.formData.title, Validators.required],
          additionalFields: this.fb.array(
            this.formData.additionalFields.map((field: any) =>
              this.fb.group({
                value: ['', this.getValidators(field.inputType)], // Pre-fill values
                inputType: [field.inputType, Validators.required], 
              }) 
            )
          ),
        });
        console.log("preiview from",this.previewForm);
        
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
  

    // Getter for additional fields
    get additionalFields(): FormArray {
      return this.previewForm?.get('additionalFields') as FormArray;
    }
    onSubmit() {
      if (this.previewForm?.valid) {
          this.formService.addform(this.previewForm.value, this.formfieldId).subscribe({
              next: (res: any) => {
                  console.log("Stored successfully", res.result);
                  alert("Form Submitted Successfully!!!");
  
                  // Use the _id from the response to fetch the form data
                  const id = res.result._id;
                  this.formService.getForm(id).subscribe({
                      next: (formRes: any) => {
                          console.log("Form data:", formRes.form); // Access the `form` object here
                      },
                      error: (err: any) => {
                          console.error("Error fetching form data:", err);
                      },
                  });
              },
              error: (err: any) => {
                  console.log("Error submitting form:", err);
              },
          });
  
          console.log("Submitted Form Data:", this.previewForm.value);
      } else {
          console.log("Form is invalid");
      }
  }
  
}