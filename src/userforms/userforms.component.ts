import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userforms',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './userforms.component.html',
  styleUrl: './userforms.component.css'
})
export class UserformsComponent implements OnInit {
  formTitle:any
  constructor(private formservice:FormService, private route:ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
this.formservice.fetchUserForms(id).subscribe({
  next: (res: any) => {
    const targetId = res.result; // Assuming `targetId` is a field in the response
    const fields = res.Fields; 
    this.formTitle = res.Fields.title// Fields from response
    console.log('targetId:', targetId);
    console.log('fields:', fields);

    // Initialize an object to store the mapping
    const mappedFields: Record<string, any> = {};

    for (let item of res.result) {
      console.log("ids:", item._id);
      console.log("additionalFields:", item.additionalFields);

      // Map each `item._id` to its `additionalFields`
      mappedFields[item._id] = {
        additionalFields: item.additionalFields,
        fieldDetails: fields, // Add the `fields` details if needed
      };
    }

    console.log("Mapped Fields:", mappedFields);

    // You can now store `mappedFields` in a variable or use it further
  },
  error: (err) => {
    console.log(err);
  }
});


    }
      
  }

