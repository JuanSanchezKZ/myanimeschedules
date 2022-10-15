import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeWrapperComponent } from './anime-wrapper.component';

describe('AnimeWrapperrComponent', () => {
  let component: AnimeWrapperComponent;
  let fixture: ComponentFixture<AnimeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
