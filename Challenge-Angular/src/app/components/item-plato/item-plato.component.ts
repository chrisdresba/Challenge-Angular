import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-plato',
  templateUrl: './item-plato.component.html',
  styleUrls: ['./item-plato.component.scss']
})
export class ItemPlatoComponent implements OnInit {

  @Input() plato: any;
  @Input() menu: boolean = false;
  @Output() detailPlato: EventEmitter<any> = new EventEmitter<any>();
  constructor(private menuServ:MenuService) { }

  ngOnInit(): void {
  }

  addDish(plato:any){
    this.menuServ.addDish(plato);
 }

  detail(plato:any){
    this.detailPlato.emit(plato);
  }

  deleteDish(plato:any){
    this.menuServ.removeDish(plato);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se eliminó correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
