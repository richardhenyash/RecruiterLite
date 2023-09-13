import {RouterModule, Routes} from "@angular/router";
import {CandidatesComponent} from "./candidates.component";
import {NgModule} from "@angular/core";
import {CandidateEditComponent} from "./candidate-edit/candidate-edit.component";

const routes: Routes = [
  { path: '', component: CandidatesComponent, title: 'RecruiterLite - Candidates' },
  { path: ':id', component: CandidateEditComponent, title: 'RecruiterLite - Edit Candidate' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CandidatesRoutingModule {}
