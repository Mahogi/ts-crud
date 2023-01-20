import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';
import Table from './table'; // { type TableRowData }
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';
// import carsCollection from "../helpers/cars-collection";

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

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
    // console.log(this.carsCollection);
  }

  initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';

    const table = new Table({
      title: 'All Cars',
      columns: {
        id: 'ID',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    // this.htmlElement.append(container);
    const selectField = new SelectField({
      options: this.carsCollection.brands.map(brandToOption),
      onChange: (_, brandId, { text: brandTitle }) => {
        const newCars = this.carsCollection.getByBrandId(brandId);
        table.updateProps({
          rowsData: newCars.map(stringifyProps),
          title: brandTitle,
        });
         console.table(newCars);
      },
    });

    container.append(
        selectField.htmlElement,
        table.htmlElement,
    );
    this.htmlElement.append(container);
  };
}

export default App;
