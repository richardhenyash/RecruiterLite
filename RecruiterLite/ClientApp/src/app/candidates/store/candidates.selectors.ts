import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CandidatesState} from "./candidates.state";
import {candidateFeatureKey} from "./candidates.reducer";
import {ApiState} from "../../models/ApiState";

const selectCandidatesFeature = createFeatureSelector<CandidatesState>(candidateFeatureKey);
export const selectCandidates = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidates
);

export const selectCandidatesStatus = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) => state.candidateStatus
);
export const selectLoadingCandidates = createSelector(
  selectCandidatesFeature,
  (state: CandidatesState) =>
    state.candidateStatus === ApiState.LOADING
);
