import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsComponent } from './components/cards/cards.component';
import { CardModule } from 'primeng/card';
import { DataViewComponent } from './components/data-view/data-view.component';
import {DataViewModule} from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import { LineChartComponent } from './components/line-chart/line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    DataViewComponent,
    LineChartComponent
  ],
  imports: [
    ChartModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    CardModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
