import { Component, Input, OnInit } from '@angular/core';
import { Plato } from 'src/app/entidades/plato';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listado-platos',
  templateUrl: './listado-platos.component.html',
  styleUrls: ['./listado-platos.component.scss']
})
export class ListadoPlatosComponent implements OnInit {

  @Input() arrayPlatos: any;

  constructor(private service:MenuService) { 
  }

  ngOnInit(): void {
  }

  addDish(item:Plato){
     this.service.addDish(item);
  }

}
