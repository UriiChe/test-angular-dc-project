import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import * as dc from 'dc';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input('crossfilterData') set getCrossFilter(value){
    this.crossfilterData = value;
  }
  @Input('properyForChart') set changeInputProperty(value:string){
    this.currentProperty = value;
    this.updateChart();
  }
  @Input('reset') set resetChart(value){
    if(this.pieChart){
    this.pieChart.filterAll(null);
    dc.renderAll();
    }
  }
  // preinitialisation objects and variables
  crossfilterData;
  currentProperty; //property for reduce pieChart (margin, markdown, reveue);
  pieChart;
  categoryGroup;
  categoryDimension;
  constructor() { }

  ngOnInit() { 
    this.pieChart = dc.pieChart("#pie"); // biding pieChart with template
    this.createPieChart();
  }
 
  createPieChart(){
    this.categoryDimension = this.crossfilterData.dimension(d=>d["item_category"]);
    this.categoryGroup = this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]);
    this.pieChart = this.pieChart
        .width(700)
        .height(500)
        .dimension(this.categoryDimension)
        .group(this.categoryGroup)
        .legend(dc.legend())
        .on('renderlet', (chart)=>{
          chart.selectAll('rect').on('click', (d)=>{
            console.log('click!', d);
          })
        });
    dc.renderAll();
  }
  
  updateChart(){
    if(this.categoryDimension){
      this.pieChart.group(this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]));
      dc.renderAll();
    }
  }
}


