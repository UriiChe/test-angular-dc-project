import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SelectPropertyComponent } from './select-property.component';
import { By } from '@angular/platform-browser';

describe('SelectPropertyComponent', () => {
    let component: SelectPropertyComponent;
    let fixture: ComponentFixture<SelectPropertyComponent>;
    let dropdownButton: HTMLElement;
    let de: DebugElement;
    let mocCurrentProperty: string;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectPropertyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectPropertyComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.dropdown-toggle'));
        dropdownButton = de.nativeElement;
        mocCurrentProperty = "markdown";
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should display current (input) property after detectChanges()', () => {
        component.curentProperty = mocCurrentProperty;
        fixture.detectChanges();
        expect(dropdownButton.textContent).toContain(component.curentProperty);
    });
    it('should send event when user select a property', ()=>{
        let selectButton = fixture.nativeElement.query('.dropdown-item');
        selectButton.click();
        component.changeOutput(mocCurrentProperty);
        expect(component.curentProperty).toEqual(mocCurrentProperty);
    })
});