import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Candidate} from "../../models/Candidate";
import {CandidatesFacade} from "../store/candidates.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil, tap} from "rxjs";
import {ConfirmationModalService} from "../../shared/confirmation-modal/confirmation-modal.service";
import {Company} from "../../models/Company";
import {FilterOption} from "../../models/FilterOption";
@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss']
})
export class CandidateEditComponent implements OnInit, OnDestroy {
  constructor(private readonly candidatesFacade: CandidatesFacade, private readonly router: Router, private readonly route: ActivatedRoute, private confirmationModal: ConfirmationModalService) {}

  public submitted = false;
  public candidateId: number | string | undefined;
  public candidateToEdit: Candidate | undefined = undefined;
  public companies: Company[] = [{
    id: 1,
    companyName: "ACME Ltd",
    phoneNumber: "123456789",
    streetAddress: "10 New Street",
    postCode: "W1 6FE",
    county: "London",
    country: "United Kingdom"
  },
    {
      id: 2,
      companyName: "Casio Ltd",
      phoneNumber: "123456789",
      streetAddress: "5 Old Street",
      postCode: "W1 6FE",
      county: "London",
      country: "United Kingdom"
    }];

  public companySelectOptions: FilterOption[] = [];

  private routeSub: Subscription = new Subscription();
  private unsubscribe$: Subject<void> = new Subject();

  public candidateForm = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    streetAddress: new FormControl<string>('', Validators.required),
    postCode: new FormControl<string>('', Validators.required),
    county: new FormControl<string>('', Validators.required),
    country: new FormControl<string>('', Validators.required),
    companyId: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: any) => {
      this.candidateId = params['id'];
    });
    if (this.candidateId === "new") {
      return;
    }
    this.candidateId && this.candidatesFacade.loadCandidate(+this.candidateId);
    this.candidatesFacade.candidate$
      .pipe(
        tap((candidateToEdit) => {
          if (this.candidateId != "new" && candidateToEdit) {
            this.candidateToEdit = candidateToEdit;
            this.candidateForm.setValue({
              firstName: candidateToEdit.firstName,
              lastName: candidateToEdit.lastName,
              email: candidateToEdit.email,
              phoneNumber: candidateToEdit.phoneNumber,
              streetAddress: candidateToEdit.streetAddress,
              postCode: candidateToEdit.postCode,
              county: candidateToEdit.county,
              country: candidateToEdit.country,
              companyId: candidateToEdit?.companyId ?? null,
            })
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
    this.companySelectOptions = this.companies.map((c => {
      return {
        name: c.companyName,
        value: c.id,
        id: c.id,
      } as FilterOption
    }))
  }
  onUpdateCandidate() {
    this.submitted = true;
    let updatedCandidate = this.candidateForm.value as Candidate;
    if (this.candidateId){
      updatedCandidate.id = +this.candidateId;
    }
    this.candidateForm.valid && updatedCandidate && (this.candidatesFacade.saveCandidate(updatedCandidate));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteCandidate() {
    this.confirmationModal.confirm("Delete Candidate", "Are you sure you want to delete the candidate?", "Delete", "Cancel")
      // Executes if confirm clicked
      .then((confirmed) => {
        this.candidateId && this.candidatesFacade.deleteCandidate(+this.candidateId);
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      // Executes if cancel clicked
      .catch(() => {
      })
  }
  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
