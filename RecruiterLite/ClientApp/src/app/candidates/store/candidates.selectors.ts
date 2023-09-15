import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CandidatesState} from "./candidates.state";
import {candidateFeatureKey} from "./candidates.reducer";
import {ApiState} from "../../models/ApiState";

const selectCandidatesFeature = createFeatureSelector<CandidatesState>(candidateFeatureKey);
export const selectCandidates = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidates
);
export const selectCandidate = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidate
);
export const selectCandidatesStatus = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidatesStatus
);
export const selectCandidateStatus = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidateStatus
);
export const selectLoadingCandidates = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) =>
    state.candidatesStatus === ApiState.LOADING ||
    state.candidateStatus === ApiState.LOADING ||
    state.saveCandidateStatus === ApiState.LOADING ||
    state.deleteCandidateStatus === ApiState.LOADING
);
