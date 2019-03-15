import { Component, OnInit, Input } from '@angular/core';
import * as dc from 'dc';
import * as d3 from 'd3';
import { Crossfilter, Dimension } from 'crossfilter2';
import { Data } from '@angular/router';

@Component({
  selector: 'app-time-line-chart',
  templateUrl: './time-line-chart.component.html',
  styleUrls: ['./time-line-chart.component.scss']
})
export class TimeLineChartComponent implements OnInit {
  //recieve crossfilter data from parent component
  @Input('dataFromCrossfilter') set getCrossFilterData(value:Crossfilter<Data>){
    this.dataFromCrossfilter = value;
  }
  //recieve property from parent component for reduce chart
  @Input('properyForChart') set changeInputProperty(value:string){
    this.currentProperty = value;
    this.updateChart();
  }
  //recieve reset event
  @Input('reset') set resetChart(value:boolean){
    if(this.lineChart){
    this.reset();
    }
  }
 
  currentProperty:string = 'markdown'; //property for reduce pieChart (margin, markdown, reveue);
  lineChart:dc.LineChart;
  dataFromCrossfilter:Crossfilter<Data>;
  timeDimension:Dimension<Data, number>;
  constructor() { }

  ngOnInit() {
    this.lineChart = dc.lineChart('#lineChart');
    this.createLineChart();
  }
  createLineChart(){
    // create dimension by time (week)
    this.timeDimension = this.dataFromCrossfilter.dimension(d=>+d.week_ref);
    const timeGroup = this.timeDimension.group().reduceSum(function(d){
      return d.margin;
    });
    // find min and max week-time for linear chart
    const _min = this.timeDimension.bottom(1)[0].week_ref;
    const _max = this.timeDimension.top(1)[0].week_ref;
    this.lineChart = this.lineChart
                .width(700)
                .height(300)
                .elasticY(true)
                .margins({top: 20, right: 10, bottom: 20, left:50})
                .x(d3.scaleLinear().domain([_min,_max]))
                .dimension(this.timeDimension)
                .group(timeGroup)
                .valueAccessor(d=>d.value/1000);
    dc.renderAll();
  }

  updateChart(){
    if(this.timeDimension){
      this.lineChart.group(this.timeDimension.group().reduceSum(d=>d[this.currentProperty]));
      dc.renderAll();
    }
  }
  reset(e?:Event){
    if(arguments.length){
      e.preventDefault();
    }
    this.lineChart.filterAll();
    dc.renderAll();
  }
}
