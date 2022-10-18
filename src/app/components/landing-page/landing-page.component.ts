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

  result: any[] = [];
  moedaSelecionada: string = '';
  dataInicial: string = '';
  dataFinal: string = '';
  dataInicialFormatada: string = '';
  dataFinalFormatada: string = '';

  constructor(private http: HttpClient) {}

  carregarDados(): void {
    this.http
      .get(
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
