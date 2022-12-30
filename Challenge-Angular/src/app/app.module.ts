import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemPlatoComponent } from './components/item-plato/item-plato.component';
import { DetallePlatoComponent } from './components/detalle-plato/detalle-plato.component';
import { ListadoPlatosComponent } from './components/listado-platos/listado-platos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { Page404Component } from './pages/page404/page404.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { SiNoPipe } from './pipes/si-no.pipe';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    BusquedaComponent,
    ItemPlatoComponent,
    DetallePlatoComponent,
    ListadoPlatosComponent,
    Page404Component,
    BuscadorComponent,
    SiNoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
