export interface Candidate {
  id?: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  phoneNumber: string
  streetAddress: string
  postCode: string
  county: string
  country: string
  companyId?: number
  companyName?: string
  isHiringManager: boolean
}
export interface PaginatedCandidates {
  pageIndex: number,
  pageSize: number,
  count: number,
  data: Candidate[];
}
