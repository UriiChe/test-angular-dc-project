import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';

(function (){
    d3.csv('data.csv').then((experiment)=>{
        const ndx = crossfilter(experiment);
        
    })
})