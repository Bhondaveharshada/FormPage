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

  onEdit(form:any){

  }

  onDelete(id:any){
    
  }
}

