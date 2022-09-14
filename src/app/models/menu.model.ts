export class Menu {
    title: string;
    image: string;
    price: number;
    time: number;
    vegan: any;
    healthScore: number;

    constructor() {
        this.title = "",
        this.image = "",
        this.price = 0,
        this.time = 0,
        this.healthScore = 0
    }
}

export class AttrMenu {
    price: number;
    healthScore: number;
    tiempo: number;

    constructor() {
        this.price = 0,
        this.healthScore = 0,
        this.tiempo = 0
    }
}