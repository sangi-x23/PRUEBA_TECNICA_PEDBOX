import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubredditService } from '../../services/subreddit.service';
import { Subreddit } from '../../interfaces/subreddit.interface';
import {MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-subreddit-detail',
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './subreddit-detail.component.html',
  styleUrl: './subreddit-detail.component.scss'
})
export class SubredditDetail implements OnInit {

  subreddit$!: Observable<Subreddit>;

  constructor(
    private subredditService: SubredditService,
    private dialogRef: MatDialogRef<SubredditDetail>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
      this.subreddit$ = this.subredditService.getSubredditById(this.data.id);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
