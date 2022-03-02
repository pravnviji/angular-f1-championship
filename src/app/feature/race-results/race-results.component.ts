import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { MotorRacingService, TDriverStanding, TRaceResult } from '..';
import { Observable, of, switchMap } from 'rxjs';

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
    this.getParamMap();
    this.getRaceResult();
  }
  getParamMap(): void {
    this.year = this.activatedRoute.snapshot.paramMap.get('year') as string;
  }

  getRaceResult(): void {
    this.motorRacingService
      .getDriverStanding(this.year)
      .pipe(
        switchMap((res: TDriverStanding) => {
          return res?.driverId
            ? this.motorRacingService.getSeasonResult(this.year, res)
            : of([]);
        })
      )
      .subscribe((res) => (this.seasonResult = res));
  }

  gohome(): void {
    this.location.back();
  }
}
