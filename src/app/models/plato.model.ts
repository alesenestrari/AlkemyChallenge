export interface PlatoResponse {
    number: number;
    offset: number;
    results: [Results];
    totalResults: number;
}

export interface Results {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    pricePerServing: number;
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: [string];
    dishTypes: [
        string
    ];
    diets: [string];
    occasions: [string];
    analyzedInstructions: [];
    spoonacularSourceUrl: string
}



export interface PlatoDetailResponse {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    pricePerServing: number;
    extendedIngredients: [
        id: number,
        aisle: string,
        image: string,
        consistency: string,
        name: string,
        nameClean: string,
        original: string,
        originalName: string,
        amount: number,
        unit: string,
        meta: [
            string
        ],
        measures: {
            us: {
            amount: number,
            unitShort: string,
            unitLong: string
            },
            metric: {
            amount: number,
            unitShort: string,
            unitLong: string
            }
        }
    ];
    id: number;
    title: string;
    readyInMinutes: number,
    servings: number,
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: [string];
    dishTypes: [
        string
    ];
    diets: [string];
    occasions: [string];
    winePairing: {
        pairedWines: [string],
        pairingText: string,
        productMatches: [string]
    };
    instructions: string;
    analyzedInstructions: [
        name: string,
        steps: [
            number: number,
            step: string,
            ingredients: [
                id: number,
                name: string,
                localizedName: string,
                image: string,
            ],
            equipment: [
                id: number,
                name: string,
                localizedName: string,
                image: string,
                temperature: {
                    number: number,
                    unit: string
                },
            ]
        ],
    ];
    sourceName: string,
    creditsText: string,
    originalId: null,
    spoonacularSourceUrl: string
}