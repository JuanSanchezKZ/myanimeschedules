import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
})
export class AnimeCardComponent implements OnInit {
  @Input('data') cardData: any;

  constructor(public dialog: MatDialog) {}

  openDialog(data: any) {
    this.dialog.open(ModalComponent, {
      data: {
        title: data.title,
        synopsis: data.synopsis,
        image: data.images.jpg.image_url,
        broadcast: data.aired.prop.from,
        broadcastTime: data.broadcast.time,
        storage: data,
      },
    });
  }

  ngOnInit(): void {}
}
