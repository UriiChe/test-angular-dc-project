import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineChartComponent } from './time-line-chart.component';

describe('TimeLineChartComponent', () => {
    let component: TimeLineChartComponent;
    let fixture: ComponentFixture<TimeLineChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimeLineChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the TimeLineChartComponent', () => {
        expect(component).toBeTruthy();
    });
});