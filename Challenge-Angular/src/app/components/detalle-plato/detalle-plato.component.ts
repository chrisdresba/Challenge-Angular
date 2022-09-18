import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-plato',
  templateUrl: './detalle-plato.component.html',
  styleUrls: ['./detalle-plato.component.scss']
})
export class DetallePlatoComponent implements OnInit {

  @Input() platoSeleccionado: any;
  @Output() detailEstado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  
  }

  cerrar(){
    this.detailEstado.emit(false);
  }

}
