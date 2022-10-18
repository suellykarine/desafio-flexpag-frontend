import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

interface Coin {
  id: string;
  text: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  data: any;
  dataCoins: Coin[] = [
    {
      id: 'AUD',
      text: 'Dólar Australiano',
    },
    {
      id: 'CAD',
      text: 'Dólar Canadense',
    },
    {
      id: 'EUR',
      text: 'EURO',
    },

    {
      id: 'USD',
      text: 'Dólar dos Estados Unidos',
    },
  ];

  now = moment().format('MM-DD-YYYY');

  result: any[] = [];
  moedaSelecionada: string = '';
  dataInicial: string = '';
  dataFinal: string = '';
  dataInicialFormatada: string = '';
  dataFinalFormatada: string = '';

  displayedColumns: string[] = [
    'Cotação de compra',
    'Cotação de venda',
    'Data e hora da cotação',
  ];

  constructor(private http: HttpClient) {}

  carregarDados(): void {
    this.http
      .get(
        //"https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='07-06-2022'&@dataFinalCotacao='07-25-2022'&$top=1000&$format=json"
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${this.moedaSelecionada}'&@dataInicial='${this.dataInicialFormatada}'&@dataFinalCotacao='${this.dataFinalFormatada}'`
      )
      .subscribe((data: any) => {
        const { value } = data;

        this.result = value;
      });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  showData(): void {
    this.dataInicialFormatada = moment(this.dataInicial).format('MM-DD-YYYY');
    this.dataFinalFormatada = moment(this.dataFinal).format('MM-DD-YYYY');

    this.carregarDados();
  }

  updateData(): void {
    console.log('atualizando');
  }
}
