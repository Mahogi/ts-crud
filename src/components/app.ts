import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';
import Table from './table'; // { type TableRowData }
import stringifyProps, { StringifyObject } from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';
import CarJoined from '../types/car-joined';
// import carsCollection from "../helpers/cars-collection";

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const ALL_BRANDS_ID = '-1';
const ALL_BRANDS_TITLE = 'All Cars';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private selectedBrandId: string | null;

  private brandSelect: SelectField;

  private table: Table<StringifyObject<CarJoined>>;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      models,
      brands,
    });

    this.table = new Table({
      title: ALL_BRANDS_TITLE,
      columns: {
        id: 'ID',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    this.brandSelect = new SelectField({
      options: [
        { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...this.carsCollection.brands.map(brandToOption),
      ],
      onChange: this.handleBrandChange,
    });

    this.selectedBrandId = null;
    this.initialize();
  }

  private handleBrandChange = (_: Event, brandId: string, { text: brandTitle }: Option) => {
    const carBrands = brandId === ALL_BRANDS_ID
        ? this.carsCollection.all
        : this.carsCollection.getByBrandId(brandId);
    // const newCars = this.carsCollection.getByBrandId(brandId);
    this.table.updateProps({
      rowsData: carBrands.map(stringifyProps),
      title: brandTitle,
    });

    this.selectedBrandId = brandId;
  };

  initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';

    container.append(
        this.brandSelect.htmlElement,
        this.table.htmlElement,
    );
    this.htmlElement.append(container);
  };
}

export default App;
