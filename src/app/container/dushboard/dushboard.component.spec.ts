import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DushboardComponent } from './dushboard.component';
import { DcService } from 'src/app/services/dc.service';
import * as crossfilter from 'crossfilter2';
import { Data } from '../../models/data';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

describe('DushboardComponent', () => {
    let component: DushboardComponent;
    let pieChartComp: PieChartComponent;
    let fixture: ComponentFixture<DushboardComponent>;
    let fixtureForPieChart: ComponentFixture<PieChartComponent>;
    let spy: jasmine.Spy;
    let dcService;
    let mocCurrentProperty: string;   // for currentProperty
    let mocDataFromCrossFilter; // data from DcService
    let mocReset: boolean; // for reset toggler in Template
    let de: DebugElement;
    let mocFiltersForLineChart: string[]; // for given filters list from @Output
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DushboardComponent, PieChartComponent],
            providers: [DcService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DushboardComponent);
        fixtureForPieChart = TestBed.createComponent(PieChartComponent)
        component = fixture.componentInstance;
        pieChartComp = fixtureForPieChart.componentInstance;
        dcService = fixture.debugElement.injector.get(DcService);
        de = fixture.debugElement;
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
        spy = spyOn(dcService, 'createCrossfilter').and.returnValue(mocDataFromCrossFilter);

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
        spyOn(component, "getFilterEventPieChart");
        const pieChart = de.query(By.directive(PieChartComponent));
        const pieChartComp = pieChart.componentInstance;
        pieChartComp.filterEvent.emit(mocFiltersForLineChart);
        expect(component.getFilterEventPieChart).toHaveBeenCalledWith(mocFiltersForLineChart);
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