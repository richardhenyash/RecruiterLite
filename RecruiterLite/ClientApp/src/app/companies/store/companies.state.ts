import {ApiState} from "../../models/ApiState";
import {Company, PaginatedCompanies} from "../../models/Company";
export interface CompaniesState {
  companies: PaginatedCompanies | null;
  companiesStatus: ApiState;

  allCompanies: Array<Company> | null;
  allCompaniesStatus: ApiState;

  company: Company | null;
  companyStatus: ApiState;

  saveCompany: Company | null;
  saveCompanyStatus: ApiState;

  deleteCompany: Company | null;
  deleteCompanyStatus: ApiState;

  error: string | null
}

export const initialState: CompaniesState = {
  companies: null,
  companiesStatus: ApiState.INITIAL,

  allCompanies: null,
  allCompaniesStatus: ApiState.INITIAL,

  company: null,
  companyStatus: ApiState.INITIAL,

  saveCompany: null,
  saveCompanyStatus: ApiState.INITIAL,

  deleteCompany: null,
  deleteCompanyStatus: ApiState.INITIAL,

  error: null
}
