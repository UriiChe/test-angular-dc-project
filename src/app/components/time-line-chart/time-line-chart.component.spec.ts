import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeLineChartComponent } from './time-line-chart.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Crossfilter } from 'crossfilter2';
import { Data } from '@angular/router';
import * as crossfilter from 'crossfilter2';

describe('TimeLineChartComponent', () => {
    let component: TimeLineChartComponent;
    let fixture: ComponentFixture<TimeLineChartComponent>;
    let titlePropertyElement: HTMLElement;
    let titleFiltersElement: HTMLElement;
    let debugProperty: DebugElement;
    let debugFiltersName: DebugElement;
    let expectedProperty: string;
    let expectedFilters: string;
    let mocdataFromCrossfilter:Crossfilter<Data>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimeLineChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineChartComponent);
        component = fixture.componentInstance;
        debugProperty = fixture.debugElement.query(By.css('.property'));
        titlePropertyElement = debugProperty.nativeElement;
        debugFiltersName = fixture.debugElement.query(By.css('.filter-name'));
        titleFiltersElement = debugFiltersName.nativeElement;
        expectedProperty = 'Markdown';
        expectedFilters = ' all categories';
        mocdataFromCrossfilter = crossfilter([{
            item_category: 'QQ',
            margin: 5.44832739318407,
            markdown: 0.200166805671393,
            revenues: 7.94468522977134,
            week_ref: 27,
            year_ref: 2015,
          }]);
        fixture.detectChanges();
    });

    it('should create the TimeLineChartComponent', () => {
        expect(component).toBeTruthy();
    });
    // it('titlePropertyElement should display current (input) property after detectChanges()', () => {
    //     component.currentProperty = expectedProperty;
    //     fixture.detectChanges();
    //     expect(titlePropertyElement.textContent).toContain(component.currentProperty);
    // });
    // it('titleFiltersElement should display current (input) filters name after detectChanges()', ()=>{
    //     component.filtersName = expectedFilters;
    //     fixture.detectChanges();
    //     expect(titleFiltersElement.textContent).toContain(component.filtersName);
    // });
    // it('should get data from crossfilter after detectChanges()', ()=>{
    //     component.dataFromCrossfilter = mocdataFromCrossfilter;
    //     fixture.detectChanges();
    //     expect(component.dataFromCrossfilter).toEqual(mocdataFromCrossfilter);
    // })

});