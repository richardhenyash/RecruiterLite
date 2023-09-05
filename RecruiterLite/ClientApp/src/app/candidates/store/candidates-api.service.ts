import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Candidate} from "../../models/Candidate";
import {BaseApiService} from "../../api/base-api-service";

@Injectable({
  providedIn: 'root',
})
export class CandidatesApiService extends BaseApiService {
  constructor() {
    super();
  }

  public loadCandidates(): Observable<Array<Candidate>> {
    return this.get(`/api/candidate`, null, false);
  }
}
