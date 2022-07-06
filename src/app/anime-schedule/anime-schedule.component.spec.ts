import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeScheduleComponent } from './anime-schedule.component';

describe('AnimeScheduleComponent', () => {
  let component: AnimeScheduleComponent;
  let fixture: ComponentFixture<AnimeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
