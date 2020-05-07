import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/common/summary';
import { CoronaService } from 'src/app/services/corona.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  summary: Summary;

  dados: any;
  
  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.coronaService.getSummary().subscribe(
      data => {this.summary = data; this.insertData();}
    );
  }


  insertData() {
    if (this.summary != undefined) {
      this.dados = {
        labels: ['Ativos (Confirmados - Recuperados - Mortes)', 'Recuperados', 'Mortes'],
        datasets: [
          {
            label: 'First Dataset',
            data: [this.summary.Global.TotalConfirmed - this.summary.Global.TotalRecovered - this.summary.Global.TotalDeaths,
            this.summary.Global.TotalRecovered, this.summary.Global.TotalDeaths],
            backgroundColor: [
              "#ff6347",
              "#3cb371",
              "#778899"
            ],
            hoverBackgroundColor: [
              "#ff0000",
              "#008000",
              "#696969"
            ]
          }
        ]
      }
    }
  }

}
