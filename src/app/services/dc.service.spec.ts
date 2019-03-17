import { TestBed, inject, fakeAsync, flush } from '@angular/core/testing';
import * as crossfilter from 'crossfilter2';
import { DcService } from './dc.service';

describe('DcService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DcService]
  }));

  it('service should be created', inject([DcService], (service: DcService) => {
    expect(service).toBeTruthy();
  }));

  it('service should be created', fakeAsync(inject([DcService], (service: DcService) => {
    // const expectedData =  Promise.resolve([{
    //   item_category: 'QQ',
    //   margin: 5.44832739318407,
    //   markdown: 0.200166805671393,
    //   revenues: 7.94468522977134,
    //   week_ref: 27,
    //   year_ref: 2015,
    // }]).then(data=>crossfilter(data));

    // service.createCrossfilter().then(result=>{
    //    expect(result).toBe(expectedData);
    // });
    // flush();
  })));
})