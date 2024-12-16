import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  title: string = '';
  formLink: string | null = null;
  additionalFields: { value: string; inputType: string }[] = []; // Store fields dynamically

  constructor(private formService: FormService) {}

  ngOnInit(): void {
      
  }

  addField(): void {
    // Add a new field with default values
    this.additionalFields.push({ value: '', inputType: 'text' });
  }

  updateFieldType(index: number, type: string): void {
    // Update the selected input type for a specific field
    this.additionalFields[index].inputType = type;
  }

  onSave(): void {
    const formId = new Date().getTime();
    const formData = {
      title: this.title,
      additionalFields: this.additionalFields,
    };

    console.log('Form Data:', formData);

    // Store the form data in localStorage
    localStorage.setItem(`form_${formId}`, JSON.stringify(formData));

    // Save form data via service
    this.formService.addFormFields(formData, formId).subscribe({
      next: (res: any) => {
        console.log('Fields stored successfully:', res.result);
        const id = res.result._id;
        const formId = res.result.formId;
        this.formLink = `${window.location.origin}/form/${id}/${formId}`;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }

  /*   fillData(){
      this.userForm.setValue({  //or patchValue() but for setValue we cannot miss even singal control unlike patchValue.
        id:101,
        fname:'Harshada',
        lname:'bhondave',
        email:"harshada@gmail.com",
        mobileno:8007307303
      })

    }
 */
}
