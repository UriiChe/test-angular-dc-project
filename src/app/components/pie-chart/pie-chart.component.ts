import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  sourceData;
  appCrossfilter;
  count;
  constructor() { }
  
  drowPie(){
    this.sourceData = d3.csv('../../assets/data.csv').then((experiment)=>{
      this.appCrossfilter = crossfilter(experiment);
      this.count = this.appCrossfilter.dimension(d=>d.Item_code);
      const pieChart = dc.pieChart('#pie');
      const markdownDimension = this.appCrossfilter.dimension(data=>data.markdown);
      const markdownGroup = markdownDimension.group().reduceCount();
      pieChart.width(500)
              .height(500)
              .dimension(markdownDimension)
              .group(markdownGroup)
              .on('renderlet', (chart)=>{
                chart.selectAll('rect').on('click', (d)=>{
                  console.log('click!', d);
                })
              })
      dc.renderAll();
    });
    
  }  
  ngOnInit() {
    
    this.drowPie();
  }

}


