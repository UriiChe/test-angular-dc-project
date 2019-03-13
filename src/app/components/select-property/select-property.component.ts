import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-property',
  templateUrl: './select-property.component.html',
  styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
  visible:boolean = false;
  constructor() { }

  ngOnInit() {
  }
   
}
