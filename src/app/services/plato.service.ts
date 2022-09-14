import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, tap } from "rxjs";
import { PlatoDetailResponse, PlatoResponse, Results } from "../models/plato.model";

export interface SearchResponse {
    results: [
        PlatoResponse
    ],
    offset: number,
    number: number,
    totalResults: number
}

@Injectable({
    providedIn: 'root'
})
export class PlatoService {
    api = "?apiKey=2d57fe5ddbde4c49a5d384c286519f9e&"
    urlSearch = "https://api.spoonacular.com/recipes/complexSearch"
    urlGetId = "https://api.spoonacular.com/recipes/{id}/information"

    platosSub = new Subject<Results[]>();

    platoConDesc = new Subject<PlatoDetailResponse>();

    platos: PlatoResponse[] = [];

    constructor(private http: HttpClient) {

    }

    //Metodo para buscar platos con la string que paso desde home. 
    buscarPlatos(bus: string) {
        const busqueda = 'query=' + bus;
        this.http.get<PlatoResponse>(this.urlSearch + this.api + busqueda + '&addRecipeInformation=true').subscribe(res => {
            this.platosSub.next(res.results);
            console.log(res);
        })
    }

    getPlato(id: number) {
        return this.http.get<PlatoDetailResponse>(`https://api.spoonacular.com/recipes/${id}/information` + this.api + 'includeNutrition=false');
    }
}