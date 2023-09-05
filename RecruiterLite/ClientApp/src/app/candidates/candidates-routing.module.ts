import {RouterModule, Routes} from "@angular/router";
import {CandidatesComponent} from "./candidates.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '', component: CandidatesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CandidatesRoutingModule {}
