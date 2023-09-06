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
  public saveCandidate(request: Candidate): Observable<Candidate> {
    return this.post('/api/candidate', request, false);
  }
  public deleteCandidate(id: number): Observable<any> {
    return this.delete(`/api/candidate/${id}`, null, false);
  }
}
