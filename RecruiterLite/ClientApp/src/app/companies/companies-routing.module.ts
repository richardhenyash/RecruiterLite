import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanyEditComponent} from "./company-edit/company-edit.component";
import {CompaniesComponent} from "./companies.component";

const routes: Routes = [
  { path: '', component: CompaniesComponent, title: 'RecruiterLite - Companies' },
  { path: ':id', component: CompanyEditComponent, title: 'RecruiterLite - Edit Company' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompaniesRoutingModule {}
