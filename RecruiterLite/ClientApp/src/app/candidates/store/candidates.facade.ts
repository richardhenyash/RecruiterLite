import {Injectable} from "@angular/core";
import {deleteCandidate, loadCandidates, saveCandidate} from "./candidates.actions";
import {Store} from "@ngrx/store";
import {selectCandidates, selectLoadingCandidates} from "./candidates.selectors";
import {Candidate} from "../../models/Candidate";

@Injectable({
  providedIn: 'root',
})
export class CandidatesFacade {
  constructor(private store: Store) {}

  candidates$ = this.store.select(selectCandidates);
  loadingCandidates$ = this.store.select(selectLoadingCandidates);
  loadCandidates(): void {
    this.store.dispatch(loadCandidates());
  }
  saveCandidate(request: Candidate): void {
    this.store.dispatch(saveCandidate({ request }));
  }
  deleteCandidate(id: number): void {
    return this.store.dispatch(deleteCandidate({ id }));
  }

}
