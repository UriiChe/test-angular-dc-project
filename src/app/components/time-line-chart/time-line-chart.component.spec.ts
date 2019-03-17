import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeLineChartComponent } from './time-line-chart.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Crossfilter } from 'crossfilter2';
import { Data } from '@angular/router';

describe('TimeLineChartComponent', () => {
    let component: TimeLineChartComponent;
    let fixture: ComponentFixture<TimeLineChartComponent>;
    let titlePropertyElement: HTMLElement;
    let titleFiltersElement: HTMLElement;
    let debugProperty: DebugElement;
    let debugFiltersName: DebugElement;
    let expectedProperty: string;
    let expectedFilters: string;
    let dataFromCrossfilter:Crossfilter<Data>;
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
        expectedProperty = 'markdown';
        expectedFilters = ' all categories';
        fixture.detectChanges();
    });

    it('should create the TimeLineChartComponent', () => {
        expect(component).toBeTruthy();
    });
    it('titlePropertyElement should display current (input) property after detectChanges()', () => {
        component.currentProperty = expectedProperty;
        fixture.detectChanges();
        expect(titlePropertyElement.textContent).toContain(component.currentProperty);
    });
    it('titleFiltersElement should display current (input) property after detectChanges()', ()=>{
        component.currentProperty = expectedFilters;
        fixture.detectChanges();
        expect(titleFiltersElement.textContent).toContain(component.filtersName);
    });
    it('should contain ')

});