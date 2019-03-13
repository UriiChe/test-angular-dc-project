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
  constructor() { }
  
  drowPie(){
    // get data from csv file
    this.sourceData = d3.csv('../../assets/data.csv').then((data)=>{
      ////
        data.forEach(function(d) {
          console.log(d);
        });
      /////
      this.appCrossfilter = crossfilter(data);
      const categoryDimension = this.appCrossfilter.dimension(d=>d["item_category"]);
      const categoryGroup = categoryDimension.group();
      const cetegoryFiltered = categoryDimension.filter('EE');
      // this.print_filter(cetegoryFiltered);
      const pieChart = dc.pieChart('#pie');
      const markdownDimension = this.appCrossfilter.dimension(data=>data.markdown);
      const markdownGroup = markdownDimension.group().reduceCount();
      pieChart.width(500)
              .height(500)
              .dimension(categoryDimension)
              .group(categoryGroup)
              .on('renderlet', (chart)=>{
                chart.selectAll('rect').on('click', (d)=>{
                  console.log('click!', d);
                })
              });
      const lineChart = dc.lineChart('#lineChart');
      lineChart.width(1200)
                .height(300)
                .x(d3.scaleLinear().domain([20,35]))
                .y(d3.scaleLinear().domain([10,20]))
                .dimension(markdownDimension)
                .group(markdownGroup);
      dc.renderAll();
    });
  }  
  print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  } 
  ngOnInit() {
    
    this.drowPie();
  }

}


