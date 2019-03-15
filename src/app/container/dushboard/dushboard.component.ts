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
export class DushboardComponent implements OnInit {
  currentProperty:string = 'markdown';
  dataFromCrossfilter;
  propertyForChangeView:string[] = ["markdown", "margin", "revenues"];
  reset:boolean = true;
  constructor( private dcService: DcService ) { } 
  
  ngOnInit() {
    this.dcService.createCrossfilter().then(data=>{
      this.dataFromCrossfilter = data;
    });
  }

  changeViewProperty(value){
    if(value !== this.currentProperty){
      this.currentProperty = value;
    }
  }
}










  
   
 





      
  
      
      