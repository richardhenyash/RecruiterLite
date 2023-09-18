import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {companiesFeatureKey, companiesReducer} from "./companies.reducer";
import {CompaniesEffects} from "./companies.effects";
@NgModule({
  imports: [StoreModule.forFeature(companiesFeatureKey, companiesReducer),
    EffectsModule.forFeature([CompaniesEffects])],
})
export class CompaniesStoreModule {}
