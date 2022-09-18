import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPlatosComponent } from './listado-platos.component';

describe('ListadoPlatosComponent', () => {
  let component: ListadoPlatosComponent;
  let fixture: ComponentFixture<ListadoPlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPlatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
