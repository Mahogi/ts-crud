import Car from '../types/car';
import Model from '../types/model';
import Brand from '../types/brand';
import CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    cars: Car[],
    models: Model[],
    brands: Brand[],
};

class CarsCollection {
    private readonly props: CarsCollectionProps;

   //  private cars: Car[];
   //  private models: Model[];
   //  private brands: Brand[];
   // constructor({ cars, models, brands }: CarsCollectionProps) {
        // this.cars = JSON.parse(JSON.stringify(cars));
        // this.models = JSON.parse(JSON.stringify(models));
        // this.brands = JSON.parse(JSON.stringify(brands));
    // }
    constructor(props: CarsCollectionProps) {
        this.props = props;
    }

    private joinCar = (car: Car) => {
        const { brands, models } = this.props;
        const carModel = models.find((model) => model.id === car.modelId);
        const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

        return {
            // ...car,
            id: car.id,
            brand: (carBrand && carBrand.title) ?? 'unknown',
            model: (carModel && carModel.title) ?? 'unknown',
            price: car.price,
            year: car.year,
        };
    };

    public get all(): CarJoined[] {
        return this.props.cars.map(this.joinCar);
    }
}

export default CarsCollection;
