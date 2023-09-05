/*
 * @Copyright The Gap Partnership. All rights reserved.
 */
import { createAction, props } from '@ngrx/store';
import {Candidate} from "../../models/Candidate";
export enum CandidatesActionTypes {
  LOAD_CANDIDATES = '[Candidates] Load Candidates',
  LOAD_CANDIDATES_SUCCESS = '[Candidates] Load Candidates success',
  LOAD_CANDIDATES_ERROR = '[Candidates] Load Candidates error',
}
export const loadCandidates = createAction(CandidatesActionTypes.LOAD_CANDIDATES);
export const loadCandidatesSuccess = createAction(
  CandidatesActionTypes.LOAD_CANDIDATES_SUCCESS,
  props<{ response: Array<Candidate> }>()
);
export const loadCandidatesError = createAction(
  CandidatesActionTypes.LOAD_CANDIDATES_ERROR,
  props<{ error: string }>()
);
