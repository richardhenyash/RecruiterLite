import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaseApiService} from "../../api/base-api-service";
import {Company, PaginatedCompanies} from "../../models/Company";

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService extends BaseApiService {
  constructor() {
    super();
  }

  public loadCompanies(): Observable<PaginatedCompanies> {
    return this.get(`/api/company`, null, false);
  }
  public loadAllCompanies(): Observable<Array<Company>> {
    return this.get(`/api/company/all`, null, false);
  }
  public loadCompany(id: number): Observable<Company> {
    return this.get(`/api/company/${id}`, null, false);
  }
  public saveCompany(request: Company): Observable<Company> {
    return this.post('/api/company', request, false);
  }
  public deleteCompany(id: number): Observable<any> {
    return this.delete(`/api/company/${id}`, null, false);
  }
}
