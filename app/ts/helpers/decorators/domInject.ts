export function domInject(seletor: string){
  return function(target: any, key:string){
    let elemento: JQuery;

    const getter = () => {
      if(!elemento){
        console.log('dominject dom getter');
        elemento = $(seletor);
      }

      return elemento;
    }

    Object.defineProperty(target, key, {
      get: getter,
    });
  }
}