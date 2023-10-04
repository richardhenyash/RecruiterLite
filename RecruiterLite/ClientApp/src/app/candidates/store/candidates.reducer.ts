import {createReducer, on} from "@ngrx/store";
import {CandidatesState, initialState} from "./candidates.state";
import * as CandidatesActions from "./candidates.actions";
import {ApiState} from "../../models/ApiState";
export const candidateFeatureKey = 'candidate';
export const candidateReducer = createReducer(
  initialState,

  on(CandidatesActions.loadCandidates, (state): CandidatesState => ({ ...state, candidatesStatus: ApiState.LOADING })),
  on(
    CandidatesActions.loadCandidatesSuccess,
    (state, { response }): CandidatesState => ({
      ...state,
      candidates: response,
      candidatesStatus: ApiState.SUCCESS,
    })
  ),
  on(CandidatesActions.loadCandidatesError, (state, { error }): CandidatesState => ({ ...state, error, candidatesStatus: ApiState.FAIL })),

  on(CandidatesActions.loadCandidate, (state): CandidatesState => ({ ...state, candidateStatus: ApiState.LOADING })),
  on(
    CandidatesActions.loadCandidateSuccess,
    (state, { response }): CandidatesState => ({
      ...state,
      candidate: response,
      candidateStatus: ApiState.SUCCESS,
    })
  ),
  on(CandidatesActions.loadCandidateError, (state, { error }): CandidatesState => ({ ...state, error, candidateStatus: ApiState.FAIL })),

  on(CandidatesActions.saveCandidate, (state): CandidatesState => ({ ...state, saveCandidateStatus: ApiState.LOADING })),
  on(CandidatesActions.saveCandidateSuccess,(state): CandidatesState => ({...state, saveCandidateStatus: ApiState.SUCCESS})),
  on(CandidatesActions.saveCandidateError, (state, { error }): CandidatesState => ({ ...state, error, saveCandidateStatus: ApiState.FAIL })),

  on(CandidatesActions.deleteCandidate, (state): CandidatesState => ({ ...state, deleteCandidateStatus: ApiState.LOADING })),
  on(
    CandidatesActions.deleteCandidateSuccess,
    (state): CandidatesState => ({
      ...state,
      deleteCandidateStatus: ApiState.SUCCESS,
    })
  ),
  on(
    CandidatesActions.deleteCandidateError,
    (state, { error }): CandidatesState => ({ ...state, error, deleteCandidateStatus: ApiState.FAIL })
  ),

);
