import { Component, Input, OnInit } from '@angular/core';
import { PlatoResponse, Results } from 'src/app/models/plato.model';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {
  
  // Paso como input desde el menu component el id y el plato.

  @Input() idd: number;
  
  @Input() plato: Results;


  constructor(private platoService: PlatoService) { }

  platos!: Results[];

  ngOnInit(): void {
  }

}
