import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, pluck, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TDriverStanding, TRaceResult } from '.';

@Injectable({
  providedIn: 'root',
})
export class MotorRacingService {
  constructor(private http: HttpClient) {}

  getSeasonResult(season: string, driverStanding: TDriverStanding) {
    return this.http
      .get(`${environment.baseUrl}${season}${environment.seasonResult}`)
      .pipe(
        pluck('MRData', 'RaceTable', 'Races'),
        map((result) =>
          this.transformSeasonResult(
            result as any,
            driverStanding as TDriverStanding
          )
        ),
        catchError((err) => this.handleError(err))
      );
  }

  getDriverStanding(season: string) {
    return this.http
      .get(`${environment.baseUrl}${season}${environment.championshipResult}`)
      .pipe(
        pluck('MRData', 'StandingsTable', 'StandingsLists'),
        map((result) => this.transformDriverStanding(result as any)),
        catchError((err) => this.handleError(err))
      );
  }

  transformDriverStanding(result: any) {
    console.log('***** transformDriverStanding *******');
    let driverStanding!: TDriverStanding;
    driverStanding = {
      driverId: result[0]?.DriverStandings[0]?.Driver?.driverId ?? '',
      driver: result[0]?.DriverStandings[0]?.Driver
        ? result[0]?.DriverStandings[0]?.Driver?.givenName +
          ' ' +
          result[0]?.DriverStandings[0]?.Driver?.familyName
        : '',
    };
    console.log('driverStanding');
    console.log(driverStanding);
    return driverStanding;
  }

  transformSeasonResult(result: any, driverInfo: TDriverStanding) {
    console.log('***** transformSeasonResult *******');
    console.log(driverInfo);
    let seasonResult: TRaceResult[] = [];
    result.forEach((items: any) => {
      seasonResult.push({
        round: items?.round ?? '',
        driver: items?.Results[0]
          ? items?.Results[0]?.Driver?.givenName +
            ' ' +
            items?.Results[0]?.Driver?.familyName
          : '',
        raceName: items?.raceName ?? '',
        date: items?.date ?? '',
        circuitLocation: items?.Circuit
          ? items?.Circuit?.Location?.locality +
            ', ' +
            items.Circuit.Location.country
          : '',
        driverId: items?.Results[0]?.Driver?.driverId ?? '',
        championShipIndicator:
          items?.Results[0]?.Driver?.driverId === driverInfo.driverId
            ? 'Y'
            : 'N',
      });
    });
    console.log('finalResult');
    console.log(seasonResult);
    return seasonResult;
  }

  handleError(error: any) {
    console.log('Error');
    console.log(error);
    return throwError(() => error);
  }
}
