import {createReducer, on} from "@ngrx/store";
import {CompaniesState, initialState} from "./companies.state";
import {
  deleteCompany,
  deleteCompanyError,
  deleteCompanySuccess,
  loadAllCompanies,
  loadAllCompaniesError,
  loadAllCompaniesSuccess,
  loadCompanies,
  loadCompaniesError,
  loadCompaniesSuccess,
  loadCompany,
  loadCompanyError,
  loadCompanySuccess,
  saveCompany,
  saveCompanyError,
  saveCompanySuccess
} from "./companies.actions";
import {ApiState} from "../../models/ApiState";
export const companiesFeatureKey = 'companies';
export const companiesReducer = createReducer(
  initialState,

  on(loadCompanies, (state): CompaniesState => ({ ...state, companiesStatus: ApiState.LOADING })),
  on(
    loadCompaniesSuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      companies: response,
      companiesStatus: ApiState.SUCCESS,
    })
  ),
  on(loadCompaniesError, (state, { error }): CompaniesState => ({ ...state, error, companiesStatus: ApiState.FAIL })),

  on(loadAllCompanies, (state): CompaniesState => ({ ...state, allCompaniesStatus: ApiState.LOADING })),
  on(
    loadAllCompaniesSuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      allCompanies: response,
      allCompaniesStatus: ApiState.SUCCESS,
    })
  ),
  on(loadAllCompaniesError, (state, { error }): CompaniesState => ({ ...state, error, allCompaniesStatus: ApiState.FAIL })),

  on(loadCompany, (state): CompaniesState => ({ ...state, companyStatus: ApiState.LOADING })),
  on(
    loadCompanySuccess,
    (state, { response }): CompaniesState => ({
      ...state,
      company: response,
      companyStatus: ApiState.SUCCESS,
    })
  ),
  on(loadCompanyError, (state, { error }): CompaniesState => ({ ...state, error, companyStatus: ApiState.FAIL })),

  on(saveCompany, (state): CompaniesState => ({ ...state, saveCompanyStatus: ApiState.LOADING })),
  on(saveCompanySuccess,(state): CompaniesState => ({...state, saveCompanyStatus: ApiState.SUCCESS})),
  on(saveCompanyError, (state, { error }): CompaniesState => ({ ...state, error, saveCompanyStatus: ApiState.FAIL })),

  on(deleteCompany, (state): CompaniesState => ({ ...state, deleteCompanyStatus: ApiState.LOADING })),
  on(
    deleteCompanySuccess,
    (state): CompaniesState => ({
      ...state,
      deleteCompanyStatus: ApiState.SUCCESS,
    })
  ),
  on(
    deleteCompanyError,
    (state, { error }): CompaniesState => ({ ...state, error, deleteCompanyStatus: ApiState.FAIL })
  ),

);
