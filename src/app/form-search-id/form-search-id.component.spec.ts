import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchIdComponent } from './form-search-id.component';

describe('FormSearchIdComponent', () => {
  let component: FormSearchIdComponent;
  let fixture: ComponentFixture<FormSearchIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSearchIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSearchIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
