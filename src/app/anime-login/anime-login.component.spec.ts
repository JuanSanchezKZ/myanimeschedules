import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeLoginComponent } from './anime-login.component';

describe('AnimeLoginComponent', () => {
  let component: AnimeLoginComponent;
  let fixture: ComponentFixture<AnimeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
