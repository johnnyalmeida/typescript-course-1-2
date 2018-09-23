import { MeuObjeto } from './MeuObjeto';
import { Negociacao } from './Negociacao';

export class Negociacoes implements MeuObjeto<Negociacoes> {
  readonly negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void{
    this.negociacoes.push(negociacao);
  } 

  paraArray(): Negociacao[]{
    return this.negociacoes;
  }

  paraTexto(): void{
    console.log(JSON.stringify(this.negociacoes));
  }

  igual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) == JSON.stringify(negociacoes.paraArray);
  }
}