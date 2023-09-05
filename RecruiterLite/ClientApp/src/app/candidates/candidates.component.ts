import {Component, OnInit} from '@angular/core';
import { Candidate } from "../models/Candidate";
import {CandidatesApiService} from "./store/candidates-api.service";
import {CandidatesFacade} from "./store/candidates.facade";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
})
export class CandidatesComponent implements OnInit {
  public unsubscribe$: Subject<void> = new Subject();
  constructor(private readonly candidatesFacade: CandidatesFacade) {}
  public candidatesArray: Candidate[] = [];
  public candidates: Candidate[] = [{
    id: 1,
    firstName: "Richard",
    lastName: "Ash",
    email: "richardash1@gmail.com",
    phoneNumber: "07783837765",
    streetAddress: "30 Sherwood Road, Croydon",
    postCode: "CR07DH",
    county: "Surrey",
    country: "United Kingdom",
    companyId: 1,
    companyName: "ACME Ltd",
  },
    {
      id: 2,
      firstName: "Barbara",
      lastName: "Munnelly",
      email: "barbaramunnelly@gmail.com",
      phoneNumber: "07496500360",
      streetAddress: "30 Sherwood Road, Croydon",
      postCode: "CR07DH",
      county: "Surrey",
      country: "United Kingdom",
      companyId: 2,
      companyName: "ACME Ltd",
    }];

  ngOnInit(): void {
    this.candidatesFacade.loadCandidates();
    this.candidatesFacade.candidates$
      .pipe(
        tap((candidates: Candidate[] | null) => {
          if (candidates) {
            this.candidatesArray = candidates;
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
