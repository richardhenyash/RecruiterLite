import { createAction, props } from '@ngrx/store';
import {Company, PaginatedCompanies} from "../../models/Company";
import {CandidateParams} from "../../models/CandidateParams";
import {CompanyParams} from "../../models/CompanyParams";
export enum CompaniesActionTypes {
  LOAD_COMPANIES = '[Companies] Load Companies',
  LOAD_COMPANIES_SUCCESS = '[Companies] Load Companies success',
  LOAD_COMPANIES_ERROR = '[Companies] Load Companies error',

  LOAD_ALL_COMPANIES = '[Companies] Load All Companies',
  LOAD_ALL_COMPANIES_SUCCESS = '[Companies] Load All Companies success',
  LOAD_ALL_COMPANIES_ERROR = '[Companies] Load All Companies error',

  LOAD_COMPANY = '[Companies] Load Company',
  LOAD_COMPANY_SUCCESS = '[Companies] Load Company success',
  LOAD_COMPANY_ERROR = '[Companies] Load Company error',

  SAVE_COMPANY = '[Companies] Save Company',
  SAVE_COMPANY_SUCCESS = '[Companies] Save Company success',
  SAVE_COMPANY_ERROR = '[Companies] Save Company error',

  DELETE_COMPANY = '[Companies] Delete Company',
  DELETE_COMPANY_SUCCESS = '[Companies] Delete Company success',
  DELETE_COMPANY_ERROR = '[Companies] Delete Company error',
}
export const loadCompanies = createAction(CompaniesActionTypes.LOAD_COMPANIES, props<{ companyParams?: CompanyParams }>());
export const loadCompaniesSuccess = createAction(
  CompaniesActionTypes.LOAD_COMPANIES_SUCCESS,
  props<{ response: PaginatedCompanies }>()
);
export const loadCompaniesError = createAction(
  CompaniesActionTypes.LOAD_COMPANIES_ERROR,
  props<{ error: string }>()
);

export const loadAllCompanies = createAction(CompaniesActionTypes.LOAD_ALL_COMPANIES);
export const loadAllCompaniesSuccess = createAction(
  CompaniesActionTypes.LOAD_ALL_COMPANIES_SUCCESS,
  props<{ response: Array<Company> }>()
);
export const loadAllCompaniesError = createAction(
  CompaniesActionTypes.LOAD_ALL_COMPANIES_ERROR,
  props<{ error: string }>()
);
export const loadCompany = createAction(CompaniesActionTypes.LOAD_COMPANY, props<{ id: number }>());
export const loadCompanySuccess = createAction(
  CompaniesActionTypes.LOAD_COMPANY_SUCCESS,
  props<{ response: Company }>()
);
export const loadCompanyError = createAction(
  CompaniesActionTypes.LOAD_COMPANY_ERROR,
  props<{ error: string }>()
);
export const saveCompany = createAction(
  CompaniesActionTypes.SAVE_COMPANY,
  props<{ request: Company }>()
);
export const saveCompanySuccess = createAction(
  CompaniesActionTypes.SAVE_COMPANY_SUCCESS,
  props<{ response: Company }>()
);
export const saveCompanyError = createAction(CompaniesActionTypes.SAVE_COMPANY_ERROR, props<{ error: string }>());
export const deleteCompany = createAction(
  CompaniesActionTypes.DELETE_COMPANY,
  props<{ id: number }>()
);
export const deleteCompanySuccess = createAction(
  CompaniesActionTypes.DELETE_COMPANY_SUCCESS
);
export const deleteCompanyError = createAction(
  CompaniesActionTypes.DELETE_COMPANY_ERROR,
  props<{ error: string }>()
);
