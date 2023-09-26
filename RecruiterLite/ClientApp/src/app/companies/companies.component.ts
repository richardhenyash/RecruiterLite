import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap} from "rxjs";
import { Router } from "@angular/router";
import { Company, PaginatedCompanies } from "../models/Company";
import { CompaniesFacade } from "./store/companies.facade";
import {cloneDeep} from "lodash";
import {pageSizeOptions} from "../models/PageSizeOptions";
import {PaginationParams} from "../models/PaginationParams";
import {CompanyParams} from "../models/CompanyParams";
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly companiesFacade: CompaniesFacade, private readonly router: Router) {}

  public paginationParams: PaginationParams = {
    pageIndex: 1,
    pageSize: +pageSizeOptions[2].value,
    count: 0,
    sort: "nameAsc",
  };

  public companies: Company[] = [];
  public loadingCompanies$ = this.companiesFacade.loadingCompanies$;
  ngOnInit(): void {
    this.companiesFacade.loadCompanies(this.paginationParams);
    this.companiesFacade.companies$
      .pipe(
        tap((paginatedCompanies: PaginatedCompanies | null) => {
          if (paginatedCompanies && paginatedCompanies.data) {
            this.companies = paginatedCompanies.data;
            let updatedPaginationParams = cloneDeep(this.paginationParams);
            if (updatedPaginationParams) {
              updatedPaginationParams.pageIndex = +paginatedCompanies.pageIndex;
              updatedPaginationParams.pageSize = +paginatedCompanies.pageSize;
              updatedPaginationParams.count = +paginatedCompanies.count;
              if (paginatedCompanies.search) {
                updatedPaginationParams.search = paginatedCompanies.search;
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
  onEditCompany(id: string | number | undefined) {
    if (id) {
      this.router.navigate(['/companies', +id]);
    }
  }
  onEditCandidate(id: string | number | undefined) {
    if (id) {
      this.router.navigate(['/candidates', +id]);
    }
  }
  onSort(sort: string): void {
    if (sort && this.paginationParams) {
      let updatedPaginationParams = cloneDeep(this.paginationParams);
      updatedPaginationParams.sort = sort;
      this.paginationParams = updatedPaginationParams;
      this.companiesFacade.loadCompanies(updatedPaginationParams as CompanyParams);
    }
  }
  public updatePaginationParams(updatedPaginationParams: PaginationParams) {
    this.paginationParams = updatedPaginationParams;
    this.companiesFacade.loadCompanies(updatedPaginationParams as CompanyParams);
  }
}
