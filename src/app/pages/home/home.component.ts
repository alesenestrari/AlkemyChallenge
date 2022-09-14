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

  @ViewChild('searchRef') searchRef: ElementRef;

  private readonly searchSubject = new Subject<string>();

  searchSub: Subscription;

  menus: [PlatoDetailResponse];

  menu: Menu[] = [];

  precioTotal: number;
  cantidadPlatos: number;
  hScore: number;
  tiempoPromedio: number;

  srch = new Subject<PlatoResponse[]>();

  datas= new AttrMenu();

  resultados!: PlatoResponse[];

  platosConDescripcion: PlatoDetailResponse[];

  constructor(private platoService: PlatoService, private menuService: MenuService) { }

  ngOnInit(): void {

    this.searchSubject.pipe(filter(res => res?.length >= 2), debounceTime(1000), distinctUntilChanged()).subscribe(response => {
      this.platoService.buscarPlatos(response);
    });

    this.menuService.menusSub.pipe(tap(respo => {
      this.datas = this.menuService.getData(respo);
    }))
    .subscribe(res => {
      this.menu = res;
    });
    

  }

  onSearchQueryInput(e: Event) {
    const searchQuery = (e.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }


  onDeletePlato(i: number) {
    this.menuService.deletePlato(i, this.menu);
  }

}
