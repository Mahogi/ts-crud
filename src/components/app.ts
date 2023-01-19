import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      models,
      brands,
    });
    console.log(this.carsCollection);
  }

  initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';

    this.htmlElement.append(container);
  };
}

export default App;
