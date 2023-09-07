import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CandidatesComponent} from "./candidates.component";
import {CandidatesRoutingModule} from "./candidates-routing.module";
import {CandidatesStoreModule} from "./store/candidates-store.module";
import {SpinnerModule} from "../shared/spinner/spinner.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, CandidatesRoutingModule, CandidatesStoreModule, SpinnerModule, ReactiveFormsModule],
  declarations: [CandidatesComponent],
  exports: [CandidatesComponent],
})
export class CandidatesModule {}
