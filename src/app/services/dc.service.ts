import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})

export class DcService {
  constructor() { 
    
  }
  // create crossfilter function
  createCrossfilter():Promise<crossfilter.Crossfilter<Data>>{
    // get data from csv file
    return d3.csv('../../assets/data.csv', (d) => {
      // convert some strings to number
      return {
        item_category: d.item_category,
        margin: +d.margin,
        markdown: +d.markdown,
        revenues: +d.revenues,
        week_ref: +d.week_ref,
        year_ref: +d.year_ref,
      }}).then(data=>crossfilter(data))
  }
}

// :crossfilter.Crossfilter<Data>