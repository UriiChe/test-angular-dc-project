import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewChecked, OnChanges } from '@angular/core';
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
export class DushboardComponent implements OnInit, OnChanges {
  @ViewChild(PieChartComponent) private pieComponent:PieChartComponent;
  @ViewChild(TimeLineChartComponent) private lineComponent: TimeLineChartComponent;
  lineChart;
  pieChart;
  propertyForChangeView: string[] = ['markdown', 'revenues', 'margin'];
  currentProperty:string = 'markdown';
  categoryGroup;
  categoryDimension;
  private dataFromCrossfilter;
  constructor( private dcService: DcService ) { }
  
  ngOnInit() {
    this.dcService.createCrossfilter().then(data=>{
      this.dataFromCrossfilter = data;
      this.createPieChart();
      this.createLineChart(); 
      dc.renderAll();
    });
  }
  ngOnChanges(){
    console.log('change');
  }

   createPieChart(){
    // create dimension by item_category
    this.categoryDimension = this.dataFromCrossfilter.dimension(d=>d["item_category"]);
    // group item_category dimension
    this.categoryGroup = this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]);
    this.pieChart = this.pieComponent.pieChart.width(700)
          .height(500)
          .dimension(this.categoryDimension)
          .group(this.categoryGroup)
          .legend(dc.legend())
          .on('renderlet', (chart)=>{
            chart.selectAll('rect').on('click', (d)=>{
              console.log('click!', d);
            })
          });
  }
  updatePieChart(){
    this.categoryGroup = this.categoryDimension.group().reduceSum(d=>d[this.currentProperty]);
  }
  createLineChart(){
    // create dimension by time (week)
    const timeDimension = this.dataFromCrossfilter.dimension(d=>+d.week_ref);
    // group time dimension
    const timeGroup = timeDimension.group().reduceSum(function(d){
      return d.margin;
    });
    // find min and max week-time for linear chart
    const _min = timeDimension.bottom(1)[0].week_ref;
    const _max = timeDimension.top(1)[0].week_ref;
    this.lineChart = this.lineComponent.lineChart
                .width(700)
                .height(300)
                .elasticY(true)
                .margins({top: 20, right: 10, bottom: 20, left:50})
                .x(d3.scaleLinear().domain([_min,_max]))
                .dimension(timeDimension)
                .group(timeGroup)
                .valueAccessor(d=>d.value/1000)
  }

  changeViewProperty(value){
    if(value !== this.currentProperty){
      this.currentProperty = value;
      this.updatePieChart();
      this.pieChart.group(this.categoryGroup);
      dc.redrawAll();
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









  
   
 





      
  
      
      