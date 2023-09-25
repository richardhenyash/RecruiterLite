import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap} from "rxjs";
import { Router } from "@angular/router";
import { Company, PaginatedCompanies } from "../models/Company";
import { CompaniesFacade } from "./store/companies.facade";
import {cloneDeep} from "lodash";
import {CompanyParams} from "../models/CompanyParams";
import {FormBuilder} from "@angular/forms";
import {pageSizeOptions} from "../models/PageSizeOptions";
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly companiesFacade: CompaniesFacade, private readonly router: Router,
              private fb: FormBuilder) {}

  private _companyParams: CompanyParams = {
    pageIndex: 1,
    pageSize: +pageSizeOptions[2].value,
    count: 0,
    sort: "nameAsc",
  };

  public searchForm = this.fb.group({
    search: "",
  });

  public pageSizeForm = this.fb.group({
    pageSize: pageSizeOptions[2].value,
  });

  public pageSizeOptions = pageSizeOptions;

  public companies: Company[] = [];
  public loadingCompanies$ = this.companiesFacade.loadingCompanies$;
  ngOnInit(): void {
    this.companiesFacade.loadCompanies(this._companyParams);
    this.companiesFacade.companies$
      .pipe(
        tap((paginatedCompanies: PaginatedCompanies | null) => {
          if (paginatedCompanies && paginatedCompanies.data) {
            this.companies = paginatedCompanies.data;
            let updatedCompanyParams = cloneDeep(this.companyParams);
            if (updatedCompanyParams) {
              updatedCompanyParams.pageIndex = paginatedCompanies.pageIndex;
              updatedCompanyParams.pageSize = paginatedCompanies.pageSize;
              updatedCompanyParams.count = paginatedCompanies.count;
              this.companyParams = updatedCompanyParams;
              console.log(this.companyParams);
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
    if (sort && this.companyParams) {
      let updatedCompanyParams = cloneDeep(this.companyParams);
      updatedCompanyParams.sort = sort;
      this.companyParams = updatedCompanyParams;
      console.log(this.companyParams);
      this.companiesFacade.loadCompanies(updatedCompanyParams);
    }
  }
  onSearch(): void {
    let search = this.searchForm.controls['search'].value;
    let updatedCompanyParams = cloneDeep(this.companyParams);
    if (updatedCompanyParams) {
      if (search) {
        updatedCompanyParams.search = search
      } else {
        delete updatedCompanyParams.search;
      }
      this.companyParams = updatedCompanyParams;
      this.companiesFacade.loadCompanies(updatedCompanyParams);
    }
  }
  onNextPage(): void {
    let updatedCompanyParams = cloneDeep(this.companyParams);
    if (updatedCompanyParams) {
      if (this.checkNext(updatedCompanyParams.pageIndex, updatedCompanyParams.pageSize, updatedCompanyParams.count)) {
        updatedCompanyParams.pageIndex = updatedCompanyParams.pageIndex + 1;
        this.companyParams = updatedCompanyParams;
        this.companiesFacade.loadCompanies(updatedCompanyParams);
      }
    }
  }
  onPreviousPage(): void {
    let updatedCompanyParams = cloneDeep(this.companyParams);
    if (updatedCompanyParams) {
      if (this.checkPrevious(updatedCompanyParams.pageIndex)) {
        updatedCompanyParams.pageIndex = updatedCompanyParams.pageIndex - 1;
        this.companyParams = updatedCompanyParams;
        this.companiesFacade.loadCompanies(updatedCompanyParams);
      }
    }
  }
  checkPrevious(index: number | undefined | null) {
    if (index) {
      return index -1 > 0;
    }
    return true;
  }
  checkNext(index: number | undefined | null, pageSize: number | undefined | null, count: number | undefined | null) {
    if (index && pageSize && count) {
      return index + 1 <= Math.ceil(count / pageSize);
    }
    return false;
  }
  checkPagination(pageSize: number | undefined | null, count: number | undefined | null) {
    return !!(pageSize && count && count > pageSize);
  }
  onSelectPageSize(event: any){
    let newPageSize = event.target.value;
    let updatedCompanyParams = cloneDeep(this.companyParams);
    if (newPageSize && updatedCompanyParams) {
      updatedCompanyParams.pageSize = newPageSize;
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
