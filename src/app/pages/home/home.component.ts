import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
 nextMeeting: string = '';



  constructor(private meetingService: MeetingService) {
  }

  async ngOnInit() {
    const date = await this.meetingService.getNextMeeting();
    this.nextMeeting = date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  formatMeetingDate(dateString: string): string {
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  const suffix = this.getOrdinalSuffix(day);

  return `${month} ${day}${suffix}`;
}

private getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

}
