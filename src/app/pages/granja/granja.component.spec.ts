import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranjaComponent } from './granja.component';

describe('GranjaComponent', () => {
  let component: GranjaComponent;
  let fixture: ComponentFixture<GranjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
