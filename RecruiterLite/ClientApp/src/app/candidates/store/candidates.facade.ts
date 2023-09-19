import {Injectable} from "@angular/core";
import {
  deleteCandidate,
  loadCandidates,
  loadCandidate,
  saveCandidate,
  toggleIsHiringManager
} from "./candidates.actions";
import {Store} from "@ngrx/store";
import {selectCandidate, selectCandidates, selectLoadingCandidates} from "./candidates.selectors";
import {Candidate} from "../../models/Candidate";

@Injectable({
  providedIn: 'root',
})
export class CandidatesFacade {
  constructor(private store: Store) {}

  candidates$ = this.store.select(selectCandidates);
  candidate$ = this.store.select(selectCandidate);
  loadingCandidates$ = this.store.select(selectLoadingCandidates);
  loadCandidates(): void {
    this.store.dispatch(loadCandidates());
  }
  loadCandidate(id: number): void {
    this.store.dispatch(loadCandidate({ id }));
  }
  saveCandidate(request: Candidate): void {
    this.store.dispatch(saveCandidate({ request }));
  }
  toggleIsHiringManager(id: number): void {
    this.store.dispatch(toggleIsHiringManager({ id }));
  }
  deleteCandidate(id: number): void {
    this.store.dispatch(deleteCandidate({ id }));
  }

}
