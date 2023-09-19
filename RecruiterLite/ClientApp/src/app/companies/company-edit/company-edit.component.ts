import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil, tap} from "rxjs";
import {ConfirmationModalService} from "../../shared/confirmation-modal/confirmation-modal.service";
import {Company} from "../../models/Company";
import {CompaniesFacade} from "../store/companies.facade";
import {Location} from "@angular/common";
@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  constructor(private readonly companiesFacade: CompaniesFacade, private readonly router: Router,
              private readonly route: ActivatedRoute, private confirmationModal: ConfirmationModalService) {}

  public submitted = false;
  public companyId: number | string | undefined;
  public companyToEdit: Company | undefined = undefined;

  private routeSub: Subscription = new Subscription();
  private unsubscribe$: Subject<void> = new Subject();

  public companyForm = new FormGroup({
    companyName: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    streetAddress: new FormControl<string>('', Validators.required),
    postCode: new FormControl<string>('', Validators.required),
    county: new FormControl<string>('', Validators.required),
    country: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: any) => {
      this.companyId = params['id'];
    });
    if (this.companyId === "new") {
      return;
    }
    this.companyId && this.companiesFacade.loadCompany(+this.companyId);
    this.companiesFacade.company$
      .pipe(
        tap((companyToEdit) => {
          if (this.companyId != "new" && companyToEdit) {
            this.companyToEdit = companyToEdit;
            this.companyForm.setValue({
              companyName: companyToEdit.companyName,
              phoneNumber: companyToEdit.phoneNumber,
              streetAddress: companyToEdit.streetAddress,
              postCode: companyToEdit.postCode,
              county: companyToEdit.county,
              country: companyToEdit.country,
            })
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  onUpdateCompany() {
    this.submitted = true;
    let updatedCompany = this.companyForm.value as Company;
    if (this.companyId){
      updatedCompany.id = +this.companyId;
    }
    this.companyForm.valid && updatedCompany && (this.companiesFacade.saveCompany(updatedCompany));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteCompany() {
    this.confirmationModal.confirm("Delete Company", "Are you sure you want to delete the company?", "Delete", "Cancel")
      // Executes if confirm clicked
      .then((confirmed) => {
        this.companyId && this.companiesFacade.deleteCompany(+this.companyId);
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      // Executes if cancel clicked
      .catch(() => {
      })
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
