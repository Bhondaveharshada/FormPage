import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../services/form.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-forms',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-forms.component.html',
  styleUrl: './all-forms.component.css'
})
export class AllFormsComponent implements OnInit {
  formFields: any[] = []; // Array to store fetched form fields
  selectedFormId: string | null = null; // For tracking which card is clicked
  showForm: boolean = false; // Toggle for form visibility
  isEditing: boolean = false; // Toggle for edit mode
  formIdToEdit: string | null = null; // Tracks form being edited

  // Form data for creation/editing
  title: string = '';
  additionalFields: { value: string; inputType: string }[] = [];
  formLink: any = '';
  isLinkSaved = false;
  // Store all forms fetched from the database
  _id:any 

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getAllFormFields();
  }

  // Fetch all form fields
  getAllFormFields(): void {
    this.formService.getAllFormFields().subscribe({
      next: (res: any) => {
        console.log('All form fields:', res);
        this.formFields = res.result; // Assuming result contains the array
      },
      error: (err: any) => {
        console.error('Error in fetching form fields', err);
      }
    });
  }

  // Toggle the display of additional fields
  toggleDetails(formId: string): void {
    this.selectedFormId = this.selectedFormId === formId ? null : formId;
  }

 // Add a new dynamic field
 addField(): void {
  this.additionalFields.push({ value: '', inputType: 'text' });
}

// Delete a specific field
deleteField(index: number): void {
  if (index >= 0 && index < this.additionalFields.length) {
    this.additionalFields.splice(index, 1);
  }
}

// Toggle the form for creating/editing
toggleCreateForm(): void {
  if(this.showForm){
    this.resetForm()
  }else{
    this.showForm = true
  }
  this.isEditing = false; 
 
 
}

// Populate form data for editing
editForm(form: any): void {
  this.showForm = true; // Show the form section
  this.isEditing = true; // Set to edit mode
  this.formIdToEdit = form._id; // Store the form ID being edited

  console.log(this.formIdToEdit);
  

  // Populate the form fields
  this.title = form.title;
  this.additionalFields = form.additionalFields.map((field: any) => ({
    value: field.value,
    inputType: field.inputType,
  }));

}

// Save or Update form data
onSave(event: Event): void {
  event.preventDefault(); // Prevent the default form submission behavior

  const formId = new Date().getTime();
  const formData = {
    title: this.title,
    additionalFields: this.additionalFields,
  };

  if (this.isEditing && this.formIdToEdit) {
    // Update existing form
    this.formService.updateFormFields(this.formIdToEdit, formData).subscribe({
      next: (res: any) => {
        console.log('Form updated successfully:', res);
        this.getAllFormFields();
        this.resetForm();
      },
      error: (err: any) => console.error('Error updating form:', err),
    });
  } else {
    // Save new form
    const formId = new Date().getTime();
    this.formService.addFormFields(formData, formId).subscribe({
      next: (res: any) => {
        console.log('Form saved successfully:', res);
        const id = res.result._id;
        this._id = id;
        this.formLink = `${window.location.origin}/form/${id}/${formId}`;
        console.log('formlink form onsave fun', typeof this.formLink, this.formLink);
        const stringLink = `${this.formLink}`;
        console.log('String link', String(stringLink));
        
        this.getAllFormFields();
      },
      error: (err: any) => console.error('Error saving form:', err),
    });
  }
}

deleteForm(id:any){
  if (confirm('Are you sure you want to delete this form?')) {
    this.formService.deleteFormFields(id).subscribe({
      next: (res) => {
        this.getAllFormFields(); // Refresh the list of forms
      },
      error: (err) => console.error('Error deleting form:', err),
    });
  }
}


resetForm():void {
  this.title = '';
this.additionalFields = [];
this.formLink = null;
this.showForm = false;
this.isEditing = false;
this.formIdToEdit = null;
}
  
}

