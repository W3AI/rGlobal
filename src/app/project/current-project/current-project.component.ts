import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopProjectComponent } from './stop-project.component';

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {

  @Output() projectExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);

  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopProjectComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO - include this in a Project Log
      if (result) {
        this.projectExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
 