import {createReducer, on} from "@ngrx/store";
import {CandidatesState, initialState} from "./candidates.state";
import {
  deleteCandidate, deleteCandidateError, deleteCandidateSuccess, loadCandidate, loadCandidateError,
  loadCandidates,
  loadCandidatesError,
  loadCandidatesSuccess, loadCandidateSuccess,
  saveCandidate, saveCandidateError,
  saveCandidateSuccess
} from "./candidates.actions";
import {ApiState} from "../../models/ApiState";
export const candidateFeatureKey = 'candidate';
export const candidateReducer = createReducer(
  initialState,

  on(loadCandidates, (state): CandidatesState => ({ ...state, candidatesStatus: ApiState.LOADING })),
  on(
    loadCandidatesSuccess,
    (state, { response }): CandidatesState => ({
      ...state,
      candidates: response,
      candidatesStatus: ApiState.SUCCESS,
    })
  ),
  on(loadCandidatesError, (state, { error }): CandidatesState => ({ ...state, error, candidatesStatus: ApiState.FAIL })),

  on(loadCandidate, (state): CandidatesState => ({ ...state, candidateStatus: ApiState.LOADING })),
  on(
    loadCandidateSuccess,
    (state, { response }): CandidatesState => ({
      ...state,
      candidate: response,
      candidateStatus: ApiState.SUCCESS,
    })
  ),
  on(loadCandidateError, (state, { error }): CandidatesState => ({ ...state, error, candidateStatus: ApiState.FAIL })),

  on(saveCandidate, (state): CandidatesState => ({ ...state, saveCandidateStatus: ApiState.LOADING })),
  on(saveCandidateSuccess,(state): CandidatesState => ({...state, saveCandidateStatus: ApiState.SUCCESS})),
  on(saveCandidateError, (state, { error }): CandidatesState => ({ ...state, error, saveCandidateStatus: ApiState.FAIL })),

  on(deleteCandidate, (state): CandidatesState => ({ ...state, deleteCandidateStatus: ApiState.LOADING })),
  on(
    deleteCandidateSuccess,
    (state): CandidatesState => ({
      ...state,
      deleteCandidateStatus: ApiState.SUCCESS,
    })
  ),
  on(
    deleteCandidateError,
    (state, { error }): CandidatesState => ({ ...state, error, deleteCandidateStatus: ApiState.FAIL })
  ),

);
