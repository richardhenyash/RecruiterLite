import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CandidatesApiService} from "./candidates-api.service";
import {CandidatesActionTypes, loadCandidatesSuccess} from "./candidates.actions";
import {map, switchMap} from "rxjs";

@Injectable()
export class CandidatesEffects {
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CandidatesActionTypes.LOAD_CANDIDATES),
      switchMap(() =>
        this.candidatesApiService.loadCandidates().pipe(map((response) => loadCandidatesSuccess({response})))
      )
    );
  });
  constructor(private actions$: Actions, private candidatesApiService: CandidatesApiService) {
  }
}
