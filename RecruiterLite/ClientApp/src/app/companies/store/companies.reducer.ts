import {createReducer, on} from "@ngrx/store";
import {CompaniesState, initialState} from "./companies.state";
import * as CompaniesActions from "./companies.actions";
import {ApiState} from "../../models/ApiState";
export const companiesFeatureKey = 'companies';
export const companiesReducer = createReducer(
  initialState,

  on(CompaniesActions.loadCompanies, (state): CompaniesState => ({ ...state, companiesStatus: ApiState.LOADING })),
  on(
    CompaniesActions.loadCompaniesSuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      companies: response,
      companiesStatus: ApiState.SUCCESS,
    })
  ),
  on(CompaniesActions.loadCompaniesError, (state, { error }): CompaniesState => ({ ...state, error, companiesStatus: ApiState.FAIL })),

  on(CompaniesActions.loadAllCompanies, (state): CompaniesState => ({ ...state, allCompaniesStatus: ApiState.LOADING })),
  on(
    CompaniesActions.loadAllCompaniesSuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      allCompanies: response,
      allCompaniesStatus: ApiState.SUCCESS,
    })
  ),
  on(CompaniesActions.loadAllCompaniesError, (state, { error }): CompaniesState => ({ ...state, error, allCompaniesStatus: ApiState.FAIL })),

  on(CompaniesActions.loadCompany, (state): CompaniesState => ({ ...state, companyStatus: ApiState.LOADING })),
  on(
    CompaniesActions.loadCompanySuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      company: response,
      companyStatus: ApiState.SUCCESS,
    })
  ),
  on(CompaniesActions.loadCompanyError, (state, { error }): CompaniesState => ({ ...state, error, companyStatus: ApiState.FAIL })),

  on(CompaniesActions.saveCompany, (state): CompaniesState => ({ ...state, saveCompanyStatus: ApiState.LOADING })),
  on(CompaniesActions.saveCompanySuccess,(state): CompaniesState => ({...state, saveCompanyStatus: ApiState.SUCCESS})),
  on(CompaniesActions.saveCompanyError, (state, { error }): CompaniesState => ({ ...state, error, saveCompanyStatus: ApiState.FAIL })),

  on(CompaniesActions.deleteCompany, (state): CompaniesState => ({ ...state, deleteCompanyStatus: ApiState.LOADING })),
  on(
    CompaniesActions.deleteCompanySuccess,
    (state): CompaniesState => ({
      ...state,
      deleteCompanyStatus: ApiState.SUCCESS,
    })
  ),
  on(
    CompaniesActions.deleteCompanyError,
    (state, { error }): CompaniesState => ({ ...state, error, deleteCompanyStatus: ApiState.FAIL })
  ),

);
