import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AttrMenu, Menu } from "../models/menu.model";
import { AlertService } from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    
    menus: Menu[] = [];
    
    menusSub = new Subject<Menu[]>();
    
    // data = new AttrMenu();

    numVeg = 0;
    numNV = 0;

    constructor(private alert: AlertService) {

    }

    // Agrego un menu, el primer for es para sumarizar los platos No veganos y Veganos.
    addMenu(menu: Menu) {
        let nVegan = 0;
        let nNVegan = 0;
        for (var i=0; i < this.menus.length; i++) {
            if (this.menus[i].vegan) {
                nVegan++;
            } else {
                nNVegan++;
            }
        }
        // Verifico que no se pueda agregar mas de 2.
        if (menu.vegan && nVegan === 2 || !menu.vegan && nNVegan === 2) {
            this.alert.showAlertError('Error!', 'Recuerde que puede ingresar máximo 2 veganos y 2 no veganos.');
            return
        }
        // Verifico que el menu ya tenga 4 platos.
        if (this.menus.length < 4 && nVegan <= 2 && this.numVeg <= 2) {
            this.menus.push(menu);
            this.menusSub.next(this.menus);
        } else {
            this.alert.showAlertError('Error', 'Maximo de 4 platos alcanzado.')
        }
    }

    // Metodo para obtener las sumas de los diferentes parametros de cada plato que se agrega al menu
    getData(menu: Menu[]) {
        let data = new AttrMenu();
        for (var i=0; i < menu.length; i++) {
            data.price += menu[i].price;
            data.healthScore += menu[i].healthScore;
            data.tiempo += menu[i].time;
        }
        return data
   
    }

    // Metodo para borrar un plato.
    deletePlato(i: number, menus: Menu[]) {
        menus.splice(i, 1);
        this.menusSub.next(menus);
    }

    getHealthScore(menu: Menu[]) {

    }
}