import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap} from "rxjs";
import { Router } from "@angular/router";
import { Company, PaginatedCompanies } from "../models/Company";
import { CompaniesFacade } from "./store/companies.facade";
import { Location } from '@angular/common';
import {cloneDeep} from "lodash";
import {CompanyParams} from "../models/CompanyParams";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly companiesFacade: CompaniesFacade, private readonly router: Router,
              private location: Location) {}

  private _companyParams: CompanyParams = {
    pageIndex: 1,
    pageSize: 10,
    count: 10,
    sort: "nameAsc",
  };

  public companies: Company[] = [];
  public loadingCompanies$ = this.companiesFacade.loadingCompanies$;
  ngOnInit(): void {
    this.companiesFacade.loadCompanies();
    this.companiesFacade.companies$
      .pipe(
        tap((paginatedCompanies: PaginatedCompanies | null) => {
          if (paginatedCompanies && paginatedCompanies.data) {
            this.companies = paginatedCompanies.data;
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
    if (sort && this.companyParams) {
      let updatedCompanyParams = cloneDeep(this.companyParams);
      updatedCompanyParams.sort = sort;
      this.companyParams = updatedCompanyParams;
      this.companiesFacade.loadCompanies(updatedCompanyParams);
    }
  }
  public get companyParams() {
    return this._companyParams;
  }
  public set companyParams(params: CompanyParams | null | undefined) {
    if (params) {
      this._companyParams = params;
    }
  }
}
