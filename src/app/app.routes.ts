import { Routes } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { FormgenerateComponent } from '../formgenerate/formgenerate.component';

export const routes: Routes = [{
    path:"register", component:FormComponent

},
{
    path:"form/:formId", component:FormgenerateComponent
},
{
    path:"",redirectTo:'register' ,pathMatch:'full'
}
];
