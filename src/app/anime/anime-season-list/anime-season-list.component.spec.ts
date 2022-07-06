import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSeasonListComponent } from './anime-season-list.component';

describe('AnimeSeasonListComponent', () => {
  let component: AnimeSeasonListComponent;
  let fixture: ComponentFixture<AnimeSeasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeSeasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSeasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
