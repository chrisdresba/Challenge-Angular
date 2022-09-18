export class Plato {
    vegan: boolean;
    healthScore: number;
    price: number;
    id: number;
    title: string;
    readyInMinutes: number;
    image: string;

    constructor(vegan: boolean, hScore: number, price: number, id: number, title: string, minutes: number, image: string) {
        this.vegan = vegan;
        this.healthScore = hScore;
        this.price = price;
        this.id = id;
        this.title = title;
        this.readyInMinutes = minutes;
        this.image = image;
    }
}
