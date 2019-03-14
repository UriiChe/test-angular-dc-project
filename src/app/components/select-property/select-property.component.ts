import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-select-property',
  templateUrl: './select-property.component.html',
  styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
  visible:boolean = false;
  @Input()propertyForChangeView: string[];
  @Output()changeViewPropertyEvent = new EventEmitter();
  changeOutput(value){
    this.changeViewPropertyEvent.emit(value);
  }
  constructor() { }

  ngOnInit() {
  }
   
}
