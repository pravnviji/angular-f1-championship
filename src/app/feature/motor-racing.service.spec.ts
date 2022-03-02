import { TestBed, getTestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MotorRacingService, TDriverStanding, TRaceResult } from '.';
import { HttpErrorResponse } from '@angular/common/http';

const dummyDriverStanding = {
  MRData: {
    StandingsTable: {
      StandingsLists: [
        {
          DriverStandings: [
            {
              position: '1',
              positionText: '1',
              Driver: {
                driverId: 'hamilton',
                permanentNumber: '44',
                givenName: 'Lewis',
                familyName: 'Hamilton',
                dateOfBirth: '1985-01-07',
                nationality: 'British',
              },
            },
          ],
        },
      ],
    },
  },
};

const dummySeasonResult = {
  MRData: {
    xmlns: 'http://ergast.com/mrd/1.4',
    series: 'f1',
    url: 'http://ergast.com/api/f1/2008/results/1.json',
    limit: '30',
    offset: '0',
    total: '18',
    RaceTable: {
      season: '2008',
      position: '1',
      Races: [
        {
          season: '2008',
          round: '1',
          raceName: 'Australian Grand Prix',
          Circuit: {
            circuitName: 'Albert Park Grand Prix Circuit',
            Location: {
              lat: '-37.8497',
              long: '144.968',
              locality: 'Melbourne',
              country: 'Australia',
            },
          },
          Results: [
            {
              number: '22',
              position: '1',
              positionText: '1',
              points: '10',
              Driver: {
                driverId: 'hamilton',
                permanentNumber: '44',
                code: 'HAM',
                url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
                givenName: 'Lewis',
                familyName: 'Hamilton',
                dateOfBirth: '1985-01-07',
                nationality: 'British',
              },
            },
          ],
        },
      ],
    },
  },
};

describe('MotorRacingService', () => {
  let serviceTest: MotorRacingService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let baseUrl = 'https://ergast.com/api/f1/';
  let seasonResult = '/results/1.json';
  let championshipResult = '/driverStandings/1.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MotorRacingService],
    });
    injector = getTestBed();
    serviceTest = injector.get(MotorRacingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(serviceTest).toBeTruthy();
  });

  it('getDriverStanding() should call valid URL with season', () => {
    const season = '2013';
    serviceTest.getDriverStanding(season).subscribe();
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url === baseUrl + season + championshipResult
    );
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush(dummyDriverStanding);
  });

  it('getDriverStanding() should call handleError()', () => {
    const season = '2013';
    spyOn(serviceTest as any, 'handleError').and.callThrough();
    const errorData: HttpErrorResponse = new HttpErrorResponse({
      error: {},
      status: 500,
      url: baseUrl + season + championshipResult,
      statusText: 'Bad Request',
    });
    serviceTest.getDriverStanding(season).subscribe(
      () => fail('should error'),
      () => {
        expect(serviceTest.handleError).toHaveBeenCalled();
      }
    );
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url === baseUrl + season + championshipResult
    );
    reqMock.flush(errorData);
  });

  it('transformDriverStanding() should return transform Data and result should be equal ', () => {
    const reslocal: TDriverStanding = {
      driver: 'Lewis Hamilton',
      driverId: 'hamilton',
    };

    const req = serviceTest.transformDriverStanding(
      dummyDriverStanding['MRData']['StandingsTable']['StandingsLists']
    );
    expect(req).toEqual(reslocal);
  });

  it('transformDriverStanding() should return null if empty respone from server ', () => {
    const responData = {};
    const res: TDriverStanding = {
      driver: '',
      driverId: '',
    };

    const req = serviceTest.transformDriverStanding(responData);
    expect(req).toEqual(res);
  });

  it('getSeasonResult() should call valid URL with season', () => {
    const season = '2013';
    const driverStandinglocal: TDriverStanding = {
      driver: 'test',
      driverId: 'test',
    };
    serviceTest.getSeasonResult(season, driverStandinglocal).subscribe();
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' && req.url === baseUrl + season + seasonResult
    );
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush(dummySeasonResult);
  });

  it('getSeasonResult() should return null if empty respone from server ', () => {
    const responData = {};
    const res: TDriverStanding = {
      driver: '',
      driverId: '',
    };

    const req = serviceTest.transformDriverStanding(responData);
    expect(req).toEqual(res);
  });
  it('getSeasonResult() should call handleError()', () => {
    const season = '2013';
    spyOn(serviceTest as any, 'handleError').and.callThrough();
    const errorData: HttpErrorResponse = new HttpErrorResponse({
      error: {},
      status: 500,
      url: baseUrl + season + championshipResult,
      statusText: 'Bad Request',
    });
    serviceTest.getDriverStanding(season).subscribe(
      () => fail('should error'),
      () => {
        expect(serviceTest.handleError).toHaveBeenCalled();
      }
    );
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url === baseUrl + season + championshipResult
    );

    reqMock.flush(errorData);
  });
});
