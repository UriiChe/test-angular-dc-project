import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter';

@Component({
  selector: 'app-time-line-chart',
  templateUrl: './time-line-chart.component.html',
  styleUrls: ['./time-line-chart.component.scss']
})
export class TimeLineChartComponent implements OnInit {
  sourceData;
  appCrossfilter;
  constructor() { }

  drowLineChart(){
    this.sourceData = d3.csv('../../assets/data.csv').then((data)=>{
      console.log(data);
      this.appCrossfilter = crossfilter(data);
      
    })
  }
  ngOnInit() {
    this.drowLineChart()
;  }

}
