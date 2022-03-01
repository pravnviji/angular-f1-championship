import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceResultsComponent, SeasonListComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: SeasonListComponent,
  },
  {
    path: 'season/:year/race-results',
    component: RaceResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
