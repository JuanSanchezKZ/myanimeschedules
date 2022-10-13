import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeRegisterComponent } from './anime-register.component';

describe('AnimeRegisterComponent', () => {
  let component: AnimeRegisterComponent;
  let fixture: ComponentFixture<AnimeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
