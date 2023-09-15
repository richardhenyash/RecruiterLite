import {Candidate} from "../../models/Candidate";
import {ApiState} from "../../models/ApiState";

export interface CandidatesState {
  candidates: Array<Candidate> | null;
  candidatesStatus: ApiState;

  candidate: Candidate | null;
  candidateStatus: ApiState;

  saveCandidate: Candidate | null;
  saveCandidateStatus: ApiState;

  deleteCandidate: Candidate | null;
  deleteCandidateStatus: ApiState;

  error: string | null
}

export const initialState: CandidatesState = {
  candidates: null,
  candidatesStatus: ApiState.INITIAL,

  candidate: null,
  candidateStatus: ApiState.INITIAL,

  saveCandidate: null,
  saveCandidateStatus: ApiState.INITIAL,

  deleteCandidate: null,
  deleteCandidateStatus: ApiState.INITIAL,

  error: null
}
