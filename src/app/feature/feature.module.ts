import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FeatureRoutingModule } from './feature-routing.module';

import {
  RaceResultsComponent,
  SeasonListComponent,
  MotorRacingService,
} from '.';

@NgModule({
  declarations: [SeasonListComponent, RaceResultsComponent],
  providers: [MotorRacingService],
  imports: [CommonModule, FeatureRoutingModule, HttpClientModule],
})
export class FeatureModule {}
