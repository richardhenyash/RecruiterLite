import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CandidatesComponent} from "./candidates.component";
import {CandidatesRoutingModule} from "./candidates-routing.module";
import {CandidatesStoreModule} from "./store/candidates-store.module";
import {SpinnerModule} from "../shared/spinner/spinner.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CandidateEditComponent } from './candidate-edit/candidate-edit.component';
import {ConfirmationModalModule} from "../shared/confirmation-modal/confirmation-modal.module";
import {CompaniesStoreModule} from "../companies/store/companies-store.module";
import {BackButtonModule} from "../shared/back-button/back-button.module";

@NgModule({
  imports: [CommonModule, CandidatesRoutingModule, CandidatesStoreModule, CompaniesStoreModule, SpinnerModule,
    BackButtonModule, ReactiveFormsModule, ConfirmationModalModule],
  declarations: [CandidatesComponent, CandidateEditComponent],
  exports: [CandidatesComponent],
})
export class CandidatesModule {}
