import {Injectable} from "@angular/core";
import {
  deleteCandidate,
  loadCandidates,
  loadCandidate,
  saveCandidate
} from "./candidates.actions";
import {Store} from "@ngrx/store";
import {selectCandidate, selectCandidates, selectLoadingCandidates} from "./candidates.selectors";
import {Candidate} from "../../models/Candidate";
import {CandidateParams} from "../../models/CandidateParams";

@Injectable({
  providedIn: 'root',
})
export class CandidatesFacade {
  constructor(private store: Store) {}

  candidates$ = this.store.select(selectCandidates);
  candidate$ = this.store.select(selectCandidate);
  loadingCandidates$ = this.store.select(selectLoadingCandidates);
  loadCandidates(candidateParams?: CandidateParams): void {
    this.store.dispatch(loadCandidates( { candidateParams }));
  }
  loadCandidate(id: number): void {
    this.store.dispatch(loadCandidate({ id }));
  }
  saveCandidate(request: Candidate): void {
    this.store.dispatch(saveCandidate({ request }));
  }
  deleteCandidate(id: number): void {
    this.store.dispatch(deleteCandidate({ id }));
  }

}
