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
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private formService:FormService, ) {
  
  }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('formId');
    const id = this.route.snapshot.paramMap.get('id');
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
        this.fields = response.result.additionalFields
        console.log("fields",this.fields);
        
        console.log("formfields",this.formData);
        this.previewForm = this.fb.group({
          title: [this.formData.title, Validators.required],
          additionalFields: this.fb.array(
            this.formData.additionalFields.map((field: any) =>
              this.fb.group({
                value: [field.value, Validators.required], // Pre-fill values
              })
            )
          ),
        });
        
      },error: (err:any)=>{
        console.error("error fetching fields",err);
        
      }
    });
  }

  
  
  

    // Getter for additional fields
    get additionalFields(): FormArray {
      return this.previewForm?.get('additionalFields') as FormArray;
    }

  onSubmit() {
    if (this.previewForm?.valid) {
      this.formService.addform(this.previewForm.value).subscribe({
        next:(res:any)=>{
          console.log("stored successfully",res.result);
          const id = res.result._id
      

          
        },error :(err:any)=>{
          console.log("errrorrr");
        }  
        }) ;
      console.log("Submitted Form Data:", this.previewForm.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
