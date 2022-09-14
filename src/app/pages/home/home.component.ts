import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounce, debounceTime, interval, Observable, pipe, Subject, Subscription, fromEvent, observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AttrMenu, Menu } from 'src/app/models/menu.model';
import { PlatoDetailResponse, PlatoResponse } from 'src/app/models/plato.model';
import { MenuService } from 'src/app/services/menu.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;

  srh = "";

  private readonly searchSubject = new Subject<string>();

  searchSub: Subscription;

  menu: Menu[] = [];


  srch = new Subject<PlatoResponse[]>();

  datas= new AttrMenu();

  constructor(private platoService: PlatoService, private menuService: MenuService) { }

  ngOnInit(): void {

    //Aqui me subscribo al sujeto que tiene la string ingresada en el form y cuando ingresa 2 caracteres, espera 1 segundo, y llama al metodo buscar del servicio.
    this.searchSubject.pipe(filter(res => res?.length >= 2), debounceTime(1000), distinctUntilChanged()).subscribe(response => {
      this.platoService.buscarPlatos(response);
    });

    //Obtengo los datos sumarizados de los atributos del menu.
    this.menuService.menusSub.pipe(tap(respo => {
      this.datas = this.menuService.getData(respo);
    }))
    .subscribe(res => {
      this.menu = res;
    });
    //Aqui ultimo obtengo la lista de los menus agregados.

  }

  //Obtengo el string del input, lo limpio y hago un next.
  onSearchQueryInput(e: Event) {
    const searchQuery = (e.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

//Llamo al servicio para borrar un plato del menu.
  onDeletePlato(i: number) {
    this.menuService.deletePlato(i, this.menu);
  }

}
