import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Candidate } from "../models/Candidate";
import { CandidatesFacade } from "./store/candidates.facade";
import { Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade, private readonly router: Router,
              private readonly cdf: ChangeDetectorRef) {}

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
  onEditCandidate(id: string | number | undefined) {
    if (id) {
      this.router.navigate(['/candidates', +id]);
    }
  }

  onToggleIsHiringManager(id: number | string | undefined) {
    if (id) {
      this.candidatesFacade.toggleIsHiringManager(+id);
    }
  }
}
