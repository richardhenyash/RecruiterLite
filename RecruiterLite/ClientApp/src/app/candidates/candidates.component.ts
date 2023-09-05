import {Component, OnInit} from '@angular/core';
import { Candidate } from "../models/Candidate";
import {CandidatesApiService} from "./store/candidates-api.service";
import {CandidatesFacade} from "./store/candidates.facade";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade) {}

  public candidates: Candidate[] = [];
  public loadingCandidates$ = this.candidatesFacade.loadingCandidates$;
  ngOnInit(): void {
    this.candidatesFacade.loadCandidates();
    this.candidatesFacade.candidates$
      .pipe(
        tap((candidates: Candidate[] | null) => {
          if (candidates) {
            this.candidates = candidates;
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
