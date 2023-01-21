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

    public get all(): CarJoined[] {
        return this.props.cars.map(this.joinCar);
    }

    public get brands(): Brand[] {
        return JSON.parse(JSON.stringify(this.props.brands));
    }

    private joinCar = ({ modelId, ...car }: Car) => {
        const { brands, models } = this.props;
        const carModel = models.find((model) => model.id === modelId);
        const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

        return {
            ...car,
            brand: (carBrand && carBrand.title) ?? 'unknown',
            model: (carModel && carModel.title) ?? 'unknown',
        };
    };

    public getByBrandId = (brandId: string): CarJoined[] => {
        const { cars, models } = this.props;
        const carsModelsID = models
            .filter((model) => model.brandId === brandId)
            .map((model) => model.id);

        const joinedCars = cars
            .filter((car) => carsModelsID.includes(car.modelId))
            .map(this.joinCar);
        // console.log(joinedCars);

        return joinedCars;
    };

    // public getBrandById = (brandId: string): Brand => {
    //     const brand = this.props.brands.find(({ id }) => id === brand.id);
    //     if (brand === undefined) {
    //         throw new Error(`Brand not found with id${brandId}`);
    //     }
    //     return brand;
    // };

    public deleteCarById = (carId: string): void => {
        this.props.cars = this.props.cars
            .filter((car) => car.id !== carId);
        console.table(this.props.cars);
    };
}

export default CarsCollection;
