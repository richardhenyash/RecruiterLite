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

  public loadCandidate(id: number): Observable<Candidate> {
    return this.get(`/api/candidate/${id}`, null, false);
  }
  public saveCandidate(request: Candidate): Observable<Candidate> {
    return this.post('/api/candidate', request, false);
  }
  public toggleIsHiringManager(id: number): Observable<any> {
    return this.put(`/api/candidate/toggleIsHiringManager/${id}`, null, false);
  }
  public deleteCandidate(id: number): Observable<any> {
    return this.delete(`/api/candidate/${id}`, null, false);
  }
}
