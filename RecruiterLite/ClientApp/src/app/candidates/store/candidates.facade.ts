import {Injectable} from "@angular/core";
import {loadCandidates} from "./candidates.actions";
import {Store} from "@ngrx/store";
import {selectCandidates} from "./candidates.selectors";

@Injectable({
  providedIn: 'root',
})
export class CandidatesFacade {
  constructor(private store: Store) {}

  candidates$ = this.store.select(selectCandidates);
  loadCandidates(): void {
    this.store.dispatch(loadCandidates());
  }
}
