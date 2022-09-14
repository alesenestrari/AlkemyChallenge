import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlatoDetailResponse, PlatoResponse, Results } from 'src/app/models/plato.model';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {


  resultados: Results[] = [];

  

  sus: Subscription;

  constructor(private platoService: PlatoService) { }

  ngOnInit(): void {
   this.sus = this.platoService.platosSub.subscribe(res => {
      this.resultados = res;
    });
  }

  ngOnDestroy(): void {
    this.sus.unsubscribe();
  }

}
