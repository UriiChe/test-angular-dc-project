import { Component, OnInit, Input } from '@angular/core';
import * as dc from 'dc';
import { Crossfilter, Dimension, Group, NaturallyOrderedValue } from 'crossfilter2';
import { Data } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  //recieve crossfilter data from parent component
  @Input('crossfilterData') set getCrossFilter(value:Crossfilter<Data>){
    this.crossfilterData = value;
  }
  //recieve property from parent component for reduce chart
  @Input('properyForChart') set changeInputProperty(value:string){
    this.currentProperty = value;
    this.updateChart();
  }
  //recieve reset event
  @Input('reset') set resetChart(value:boolean){
    if(this.pieChart){
    this.pieChart.filterAll();
    dc.renderAll();
    }
  }
  // preinitialisation objects and variables
  crossfilterData:Crossfilter<Data>;
  currentProperty:string; //property for reduce pieChart (margin, markdown, reveue);
  pieChart:dc.PieChart;
  categoryGroup:Group<Data, NaturallyOrderedValue, NaturallyOrderedValue>;
  categoryDimension:Dimension<Data, number>;
  constructor() { }

  ngOnInit() { 
    this.pieChart = dc.pieChart("#pie"); // biding pieChart with template
    this.createPieChart();
  }
 
  createPieChart(){
    // create dimension by item_category
    this.categoryDimension = this.crossfilterData.dimension(d=>d["item_category"]);
    this.categoryGroup = this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]);
    this.pieChart
        .width(700)
        .height(500)
        .dimension(this.categoryDimension)
        .group(this.categoryGroup)
        .useViewBoxResizing(true)
        .label(function(d){
          return d.key;
        })
        .legend(dc.legend().x(15).y(15).itemHeight(12))
    dc.renderAll();
  }

  updateChart(){
    if(this.categoryDimension){
      this.pieChart.group(this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]));
      dc.renderAll();
    }
  }
}


