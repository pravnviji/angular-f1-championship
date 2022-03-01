import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
})
export class SeasonListComponent implements OnInit {
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

  ngOnInit(): void {}

  getRandomColor() {
    return {
      background: '#' + Math.floor(Math.random() * 16777215).toString(16) + '',
      padding: '5vw',
      margin: '0.1vw',
      border: '1px solid black',
    };
  }

  gotoResultPage(year: string) {
    this.router.navigate([`season/${year}/race-results`]);
  }
}
