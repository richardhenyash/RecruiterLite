import {Candidate} from "../../models/Candidate";
import {ApiState} from "../../models/ApiState";

export interface CandidatesState {
  candidates: Array<Candidate> | null;
  candidateStatus: ApiState;

  error: string | null
}

export const initialState: CandidatesState = {
  candidates: null,
  candidateStatus: ApiState.INITIAL,

  error: null
}
