import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-select-property',
  templateUrl: './select-property.component.html',
  styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
  visible:boolean = false;
  curentProperty:string = "markdown";
  @Input()propertyForChangeView: string[];
  @Output()changeViewPropertyEvent = new EventEmitter<string>();
  changeOutput(value:string){
    this.curentProperty = value;
    this.changeViewPropertyEvent.emit(value);
  }
  constructor() { }

  ngOnInit() {
  }
   
}
