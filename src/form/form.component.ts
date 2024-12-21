import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  showForm: boolean = false; // Toggle for form visibility
  isEditing: boolean = false; // Toggle for edit mode
  formIdToEdit: string | null = null; // Tracks form being edited

  // Form data for creation/editing
  title: string = '';
  additionalFields: { value: string; inputType: string, isrequired:string }[] = [];
  formLink: any = '';
  isLinkSaved = false;
  // Store all forms fetched from the database
  formFields: any[] = [];
  _id:any
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.fetchForms(); // Fetch all forms initially
  }

  // Fetch all forms from the backend
  fetchForms(): void {
    this.formService.getAllFormFields().subscribe({
      next: (res: any) => {
        this.formFields = res.result || [];
        console.log('Fetched forms:', this.formFields);
      },
      error: (err: any) => console.error('Error fetching forms:', err),
    });
  }

  // Add a new dynamic field
  addField(): void {
    this.additionalFields.push({ value: '', inputType: 'text', isrequired: 'optional' });
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
/*   editForm(form: any): void {
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

  } */

  // Save or Update form data
  onSave(event: Event): void {
     event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      title: this.title,
      additionalFields: this.additionalFields,
    };
  /*
    if (this.isEditing && this.formIdToEdit) {
      // Update existing form
      this.formService.updateFormFields(this.formIdToEdit, formData).subscribe({
        next: (res: any) => {
          console.log('Form updated successfully:', res);
          this.fetchForms();
          this.resetForm();
        },
        error: (err: any) => console.error('Error updating form:', err),
      });
    } else { */
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
          this.saveLink();
          this.fetchForms();
        },
        error: (err: any) => console.error('Error saving form:', err),
      });
    }

  
  saveLink(){
    if (this.formLink) {
      if (this.isLinkSaved) return; 
      
      this.formService.saveFormLink(this._id, this.formLink ).subscribe({
        next: (res:any) => {
          this.isLinkSaved = true;
          console.log('Link saved successfully',res.result);
        },
        error: (err: any) => console.error('Error saving link:', err),
      });
    }
  }
  // Reset form fields
  resetForm(): void {
    this.title = '';
    this.additionalFields = [];
    this.formLink = null;
    this.showForm = false;
    this.isEditing = false;
    this.formIdToEdit = null;
  }

  // Delete a form
  deleteForm(id: any) {
    if (confirm('Are you sure you want to delete this form?')) {
      this.formService.deleteFormFields(id).subscribe({
        next: (res) => {
          this.fetchForms(); // Refresh the list of forms
        },
        error: (err) => console.error('Error deleting form:', err),
      });
    }
}
}

