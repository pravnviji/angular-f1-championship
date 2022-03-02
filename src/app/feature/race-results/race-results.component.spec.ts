import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { from, of } from 'rxjs';
import { MotorRacingService, TDriverStanding, TRaceResult } from '..';

import { RaceResultsComponent } from './race-results.component';

class MotorRacingServiceStub {
  mockDriverStanding: TDriverStanding = {
    driver: 'test',
    driverId: 'test',
  };

  mockRaceResult: TRaceResult[] = [
    {
      round: '1',
      raceName: 'raceTestName',
      driver: 'testDrver',
      driverId: 'sdfsd',
      date: '2015-23-1',
      circuitLocation: 'Australia',
      championShipIndicator: 'Y',
    },
  ];
  getSeasonResult() {
    return of(this.mockRaceResult);
  }
  getDriverStanding() {
    return of(this.mockDriverStanding);
  }
}

describe('RaceResultsComponent', () => {
  let component: RaceResultsComponent;
  let fixture: ComponentFixture<RaceResultsComponent>;
  let location: Location;
  let activateRoute: ActivatedRoute;
  const locationStub = {
    back: jasmine.createSpy('back'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceResultsComponent],
      providers: [
        { provide: MotorRacingService, useClass: MotorRacingServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                year: '2015',
              }),
            },
          },
        },
        { provide: Location, useValue: locationStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceResultsComponent);
    location = fixture.debugElement.injector.get(Location);
    activateRoute = fixture.debugElement.injector.get(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnit() call getParamMap and getRaceResult', () => {
    spyOn(component, 'getParamMap').and.callThrough();
    spyOn(component, 'getRaceResult').and.callThrough();

    component.ngOnInit();

    expect(component.getParamMap).toHaveBeenCalled();
    expect(component.getRaceResult).toHaveBeenCalled();
  });

  it('getParamMap() should call activate route and set year into variable', () => {
    component.getParamMap();

    expect(activateRoute.snapshot.paramMap.get('year')).toEqual('2015');
    expect(component.year).toEqual('2015');
  });

  it('gohome() call previous page', () => {
    component.gohome();
    expect(location.back).toHaveBeenCalled();
  });
});
