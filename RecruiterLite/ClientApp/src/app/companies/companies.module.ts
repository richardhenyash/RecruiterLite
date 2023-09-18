import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SpinnerModule} from "../shared/spinner/spinner.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmationModalModule} from "../shared/confirmation-modal/confirmation-modal.module";
import {CompanyEditComponent} from "./company-edit/company-edit.component";
import {CompaniesComponent} from "./companies.component";
import {CompaniesStoreModule} from "./store/companies-store.module";
import {CompaniesRoutingModule} from "./companies-routing.module";

@NgModule({
  imports: [CommonModule, CompaniesRoutingModule, CompaniesStoreModule, SpinnerModule, ReactiveFormsModule, ConfirmationModalModule],
  declarations: [CompaniesComponent, CompanyEditComponent],
  exports: [CompaniesComponent],
})
export class CompaniesModule {}
