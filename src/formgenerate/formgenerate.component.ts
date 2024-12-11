import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formgenerate',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './formgenerate.component.html',
  styleUrl: './formgenerate.component.css'
})
export class FormgenerateComponent {
    
  formGroup: FormGroup;
  formData = { title: 'Form Title', question: 'Your Question Here' }; // Static title and question

  constructor(private fb: FormBuilder,private route: ActivatedRoute) {
    this.formGroup = this.fb.group({
      answer: ['', [Validators.required]] // Answer field with required validation
    });
  }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    const savedForm = localStorage.getItem(`form_${formId}`);
    if (savedForm) {
      this.formData = JSON.parse(savedForm);
    }
  }

  submitAnswer() {
    if (this.formGroup.valid) {
      console.log('Answer Submitted:', this.formGroup.value.answer);
      alert('Answer submitted successfully!');
    } else {
      alert('Please provide an answer.');
    }
  }

}
