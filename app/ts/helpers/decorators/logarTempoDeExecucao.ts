export function logarTempoDeExecucao(segundos: boolean = false) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    const metodoOriginal = descriptor.value;

    descriptor.value = function(...args: any[]){
      let unidade = 'ms';
      let divisor = 1;
      if(segundos) {
        unidade = 's';
        divisor = 1000
      }

      console.log('------------------------');
      console.log(`parametros do metodo ${propertyKey}: ${JSON.stringify(args)}`);
      const t1 = performance.now();
      const retorno = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      console.log(`retorno do metodo ${propertyKey}: ${JSON.stringify(retorno)}`);
      console.log(`tempo de execucao do metodo ${propertyKey} é: ${(t2-t1)/divisor}${unidade}`);
      return retorno;
    }

    return descriptor;
  }
}