import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";
import {Company} from "../models/Company";
import {CompaniesFacade} from "./store/companies.facade";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly companiesFacade: CompaniesFacade, private readonly router: Router) {}

  public companies: Company[] = [];
  public loadingCompanies$ = this.companiesFacade.loadingCompanies$;
  ngOnInit(): void {
    this.companiesFacade.loadCompanies();
    this.companiesFacade.companies$
      .pipe(
        tap((companies: Company[] | null) => {
          if (companies) {
            this.companies = companies;
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
}
