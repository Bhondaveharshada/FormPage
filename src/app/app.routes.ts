import { Routes } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { FormgenerateComponent } from '../formgenerate/formgenerate.component';
import { AllFormsComponent } from '../all-forms/all-forms.component';

export const routes: Routes = [{
    path:"register", component:FormComponent

},
{
    path:"form/:id/:formId", component:FormgenerateComponent
},
{
    path:"",redirectTo:'register' ,pathMatch:'full'
},
{
    path:"allForms" , component:AllFormsComponent
}
];
