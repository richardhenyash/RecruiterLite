import {Component, OnInit} from '@angular/core';
import {Candidate, PaginatedCandidates} from "../models/Candidate";
import { CandidatesFacade } from "./store/candidates.facade";
import { Subject, takeUntil, tap} from "rxjs";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as lodash from 'lodash';
import {CandidateParams} from "../models/CandidateParams";
import {cloneDeep} from "lodash";
import {PaginationParams} from "../models/PaginationParams";
import {pageSizeOptions} from "../models/PageSizeOptions";
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade, private readonly router: Router,
              private fb: FormBuilder) {}

  public candidates: Candidate[] = [];
  public loadingCandidates$ = this.candidatesFacade.loadingCandidates$;
  public candidateForms: FormGroup[] = [];

  public paginationParams: PaginationParams = {
    pageIndex: 1,
    pageSize: +pageSizeOptions[2].value,
    count: 0,
    sort: "nameAsc",
  };

  public emptyCandidateForm = this.fb.group({
    id: [0],
    isHiringManager: false,
  });

  public searchForm = this.fb.group({
    search: '',
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
            let updatedPaginationParams = cloneDeep(this.paginationParams);
            if (updatedPaginationParams) {
              updatedPaginationParams.pageIndex = +paginatedCandidates.pageIndex;
              updatedPaginationParams.pageSize = +paginatedCandidates.pageSize;
              updatedPaginationParams.count = +paginatedCandidates.count;
              if (paginatedCandidates.search) {
                updatedPaginationParams.search = paginatedCandidates.search;
              } else {
                delete updatedPaginationParams.search;
              }
              this.paginationParams = updatedPaginationParams;
            }
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
    if (sort && this.paginationParams) {
      let updatedPaginationParams = cloneDeep(this.paginationParams);
      updatedPaginationParams.sort = sort;
      this.paginationParams = updatedPaginationParams;
      this.candidatesFacade.loadCandidates(updatedPaginationParams as CandidateParams);
    }
  }

  onUpdateSearch(event: any) {
    let companyNameSearch = event.target.value;
    let updatedCandidateParams = cloneDeep(this.paginationParams) as CandidateParams;
    if (updatedCandidateParams) {
      if (companyNameSearch) {
        updatedCandidateParams.companyName = companyNameSearch;
      } else {
        delete updatedCandidateParams.companyName;
      }
      this.candidatesFacade.loadCandidates(updatedCandidateParams as CandidateParams);
    }
  }
  public updatePaginationParams(updatedPaginationParams: PaginationParams) {
    this.paginationParams = updatedPaginationParams;
    this.candidatesFacade.loadCandidates(updatedPaginationParams as CandidateParams);
  }

}
