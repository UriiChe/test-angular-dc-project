import { Component, OnInit, Input } from '@angular/core';
import * as dc from 'dc';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  pieChart;
  constructor() { }
 
  ngOnInit() {
   this.pieChart = dc.pieChart("#pie");
  }
}


