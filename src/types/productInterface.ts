export interface IProduct { // interface para la creación del nuevo producto.
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
    rating:      Rating;
}

export interface CardProps{
    product: IProduct;
}

export interface Rating {
    rate:  number;
    count: number;
}