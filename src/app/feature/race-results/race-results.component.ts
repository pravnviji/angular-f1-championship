import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { MotorRacingService, TRaceResult } from '..';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit {
  public year!: string;
  public seasonResult!: TRaceResult[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private motorRacingService: MotorRacingService
  ) {}

  ngOnInit(): void {
    this.year = this.activatedRoute.snapshot.paramMap.get('year') as string;
    console.log(this.year);
    this.motorRacingService
      .getSeasonResult(this.year)
      .subscribe((res) => (this.seasonResult = res));
  }

  gohome(): void {
    this.location.back();
  }
}
