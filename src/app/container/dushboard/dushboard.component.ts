import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewChecked } from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';
import { DcService } from '../../services/dc.service';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { TimeLineChartComponent } from 'src/app/components/time-line-chart/time-line-chart.component';

@Component({
  selector: 'app-dushboard',
  templateUrl: './dushboard.component.html',
  styleUrls: ['./dushboard.component.scss']
})
export class DushboardComponent implements OnInit, AfterViewChecked {
  @ViewChild(PieChartComponent) private pieComponent:PieChartComponent;
  @ViewChild(TimeLineChartComponent) private lineComponent: TimeLineChartComponent;
  lineChart;
  pieChart;
  propertyForChangeView: string[] = ['markdown', 'revenues', 'margin'];
  currentProperty:string;
  constructor( private dcService: DcService ) { }
  
  ngOnInit() {
    this.dcService.createCrossfilter().then(data=>{
      this.createPieChart(data, this.currentProperty);
      this.createLineChart(data); 
      dc.renderAll();
    });
  }
  ngAfterViewChecked(){

  }
   createPieChart(crossfilter, reduceProperty = "revenues"){
    // create dimension by item_category
    const categoryDimension = crossfilter.dimension(dc.pluck("item_category"));
    // group item_category dimension
    const categoryMarkdownGroup = categoryDimension.group().reduceSum(d=>d[reduceProperty]);
    this.pieChart = this.pieComponent.pieChart.width(500)
          .height(500)
          .dimension(categoryDimension)
          .group(categoryMarkdownGroup)
          .legend(dc.legend())
          .on('renderlet', (chart)=>{
            chart.selectAll('rect').on('click', (d)=>{
              console.log('click!', d);
            })
          });
  }
  createLineChart(crossfilter){
    // create dimension by time (week)
    const timeDimension = crossfilter.dimension(dc.pluck('week_ref'));
    // group time dimension
    const timeGroup = timeDimension.group().reduceSum(function(d){
      return d.margin/1000;
    });
    // find min and max week-time for linear chart
    const _min = timeDimension.bottom(1)[0].week_ref;
    const _max = timeDimension.top(1)[0].week_ref;
    // this.print_filter(timeDimension);
    this.lineChart = this.lineComponent.lineChart
                .brushOn(true)
                .width(800)
                .height(300)
                .elasticX(true)
                .x(d3.scaleLinear().domain([_min,_max]))
                .dimension(timeDimension)
                .valueAccessor(d=>d.value/100)
                .group(timeGroup);
    // this.lineChart.valueAccessor(d=>{
    //   console.log(d.key);
    // });
  }
  
  changeViewProperty(value){
    if(value !== this.currentProperty){
      this.currentProperty = value;
      dc.renderAll();
    }
  }
  //reset filters 
  resetView(){
    this.lineChart.filterAll(null);
    this.pieChart.filterAll(null);
    dc.redrawAll();
  }
  // filter for debuggin
  print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }
}


// get value (current dimentioned) from chart
// this.lineChart.valueAccessor(d=>{
    //   console.log(d);
    // });









  
   
 





      
  
      
      