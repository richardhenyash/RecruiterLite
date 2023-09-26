import {Injectable} from "@angular/core";
import {
  loadCompanies, loadAllCompanies, loadCompany, saveCompany, deleteCompany
} from "./companies.actions";
import {Store} from "@ngrx/store";
import {
  selectAllCompanies,
  selectCompanies,
  selectCompany,
  selectLoadingCompanies
} from "./companies.selectors";
import {Company} from "../../models/Company";
import {CandidateParams} from "../../models/CandidateParams";
import {CompanyParams} from "../../models/CompanyParams";

@Injectable({
  providedIn: 'root',
})
export class CompaniesFacade {
  constructor(private store: Store) {}

  companies$ = this.store.select(selectCompanies);
  allCompanies$ = this.store.select(selectAllCompanies);
  company$ = this.store.select(selectCompany);
  loadingCompanies$ = this.store.select(selectLoadingCompanies);
  loadCompanies(companyParams?: CompanyParams): void {
    this.store.dispatch(loadCompanies({companyParams}));
  }
  loadAllCompanies(): void {
    this.store.dispatch(loadAllCompanies());
  }
  loadCompany(id: number): void {
    this.store.dispatch(loadCompany({ id }));
  }
  saveCompany(request: Company): void {
    this.store.dispatch(saveCompany({ request }));
  }
  deleteCompany(id: number): void {
    return this.store.dispatch(deleteCompany({ id }));
  }
}
