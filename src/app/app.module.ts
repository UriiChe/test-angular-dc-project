import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DushboardComponent } from './container/dushboard/dushboard.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TimeLineChartComponent } from './components/time-line-chart/time-line-chart.component';
import { NavComponent } from './components/nav/nav.component';
import { SelectPropertyComponent } from './components/select-property/select-property.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    DushboardComponent,
    PieChartComponent,
    TimeLineChartComponent,
    NavComponent,
    SelectPropertyComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
