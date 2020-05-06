import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/common/summary';
import { CoronaService } from 'src/app/services/corona.service';
import { SelectItem } from 'primeng/api/primeng-api';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  summary: Summary;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number = -1;
  
  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.coronaService.getSummary().subscribe(
      data => this.summary = data
    );

    this.sortField = 'TotalConfirmed';

    this.sortOptions = [
      {label: 'Confirmados', value: 'TotalConfirmed'},
      {label: 'Recuperados', value: 'TotalRecovered'},
      {label: 'Mortos', value: 'TotalDeaths'},
      {label: 'País', value: 'Country'}
  ];
  }

  onSortChange(event){
    if(event.value === 'Country'){
      this.sortOrder = 1;
    } else {
      this.sortOrder = -1;
    }
    this.sortField = event.value;
  }

}
