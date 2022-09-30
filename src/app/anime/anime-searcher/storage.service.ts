import { Injectable } from '@angular/core';
import { JikanService } from 'src/app/jikan.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveSchedule(schedules: any) {
    const jsonSchedules = JSON.stringify(schedules);
    localStorage.setItem('schedules', jsonSchedules);
  }

  getSchedules() {
    const jsonSchedules = localStorage.getItem('schedules');
    if (jsonSchedules !== null) {
      return JSON.parse(jsonSchedules);
    } else {
      return [];
    }
  }

  deleteSchedules() {
    // const jsonSchedules = localStorage.removeItem();
  }
  clearSchedules() {
    localStorage.clear();
  }
}
