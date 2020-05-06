import { Component, OnInit } from '@angular/core';
import { CoronaService } from 'src/app/services/corona.service';
import { Summary } from 'src/app/common/summary';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  summary: Summary;

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {

    this.coronaService.getSummary().subscribe(
      data => { console.log(data); this.summary = data }
    );
  }
}
