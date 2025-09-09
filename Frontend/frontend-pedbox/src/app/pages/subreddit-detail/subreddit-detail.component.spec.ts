import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditDetail } from './subreddit-detail.component';

describe('SubredditDetail', () => {
  let component: SubredditDetail;
  let fixture: ComponentFixture<SubredditDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubredditDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubredditDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
