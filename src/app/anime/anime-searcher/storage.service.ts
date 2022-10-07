import { Injectable } from '@angular/core';
import { JikanService } from 'src/app/jikan.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveSchedule(schedules: any, id: number) {
    const jsonSchedules = JSON.stringify(schedules);
    localStorage.setItem(String(id), jsonSchedules);
    const stringIds = JSON.stringify(id);
    localStorage.setItem('id', stringIds);
  }

  getSchedules() {
    const ids = localStorage.getItem('id');
    console.log(localStorage.getItem('50602'));
    if (ids !== null) {
      const parsedIds = JSON.parse(ids);
      const jsonSchedules = localStorage.getItem(parsedIds);
      if (jsonSchedules !== null) {
        return JSON.parse(jsonSchedules);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  deleteSchedule(id: number) {
    const stringId = JSON.stringify(id);
    localStorage.removeItem(stringId);
  }
  clearSchedules() {
    localStorage.clear();
  }
}
