import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/common/summary';
import { CoronaService } from 'src/app/services/corona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  summary: Summary;
  
  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.coronaService.sumBS.subscribe(data => this.summary = data); 
  }

}
