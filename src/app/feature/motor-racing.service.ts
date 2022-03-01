import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, pluck, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MotorRacingService {
  constructor(private http: HttpClient) {}

  getSeasonResult(season: string) {
    return this.http
      .get(`${environment.baseUrl}${season}${environment.seasonResult}`)
      .pipe(
        pluck('MRData', 'RaceTable', 'Races'),
        map((result) => this.transformSeasonResult(result as any)),
        catchError((err) => this.handleError(err))
      );
  }

  transformSeasonResult(result: any) {
    console.log('***** transformSeasonResult *******');
    let finalResult: TRaceResult[] = [];
    result.forEach((items: any) => {
      finalResult.push({
        round: items.round,
        driver:
          items.Results[0].Driver.givenName +
          ' ' +
          items.Results[0].Driver.familyName,
        raceName: items.raceName,
        date: items.date,
        circuitLocation:
          items.Circuit.Location.locality +
          ', ' +
          items.Circuit.Location.country,
      });
    });
    console.log('finalResult');
    console.log(finalResult);
    return finalResult;
  }

  handleError(error: any) {
    console.log('Error');
    console.log(error);
    return throwError(() => error);
  }
}

export type TRaceResult = {
  round: string;
  raceName: string;
  driver: string;
  date: string;
  circuitLocation: string;
};
