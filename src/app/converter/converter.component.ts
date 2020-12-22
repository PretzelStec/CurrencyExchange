import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  amount = 1;
  from = 'CAD';
  to = 'USD';
  rates: {[key:string]:number};
  dateAquired:Date;

  convert() : number{
    return this.amount * this.rates[this.to];
  }

  loadRates(){
    this.exchangeService.getRates(this.from).subscribe(res => {
      this.rates = res.rates;
      this.dateAquired = new Date(res.date);
    })
  }

  getAllCurr() : string[]{
    return Object.keys(this.rates);
  }

  constructor(private exchangeService: ExchangeRatesService) { 
  }

  ngOnInit(): void {
    this.loadRates();
  }

}
