import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'candidates', loadChildren: () => import('./candidates/candidates.module').then((m) => m.CandidatesModule), },
  { path: 'companies', loadChildren: () => import('./companies/companies.module').then((m) => m.CompaniesModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
