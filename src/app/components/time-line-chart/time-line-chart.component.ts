import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as dc from 'dc';

@Component({
  selector: 'app-time-line-chart',
  templateUrl: './time-line-chart.component.html',
  styleUrls: ['./time-line-chart.component.scss']
})
export class TimeLineChartComponent implements OnInit {
  lineChart;
  constructor() { }
    

  ngOnInit() {
    this.lineChart = dc.lineChart('#lineChart');
  }

}
