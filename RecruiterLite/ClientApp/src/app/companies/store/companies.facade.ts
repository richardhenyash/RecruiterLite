import {Injectable} from "@angular/core";
import {
  loadCompanies, loadCompany, saveCompany, deleteCompany
} from "./companies.actions";
import {Store} from "@ngrx/store";
import {
  selectCompanies,
  selectCompany,
  selectLoadingCompanies
} from "./companies.selectors";
import {Company} from "../../models/Company";

@Injectable({
  providedIn: 'root',
})
export class CompaniesFacade {
  constructor(private store: Store) {}

  companies$ = this.store.select(selectCompanies);
  company$ = this.store.select(selectCompany);
  loadingCompanies$ = this.store.select(selectLoadingCompanies);
  loadCompanies(): void {
    this.store.dispatch(loadCompanies());
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
