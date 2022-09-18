import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plato } from 'src/app/entidades/plato';
import { ApifoodService } from 'src/app/services/apifood.service';
import Swal from 'sweetalert2';
import { debounce } from "rxjs/operators";
import { fromEvent, interval, Subscription } from "rxjs";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  @Output() listadoPlatos: EventEmitter<any> = new EventEmitter<any>();
  public busqueda: string = '';
  public listado: any;
  public formSearch: FormGroup;
  public obs: Subscription = new Subscription();
  public title: string = '';
  public loading: boolean = false;

  constructor(private service: ApifoodService, private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3)]]

    })

    this.obs = this.formSearch.valueChanges
      .pipe(debounce(() => interval(200)))
      .subscribe(data => this.busqueda = data.name
      );
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.obs.unsubscribe()
  }

  search() {
    setTimeout(() => {
      if (this.busqueda.length > 2) {
        this.loading = true;
        this.service.getFood(this.busqueda).subscribe((data: any) => {
          this.listado = data.results.map((plato: any) =>  
          new Plato(plato.vegan, plato.healthScore, plato.pricePerServing, plato.id, plato.title, plato.readyInMinutes, plato.image)
          )
          this.loading = false;
          this.listadoPlatos.emit(this.listado);
        })
      } else {
        this.listadoPlatos.emit([]);
      }
    }, 400)
  }
}
