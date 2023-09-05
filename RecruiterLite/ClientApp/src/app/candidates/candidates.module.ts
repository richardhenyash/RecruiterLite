import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CandidatesComponent} from "./candidates.component";
import {CandidatesRoutingModule} from "./candidates-routing.module";

@NgModule({
  imports: [CommonModule, CandidatesRoutingModule],
  declarations: [CandidatesComponent],
  exports: [CandidatesComponent],
})
export class CandidatesModule {}
