import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-anime-schedule-card',
    templateUrl: './anime-schedule-card.component.html',
    styleUrls: ['./anime-schedule-card.component.css'],
  })

  export class AnimeScheduleCardComponent implements OnInit {
    
  @Input('schedule') schedule: any

    ngOnInit(): void {
        console.log(this.schedule)
    }
  }