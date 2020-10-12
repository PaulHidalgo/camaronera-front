import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanqueComponent } from './estanque.component';

describe('EstanqueComponent', () => {
  let component: EstanqueComponent;
  let fixture: ComponentFixture<EstanqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
