import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css'],
})
export class ListRenderComponent implements OnInit {
  coin: any[] = [];
  moeda: string = 'EUR';
  dataInicial: string = '07-06-2022';
  dataFinal: string = '07-25-2022';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        //"https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='07-06-2022'&@dataFinalCotacao='07-25-2022'&$top=1000&$format=json"
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${this.moeda}'&@dataInicial='${this.dataInicial}'&@dataFinalCotacao='${this.dataFinal}'`
      )
      .subscribe((data: any) => {
        const { value } = data;

        this.coin = value;
      });
  }
  displayCoin(value: any) {
    this.coin = value;
  }
}
