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

    // Agrego un meno, maximo 4.
    addMenu(menu: Menu) {
        // if (menu.vegan) {
        //     if (this.numVeg < 3) {
        //         this.numVeg++
        //     }
        // } else {
        //     if (this.numNV < 3) {
        //         this.numNV++
        //     }
        // }
        let nVegan = 0;
        let nNVegan = 0;
        for (var i=0; i < this.menus.length; i++) {
            if (this.menus[i].vegan) {
                nVegan++;
            } else {
                nNVegan++;
            }
        }
        if (menu.vegan && nVegan === 2 || !menu.vegan && nNVegan === 2) {
            this.alert.showAlertError('Error!', 'Recuerde que puede ingresar máximo 2 veganos y 2 no veganos.');
            return
        }
        if (this.menus.length < 4 && nVegan <= 2 && this.numVeg <= 2) {
            console.log(this.numNV, this.numVeg)
            this.menus.push(menu);
            this.menusSub.next(this.menus);
        } else {
            this.alert.showAlertError('Error', 'Maximo de 4 platos alcanzado.')
        }
        console.log(this.menus);
    }

    // Metodo para obtener las sumas de los diferentes parametros de cada plato que se agrega al menu
    getData(menu: Menu[]) {
        let data = new AttrMenu();
        console.log(menu);
        for (var i=0; i < menu.length; i++) {
            data.price += menu[i].price;
            data.healthScore += menu[i].healthScore;
            data.tiempo += menu[i].time;
        }
        console.log(data);
        return data
   
    }

    deletePlato(i: number, menus: Menu[]) {
        menus.splice(i, 1);
        this.menusSub.next(menus);
    }

    getHealthScore(menu: Menu[]) {

    }
}