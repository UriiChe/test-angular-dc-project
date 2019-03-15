import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';

@Injectable({
  providedIn: 'root'
})

export class DcService {
  sourceData$;
  appCrossfilter;
  constructor() { 
    
  }
  // create crossfilter function
  createCrossfilter(){
    // get data from csv file
    return d3.csv('../../assets/data.csv', (d) => {
      // convert string to number
      return {
        Item_code: d.Item_code,
        category_desc: d.category_desc,
        channel: d.channel,
        country: +d.country,
        division: d.division,
        dm: +d.dm,
        exec_id: d.exec_id,
        item_brand: d.item_brand,
        item_category: d.item_category,
        margin: +d.margin,
        markdown: +d.markdown,
        price: +d.price,
        quantity: +d.quantity,
        region: d.region,
        revenues: +d.revenues,
        season: d.season,
        stock: d.stock,
        store: d.store,
        valuta: d.valuta,
        week_ref: +d.week_ref,
        year_ref: +d.year_ref,
      }}).then(data=>crossfilter(data))
  }
  createDimension(params){
    return this.appCrossfilter.dimension(d=>d.params);
  }
  createGroupWitnReduceSum(dimension, reduceValue){
    return dimension.group().reduceSum(d=>d[reduceValue]);
  }
  createGroupWitnReduceCount(dimension, reduceValue){
    return dimension.group().reduceCount(d=>d[reduceValue]);
  }
}
