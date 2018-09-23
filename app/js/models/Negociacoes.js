System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacoes;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this.negociacoes = [];
                }
                adiciona(negociacao) {
                    this.negociacoes.push(negociacao);
                }
                paraArray() {
                    return this.negociacoes;
                }
                paraTexto() {
                    console.log(JSON.stringify(this.negociacoes));
                }
                igual(negociacoes) {
                    return JSON.stringify(this.negociacoes) == JSON.stringify(negociacoes.paraArray);
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
