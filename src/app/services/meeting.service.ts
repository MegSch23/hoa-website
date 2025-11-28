import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private calendarId = 'd8a22dd6513c7f3aa1d99ad97923040e536bdb41bd4974746c73431d59b19fc2@group.calendar.google.com';
  private apiKey = 'AIzaSyDyRGuBrHYHMkgMcmziTgmbYLsxKFysISM';

  constructor() {}

   /** Public method: Gets next meeting from Google Calendar, with fallback */
  async getNextMeeting(): Promise<Date> {
    try {
      const date = await this.getNextFromGoogle();

      if (date) {
        return date;
      }

      console.warn('Using fallback: computed 3rd Monday');
      return this.computeNext3rdMonday();
    } catch {
      console.warn('Google Calendar failed. Using fallback.');
      return this.computeNext3rdMonday();
    }
  }

  /** Fetch next non-December meeting from Google Calendar */
private async getNextFromGoogle(): Promise<Date | null> {
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime`;

  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`Google API error: ${response.status}`);
    return null;
  }

  const data = await response.json();
  if (!data.items || data.items.length === 0) return null;

  // Filter only HOA Board Meetings (case-insensitive)
  const filteredEvents = data.items.filter((event: any) => {
    const title = event.summary?.trim().toLowerCase();
    return title === 'hoa board meeting';
  });

  if (filteredEvents.length === 0) return null;

  // Use the earliest one
  const event = filteredEvents[0];

  let eventDate: Date;

  if (event.start.date) {
    // All-day event → avoid timezone shift by forcing noon local time
    const [y, m, d] = event.start.date.split('-').map(Number);
    eventDate = new Date(y, m - 1, d, 12);
  } else {
    eventDate = new Date(event.start.dateTime);
  }

  return eventDate;
}


  /** Bulletproof fallback: compute the next 3rd Monday, skipping December */
  private computeNext3rdMonday(): Date {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    while (true) {
      // Skip December (month 11)
      if (month === 11) {
        month = 0;
        year++;
        continue;
      }

      const firstOfMonth = new Date(year, month, 1);
      const dayOfWeek = firstOfMonth.getDay(); // 0=Sun, 1=Mon...

      // Calculate day number of the first Monday
      const firstMonday =
        dayOfWeek === 1 ? 1 : ((8 - dayOfWeek) % 7) + 1;

      // 3rd Monday = first Monday + 14 days
      const thirdMonday = new Date(year, month, firstMonday + 14);

      // If it's in the future, return it
      if (thirdMonday > today) return thirdMonday;

      // Otherwise move forward one month
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
  }

  
}