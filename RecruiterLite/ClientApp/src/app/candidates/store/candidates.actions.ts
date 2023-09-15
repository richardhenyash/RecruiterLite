/*
 * @Copyright The Gap Partnership. All rights reserved.
 */
import { createAction, props } from '@ngrx/store';
import {Candidate} from "../../models/Candidate";
export enum CandidatesActionTypes {
  LOAD_CANDIDATES = '[Candidates] Load Candidates',
  LOAD_CANDIDATES_SUCCESS = '[Candidates] Load Candidates success',
  LOAD_CANDIDATES_ERROR = '[Candidates] Load Candidates error',

  LOAD_CANDIDATE = '[Candidates] Load Candidate',
  LOAD_CANDIDATE_SUCCESS = '[Candidates] Load Candidate success',
  LOAD_CANDIDATE_ERROR = '[Candidates] Load Candidate error',

  SAVE_CANDIDATE = '[Candidates] Save Candidate',
  SAVE_CANDIDATE_SUCCESS = '[Candidates] Save Candidate success',
  SAVE_CANDIDATE_ERROR = '[Candidates] Save Candidate error',

  DELETE_CANDIDATE = '[Candidates] Delete Candidate',
  DELETE_CANDIDATE_SUCCESS = '[Candidates] Delete Candidate success',
  DELETE_CANDIDATE_ERROR = '[Candidates] Delete Candidate error',
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

export const loadCandidate = createAction(CandidatesActionTypes.LOAD_CANDIDATE, props<{ id: number }>());
export const loadCandidateSuccess = createAction(
  CandidatesActionTypes.LOAD_CANDIDATE_SUCCESS,
  props<{ response: Candidate }>()
);
export const loadCandidateError = createAction(
  CandidatesActionTypes.LOAD_CANDIDATE_ERROR,
  props<{ error: string }>()
);
export const saveCandidate = createAction(
  CandidatesActionTypes.SAVE_CANDIDATE,
  props<{ request: Candidate }>()
);
export const saveCandidateSuccess = createAction(
  CandidatesActionTypes.SAVE_CANDIDATE_SUCCESS,
  props<{ response: Candidate }>()
);
export const saveCandidateError = createAction(CandidatesActionTypes.SAVE_CANDIDATE_ERROR, props<{ error: string }>());
export const deleteCandidate = createAction(
  CandidatesActionTypes.DELETE_CANDIDATE,
  props<{ id: number }>()
);
export const deleteCandidateSuccess = createAction(
  CandidatesActionTypes.DELETE_CANDIDATE_SUCCESS
);
export const deleteCandidateError = createAction(
  CandidatesActionTypes.DELETE_CANDIDATE_ERROR,
  props<{ error: string }>()
);
