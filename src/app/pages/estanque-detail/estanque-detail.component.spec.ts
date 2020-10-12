import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanqueDetailComponent } from './estanque-detail.component';

describe('EstanqueDetailComponent', () => {
  let component: EstanqueDetailComponent;
  let fixture: ComponentFixture<EstanqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
