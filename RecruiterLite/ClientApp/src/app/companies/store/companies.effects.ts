import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CompaniesApiService} from "./companies-api.service";
import {
  CompaniesActionTypes, deleteCompanyError,
  deleteCompanySuccess,
  loadCompanies,
  loadCompaniesSuccess,
  loadCompanySuccess,
  saveCompanyError,
  saveCompanySuccess,
} from "./companies.actions";
import {map, of, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatesActionTypes} from "../../candidates/store/candidates.actions";

@Injectable()
export class CompaniesEffects {
  loadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActionTypes.LOAD_COMPANIES),
      switchMap(() =>
        this.companiesApiService.loadCompanies().pipe(map((response) => loadCompaniesSuccess({response})))
      )
    );
  });

  loadCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActionTypes.LOAD_COMPANY),
      switchMap(({ id }) =>
        this.companiesApiService.loadCompany(id).pipe(map((response) => loadCompanySuccess({response})))
      )
    );
  });

  saveCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActionTypes.SAVE_COMPANY),
      switchMap(({ request }) =>
        this.companiesApiService.saveCompany(request).pipe(
          map(() => {
            return saveCompanySuccess(request);
          }),
          catchError((error: HttpErrorResponse) => of(saveCompanyError({ error: error.message })))
        )
      )
    );
  });

  deleteCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActionTypes.DELETE_COMPANY),
      switchMap(({ id }) =>
        this.companiesApiService.deleteCompany(id).pipe(
          map(() => deleteCompanySuccess()),
          catchError((error: HttpErrorResponse) => of(deleteCompanyError({ error: error.message })))
        )
      )
    );
  });

  reloadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CompaniesActionTypes.SAVE_COMPANY_SUCCESS,
        CompaniesActionTypes.DELETE_COMPANY_SUCCESS,
        CandidatesActionTypes.SAVE_CANDIDATE_SUCCESS,
        CandidatesActionTypes.DELETE_CANDIDATE_SUCCESS,
      ),
      map((response) => loadCompanies())
    );
  });
  constructor(private actions$: Actions, private companiesApiService: CompaniesApiService) {
  }
}
