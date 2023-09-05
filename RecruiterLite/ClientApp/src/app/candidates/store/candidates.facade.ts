import {Injectable} from "@angular/core";
import {loadCandidates} from "./candidates.actions";
import {Store} from "@ngrx/store";
import {selectCandidates, selectLoadingCandidates} from "./candidates.selectors";

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
}
