import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
})
export class SeasonListComponent {
  public season: string[] = [
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];

  constructor(private router: Router) {}

  getRandomColor(countIndex: number) {
    console.log(this.season.length);
    return {
      background: countIndex % 2 === 0 ? '#000000' : '#e10700',
      padding: '5vw',
      margin: '0.1vw',
      color: 'white',
      border: '1px solid black',
    };
  }

  gotoResultPage(year: string) {
    this.router.navigate([`season/${year}/race-results`]);
  }
}
