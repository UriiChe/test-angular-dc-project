import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DushboardComponent } from './dushboard.component';
import { DcService } from 'src/app/services/dc.service';
import * as crossfilter from 'crossfilter2';
import { Data } from '../../models/data';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DushboardComponent', () => {
    let component: DushboardComponent;
    let fixture: ComponentFixture<DushboardComponent>;
    let spy: jasmine.Spy;
    let dcService;
    let mocCurrentProperty: string;   // for currentProperty
    let mocDataFromCrossFilter; // data from DcService
    let mocReset: boolean; // for reset toggler in Template
    let mocFiltersForLineChart: string[]; // for given filters list from @Output
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DushboardComponent],
            providers: [DcService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DushboardComponent);
        component = fixture.componentInstance;
        dcService = fixture.debugElement.injector.get(DcService);
        mocCurrentProperty = 'markdown';
        mocFiltersForLineChart = ["QQ", "HH"];
        mocReset = true;
        mocDataFromCrossFilter = Promise.resolve([{
            item_category: 'QQ',
            margin: 5.44832739318407,
            markdown: 0.200166805671393,
            revenues: 7.94468522977134,
            week_ref: 27,
            year_ref: 2015,
       }]).then(data=>crossfilter(data));
        spy = spyOn(dcService, 'configureTestingModule').and.returnValue(mocDataFromCrossFilter);

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
    
    it('should call createCrossfilter method of DcService', ()=>{
        component.ngOnInit();
        expect(spy.calls.any()).toBeTruthy();
    });
    it('createCrossfilter method should set dataFromCrossfilter', ()=>{
        component.ngOnInit();
        expect(component.dataFromCrossfilter).toEqual(mocDataFromCrossFilter);
    })
    it('changeViewProperty method should change currentProperty value', ()=>{
        component.changeViewProperty(mocCurrentProperty);
        expect(component.currentProperty).toEqual(mocCurrentProperty);
    });
    it('should call getFilterEventPieChart method after filterEvent', ()=>{
        let pieChart = fixture.nativeElement.querySelector('app-pie-chart');
        pieChart.filterEvent(mocFiltersForLineChart);
        expect(component.getFilterEventPieChart(mocFiltersForLineChart)).toBeTruthy();
    });
    it('getFilterEventPieChart method should change filtersForLineChart value', ()=>{
        component.getFilterEventPieChart(mocFiltersForLineChart);
        expect(component.filtersForLineChart).toEqual(mocFiltersForLineChart);
    });
    it('click event from template should change reset value', ()=>{
        let resetButton = fixture.nativeElement.querySelector('.reset');
        resetButton.click();
        expect(component.reset).toEqual(!mocReset);
    })
});