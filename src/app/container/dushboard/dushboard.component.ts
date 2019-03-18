import { Component, OnInit } from '@angular/core';
import { DcService } from '../../services/dc.service';
import { Data } from '../../models/data'; 
import { Crossfilter } from 'crossfilter2';

@Component({
  selector: 'app-dushboard',
  templateUrl: './dushboard.component.html',
  styleUrls: ['./dushboard.component.scss']
})
export class DushboardComponent implements OnInit {
  currentProperty:string = 'markdown'; // set property for child components
  dataFromCrossfilter:Crossfilter<Data>;
  propertyForChangeView:string[] = ["markdown", "margin", "revenues"]; // set properties to select-component
  reset:boolean = true; // value for reset toggler
  filtersForLineChart:string[]=[];
  constructor( private dcService: DcService ) { } 
  
  ngOnInit() {
    this.dcService.createCrossfilter().then(data=>{
      this.dataFromCrossfilter = data;
    });
  }
  
  changeViewProperty(value:string){
    if(value !== this.currentProperty){
      this.currentProperty = value;
    }
  }
  getFilterEventPieChart(filters:string[]){
    this.filtersForLineChart = filters.slice();
  }
}