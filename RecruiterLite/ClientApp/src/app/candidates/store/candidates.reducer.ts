import {createReducer, on} from "@ngrx/store";
import {CandidatesState, initialState} from "./candidates.state";
import {loadCandidates, loadCandidatesError, loadCandidatesSuccess} from "./candidates.actions";
import {ApiState} from "../../models/ApiState";
export const candidateFeatureKey = 'candidate';
export const candidateReducer = createReducer(
  initialState,
  on(loadCandidates, (state): CandidatesState => ({ ...state, candidateStatus: ApiState.LOADING })),
  on(
    loadCandidatesSuccess,
    (state, { response }): CandidatesState => ({
      ...state,
      candidates: response,
      candidateStatus: ApiState.SUCCESS,
    })
  ),
  on(loadCandidatesError, (state, { error }): CandidatesState => ({ ...state, error, candidateStatus: ApiState.FAIL }))
);
