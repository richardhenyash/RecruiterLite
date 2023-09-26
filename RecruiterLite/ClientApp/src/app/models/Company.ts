import {Candidate} from "./Candidate";

export interface Company {
  id?: number
  companyName: string
  phoneNumber: string
  streetAddress: string
  postCode: string
  county: string
  country: string
  hiringManagers?: Candidate[]
}
export interface PaginatedCompanies {
  pageIndex: number,
  pageSize: number,
  count: number,
  search?: string,
  data: Company[];
}

