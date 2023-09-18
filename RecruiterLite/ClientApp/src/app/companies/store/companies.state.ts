import {ApiState} from "../../models/ApiState";
import {Company} from "../../models/Company";
export interface CompaniesState {
  companies: Array<Company> | null;
  companiesStatus: ApiState;

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

  company: null,
  companyStatus: ApiState.INITIAL,

  saveCompany: null,
  saveCompanyStatus: ApiState.INITIAL,

  deleteCompany: null,
  deleteCompanyStatus: ApiState.INITIAL,

  error: null
}
