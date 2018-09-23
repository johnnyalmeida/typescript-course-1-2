import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {
  @domInject('#data')
  private _inputData: JQuery;
  @domInject('#quantidade')
  private _inputQuantidade: JQuery;
  @domInject('#valor')
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');
  private _negociacaoService = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona(){
    let date = new Date(this._inputData.val().replace(/-/g, ','));

    if(!this.diaUtil){
      this._mensagemView.update('nope');
      return;
    }

    const negociacao = new Negociacao(
      date,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);

    imprime(negociacao, this._negociacoes);

    this._mensagemView.update('Negociação adicionada com sucesso');
    this._negociacoesView.update(this._negociacoes);
  }

  private diaUtil (date: Date) {
    return date.getDay() != DiaDaSemana.Domingo && date.getDay() == DiaDaSemana.Sabado;
  }
  
  @throttle()
  async importaDados(){
    const isOk: HandlerFunction = (res: Response) => {
      if(res.ok) {
        return res;
      }
      throw new Error(res.statusText);
    }
    try{
      const negociacoesParaImportar = await this._negociacaoService.obterNegociacao(isOk);

      const negociacoesImportadas = this._negociacoes.paraArray();
      negociacoesParaImportar
        .filter(negociacao => 
          !negociacoesImportadas.some(importada => negociacao.igual(importada)))
        .forEach(negociacao => this._negociacoes.adiciona(negociacao)); 
        this._negociacoesView.update(this._negociacoes);
    } catch(err){
      this._negociacoesView.update(err.message);
    }
  }
}


enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}