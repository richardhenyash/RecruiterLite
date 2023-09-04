import { Component } from '@angular/core';
import { Candidate } from "../Models/Candidate";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
})
export class CandidatesComponent {
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
}
