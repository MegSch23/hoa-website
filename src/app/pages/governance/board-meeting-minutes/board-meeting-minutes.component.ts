import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-board-meeting-minutes',
  imports: [CommonModule],
  templateUrl: './board-meeting-minutes.component.html',
})
export class BoardMeetingMinutesComponent {
  meetings = [
    {
      id: 1,
      date: new Date('2025-05-01'),
      summary: 'Discussed upcoming HOA events and maintenance updates.',
      topics: ['Upcoming events', 'Maintenance updates', 'Budget allocation'],
      decisions: ['Approved the budget for next quarter', 'Scheduled maintenance for Clubhouse'],
    },
    {
      id: 2,
      date: new Date('2025-04-15'),
      summary: 'Addressed resident concerns regarding parking and landscaping.',
      topics: ['Resident concerns', 'Parking regulations', 'Landscaping updates'],
      decisions: ['Decided to enforce parking rules more strictly', 'Approved new landscaping plan'],
    }
  ];

  selectedMeeting: any;

  // View detailed meeting minutes
  viewMeetingDetails(meetingId: number) {
    this.selectedMeeting = this.meetings.find(meeting => meeting.id === meetingId);
  }

  // Close meeting details modal
  closeMeetingDetails() {
    this.selectedMeeting = null;
  }

  // Export meeting details to PDF
  downloadPDF() {
    const doc = new jsPDF();

    // Add logo (same as before)
    const logoUrl = 'assets/logo.png'; // Path to your logo
    doc.addImage(logoUrl, 'PNG', 15, 10, 50, 30);

    let yPosition = 45;

    // Title
    doc.setFont('Arial', 'bold');
    doc.setFontSize(24);
    doc.text('HOA Board Meeting Minutes', 20, yPosition);

    // Meeting Details
    yPosition += 20;
    doc.setFont('Arial', 'normal');
    doc.setFontSize(14);
    doc.text(`Meeting Date: ${this.selectedMeeting.date.toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Summary: ${this.selectedMeeting.summary}`, 20, yPosition);
    yPosition += 15;

    // Topics Discussed
    doc.text('Topics Discussed:', 20, yPosition);
    yPosition += 10;
    this.selectedMeeting.topics.forEach((topic: any) => {
      doc.text(`- ${topic}`, 20, yPosition);
      yPosition += 10;
    });

    yPosition += 10;

    // Decisions Made
    doc.text('Decisions Made:', 20, yPosition);
    yPosition += 10;
    this.selectedMeeting.decisions.forEach((decision: any) => {
      doc.text(`- ${decision}`, 20, yPosition);
      yPosition += 10;
    });

    doc.save('hoa-board-meeting-minutes.pdf');
  }
}