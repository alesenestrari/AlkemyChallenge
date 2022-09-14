import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { PlatoDetailResponse, PlatoResponse } from 'src/app/models/plato.model';
import { AlertService } from 'src/app/services/alert.service';
import { MenuService } from 'src/app/services/menu.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-plato-detail',
  templateUrl: './plato-detail.component.html',
  styleUrls: ['./plato-detail.component.scss']
})
export class PlatoDetailComponent implements OnInit {
  plato: PlatoDetailResponse;
  id: number;

  menuSub = new Subject<Menu[]>();

  menus: Menu[];

  numVegan: number;
  numNoVegan: number;
  constructor(private platoService: PlatoService, private route: ActivatedRoute, private router: Router, private alert: AlertService, private menuService: MenuService) { }

  ngOnInit(): void {
    //Aqui seteo el id que tengo como parametro en el route, para cargar el plato correspondiente.
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.platoService.getPlato(this.id).subscribe(res => {
          console.log(res);
          this.plato = res;
        });
      }
    )
  }

  //Metodo para agregar un plato
  onAddMenu() {
    var plato = {
      title: this.plato.title,
      image: this.plato.image,
      price: this.plato.pricePerServing,
      time: this.plato.readyInMinutes,
      vegan: this.plato.vegan,
      healthScore: this.plato.healthScore
    }
    this.menuService.addMenu(plato);
  }

}
