import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMeetingMinutesComponent } from './board-meeting-minutes.component';

describe('BoardMeetingMinutesComponent', () => {
  let component: BoardMeetingMinutesComponent;
  let fixture: ComponentFixture<BoardMeetingMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardMeetingMinutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardMeetingMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
