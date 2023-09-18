import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaseApiService} from "../../api/base-api-service";
import {Company} from "../../models/Company";

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService extends BaseApiService {
  constructor() {
    super();
  }

  public loadCompanies(): Observable<Array<Company>> {
    return this.get(`/api/company`, null, false);
  }

  public loadCompany(id: number): Observable<Company> {
    console.log("LOAD COMPANY FIRED");
    return this.get(`/api/company/${id}`, null, false);
  }
  public saveCompany(request: Company): Observable<Company> {
    return this.post('/api/company', request, false);
  }
  public deleteCompany(id: number): Observable<any> {
    return this.delete(`/api/company/${id}`, null, false);
  }
}
