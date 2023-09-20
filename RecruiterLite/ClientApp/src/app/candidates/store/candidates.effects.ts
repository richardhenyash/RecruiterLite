import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CandidatesApiService} from "./candidates-api.service";
import {
  CandidatesActionTypes, deleteCandidateError, deleteCandidateSuccess, loadCandidates,
  loadCandidatesSuccess, loadCandidateSuccess,
  saveCandidateError, saveCandidateSuccess
} from "./candidates.actions";
import {map, of, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class CandidatesEffects {
  loadCandidates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CandidatesActionTypes.LOAD_CANDIDATES),
      switchMap(() =>
        this.candidatesApiService.loadCandidates().pipe(map((response) => loadCandidatesSuccess({response})))
      )
    );
  });

  loadCandidate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CandidatesActionTypes.LOAD_CANDIDATE),
      switchMap(({ id }) =>
        this.candidatesApiService.loadCandidate(id).pipe(map((response) => loadCandidateSuccess({response})))
      )
    );
  });

  saveCandidate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CandidatesActionTypes.SAVE_CANDIDATE),
      switchMap(({ request }) =>
        this.candidatesApiService.saveCandidate(request).pipe(
          map(() => {
            return saveCandidateSuccess(request);
          }),
          catchError((error: HttpErrorResponse) => of(saveCandidateError({ error: error.message })))
        )
      )
    );
  });

  deleteCandidate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CandidatesActionTypes.DELETE_CANDIDATE),
      switchMap(({ id }) =>
        this.candidatesApiService.deleteCandidate(id).pipe(
          map(() => deleteCandidateSuccess()),
          catchError((error: HttpErrorResponse) => of(deleteCandidateError({ error: error.message })))
        )
      )
    );
  });

  reloadCandidates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CandidatesActionTypes.SAVE_CANDIDATE_SUCCESS,
        CandidatesActionTypes.DELETE_CANDIDATE_SUCCESS
      ),
      map((response) => loadCandidates())
    );
  });
  constructor(private actions$: Actions, private candidatesApiService: CandidatesApiService) {
  }
}
