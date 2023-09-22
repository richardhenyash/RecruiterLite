import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Candidate, PaginatedCandidates} from "../../models/Candidate";
import {BaseApiService} from "../../api/base-api-service";
import {CandidateParams} from "../../models/CandidateParams";
@Injectable({
  providedIn: 'root',
})
export class CandidatesApiService extends BaseApiService {
  constructor() {
    super();
  }
  public loadCandidates(candidateParams?: CandidateParams): Observable<PaginatedCandidates> {
    return this.get(`/api/candidate`, candidateParams, false);
  }
  public loadCandidate(id: number): Observable<Candidate> {
    return this.get(`/api/candidate/${id}`, null, false);
  }
  public saveCandidate(request: Candidate): Observable<Candidate> {
    return this.post('/api/candidate', request, false);
  }
  public deleteCandidate(id: number): Observable<any> {
    return this.delete(`/api/candidate/${id}`, null, false);
  }
}
