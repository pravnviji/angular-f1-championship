import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureModule } from '../feature.module';

import { SeasonListComponent } from './season-list.component';

describe('SeasonListComponent', () => {
  let router: Router;
  let component: SeasonListComponent;
  let fixture: ComponentFixture<SeasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureModule, RouterTestingModule.withRoutes([])],
      declarations: [SeasonListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonListComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gotoResultPage() should redirect to race-result page', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.gotoResultPage('2015');
    expect(navigateSpy).toHaveBeenCalledWith(['season/2015/race-results']);
  });
});
