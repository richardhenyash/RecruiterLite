import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Candidate, PaginatedCandidates} from "../models/Candidate";
import { CandidatesFacade } from "./store/candidates.facade";
import { Subject, takeUntil, tap} from "rxjs";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as lodash from 'lodash';
import {CandidateParams} from "../models/CandidateParams";
import {cloneDeep} from "lodash";
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade, private readonly router: Router,
              private readonly cdf: ChangeDetectorRef, private fb: FormBuilder) {}

  public candidates: Candidate[] = [];
  public loadingCandidates$ = this.candidatesFacade.loadingCandidates$;
  public candidateForms: FormGroup[] = [];
  private _candidateParams: CandidateParams = {
    pageIndex: 1,
    pageSize: 10,
    count: 10,
    sort: "nameAsc",
  };

  public emptyCandidateForm = this.fb.group({
    id: [0],
    isHiringManager: false,
  });
  ngOnInit(): void {
    this.candidatesFacade.loadCandidates();
    this.candidatesFacade.candidates$
      .pipe(
        tap((paginatedCandidates: PaginatedCandidates | null) => {
          if (paginatedCandidates && paginatedCandidates.data) {
            this.candidates = paginatedCandidates.data;
            this.candidateForms = paginatedCandidates.data.map((c =>
              this.fb.group({
                  id: [c.id],
                  isHiringManager: c.isHiringManager
              })))
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
  onToggleIsHiringManager(id: number | string | undefined, event: any) {
    if (id) {
      let existingCandidate = this.candidates.filter(c => c.id === id)[0] as Candidate;
      let updatedCandidate = lodash.cloneDeep(existingCandidate);
      if (updatedCandidate) {
        updatedCandidate.isHiringManager = event.target.checked;
        this.candidatesFacade.saveCandidate(updatedCandidate);
      }
    }
  }
  getCandidateForm(id: number | string | undefined) {
    let candidateForm = this.emptyCandidateForm;
    if (id){
      candidateForm = this.candidateForms.filter((cf => cf.controls['id'].value === +id))[0];
    }
    return candidateForm;
  }
  onSort(sort: string): void {
    if (sort && this.candidateParams) {
      let updatedCandidateParams = cloneDeep(this.candidateParams);
      updatedCandidateParams.sort = sort;
      this.candidateParams = updatedCandidateParams;
      this.candidatesFacade.loadCandidates(updatedCandidateParams);
    }
  }

  public get candidateParams() {
    return this._candidateParams;
  }
  public set candidateParams(params: CandidateParams | null | undefined) {
    if (params) {
      this._candidateParams = params;
    }
  }

}
