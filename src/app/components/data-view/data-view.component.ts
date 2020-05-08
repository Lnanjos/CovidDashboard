import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/common/summary';
import { CoronaService } from 'src/app/services/corona.service';
import { SelectItem } from 'primeng/api/primeng-api';
import { Country } from 'src/app/common/country';
import { DatePipe } from '@angular/common';

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

  display: boolean = false;

  selectCountry: Country;

  countryDayOneData: Country[];

  data: any;

  downloadedChartData: boolean = false;

  constructor(private coronaService: CoronaService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.coronaService.sumBS.subscribe(data => this.summary = data);

    this.sortField = 'TotalConfirmed';

    this.sortOptions = [
      { label: 'Confirmados', value: 'TotalConfirmed' },
      { label: 'Recuperados', value: 'TotalRecovered' },
      { label: 'Mortos', value: 'TotalDeaths' },
      { label: 'País', value: 'Country' }
    ];
  }

  onSortChange(event) {
    if (event.value === 'Country') {
      this.sortOrder = 1;
    } else {
      this.sortOrder = -1;
    }
    this.sortField = event.value;
  }

  showDialog(selectCountry) {
    this.selectCountry = selectCountry;
    this.display = true;
    this.coronaService.getDayOneAll(selectCountry.Slug).subscribe(values => { this.countryDayOneData = values; this.loadData() });
  }

  loadData() {
    this.downloadedChartData = true;

    let labels: string[];
    let confirmed: number[];
    let recovered: number[];
    let deaths: number[];

    this.countryDayOneData.forEach(
      country => {
        if (labels == undefined) {
          labels = [this.datepipe.transform(country.Date, 'dd/MM')];
          confirmed = [country.Confirmed]
          recovered = [country.Recovered]
          deaths = [country.Deaths]
        } else {
          labels.push(this.datepipe.transform(country.Date, 'dd/MM'));
          confirmed.push(country.Confirmed);
          recovered.push(country.Recovered);
          deaths.push(country.Deaths);
        }
      }
    );

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Mortes',
          data: deaths,
          fill: true,
          borderColor: '#77889980',
          backgroundColor: '#77889980'
        },
        {
          label: 'Recuperados',
          data: recovered,
          fill: true,
          borderColor: '#3cb371',
          backgroundColor: '#3cb37180'
        },
        {
          label: 'Confirmados',
          data: confirmed,
          fill: true,
          borderColor: '#ff6347',
          backgroundColor: '#ff634780'
        }
      ]
    }
  }
}
