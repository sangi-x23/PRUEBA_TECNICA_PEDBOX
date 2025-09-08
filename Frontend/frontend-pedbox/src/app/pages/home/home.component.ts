import { Component, OnInit, ViewChild } from '@angular/core';
import { SubredditService } from '../../services/subreddit.service';
import { Subreddit } from '../../interfaces/subreddit.interface';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-home',
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'reddit_id', 'title', 'display_name_prefixed', 'over18', 'detail'];
  dataSource = new MatTableDataSource<Subreddit>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching subreddits:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateSubreddits(): void {
    this.subredditService.updateSubreddit().subscribe({
      next: (response: any) => {
        alert(response.message);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error updating subreddits:', error);
      }
    });
  }
}
