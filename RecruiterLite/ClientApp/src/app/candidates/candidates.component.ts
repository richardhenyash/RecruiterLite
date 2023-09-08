import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Candidate } from "../models/Candidate";
import { CandidatesFacade } from "./store/candidates.facade";
import { Subject, takeUntil, tap} from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade, private readonly cdf: ChangeDetectorRef) {}

  public candidates: Candidate[] = [];
  public candidateId: string | number | undefined;
  public loadingCandidates$ = this.candidatesFacade.loadingCandidates$;

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

  onUpdateCandidate() {
    let updatedCandidate = this.candidateForm.value as Candidate;
    if (this.candidateId){
      updatedCandidate.id = +this.candidateId;
    }
    this.candidateForm.valid && updatedCandidate && (this.candidatesFacade.saveCandidate(updatedCandidate));
  }
  onDeleteCandidate(id: string | number | undefined) {
    id && this.candidatesFacade.deleteCandidate(+id);
  }

  onClearForm() {
    this.candidateId = undefined;
    this.candidateForm.reset();
  }
  onEditCandidate(id: string | number | undefined) {
    if (id) {
      let candidateToEdit = this.candidates.filter((c => c.id === +id))[0];
      if (candidateToEdit) {
        this.candidateId = id;
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
    }
  }
}
