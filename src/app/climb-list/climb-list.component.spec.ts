import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbListComponent } from './climb-list.component';

describe('ClimbListComponent', () => {
  let component: ClimbListComponent;
  let fixture: ComponentFixture<ClimbListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimbListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
