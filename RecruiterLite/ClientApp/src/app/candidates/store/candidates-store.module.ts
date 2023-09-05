import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {candidateFeatureKey, candidateReducer} from "./candidates.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CandidatesEffects} from "./candidates.effects";
@NgModule({
  imports: [StoreModule.forFeature(candidateFeatureKey, candidateReducer),
    EffectsModule.forFeature([CandidatesEffects])],
})
export class CandidatesStoreModule {}
