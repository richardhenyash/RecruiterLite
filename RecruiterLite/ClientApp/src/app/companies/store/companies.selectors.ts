import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CompaniesState} from "./companies.state";
import {companiesFeatureKey} from "./companies.reducer";
import {ApiState} from "../../models/ApiState";

const selectCompaniesFeature = createFeatureSelector<CompaniesState>(companiesFeatureKey);
export const selectCompanies = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.companies
);
export const selectAllCompanies = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.allCompanies
);
export const selectCompany = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.company
);
export const selectCompaniesStatus = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.companiesStatus
);
export const selectAllCompaniesStatus = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.allCompaniesStatus
);
export const selectCompanyStatus = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) => state.companyStatus
);
export const selectLoadingCompanies = createSelector(
  selectCompaniesFeature,
  (state: CompaniesState) =>
    state.companiesStatus === ApiState.LOADING ||
    state.allCompaniesStatus === ApiState.LOADING ||
    state.companyStatus === ApiState.LOADING ||
    state.saveCompanyStatus === ApiState.LOADING ||
    state.deleteCompanyStatus === ApiState.LOADING
);
