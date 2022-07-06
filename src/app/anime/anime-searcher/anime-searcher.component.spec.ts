import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSearcherComponent } from './anime-searcher.component';

describe('AnimeSearcherComponent', () => {
  let component: AnimeSearcherComponent;
  let fixture: ComponentFixture<AnimeSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeSearcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
