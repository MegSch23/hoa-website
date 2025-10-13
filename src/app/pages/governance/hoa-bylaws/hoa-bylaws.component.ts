import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-hoa-bylaws',
  imports: [],
  templateUrl: './hoa-bylaws.component.html',
})
export class HoaBylawsComponent {
    downloadPDF() {
    const doc = new jsPDF();

    // Add Logo
    const logoUrl = 'assets/logo.png'; // Path to your logo in the assets folder
    doc.addImage(logoUrl, 'PNG', 15, 10, 50, 30); // (imagePath, format, x, y, width, height)

    // Add Space after logo
    let yPosition = 45;  // Adjust the yPosition after adding the logo

    // Title
    doc.setFont('Arial', 'bold');
    doc.setFontSize(24);
    doc.text('HOA Bylaws', 20, yPosition);

    // Update yPosition after the title
    yPosition += 15;

    // General Rules Section
    doc.setFont('Arial', 'normal');
    doc.setFontSize(14);
    doc.text('General Rules:', 20, yPosition);

    const generalRules = [
      'Rule 1: All residents must adhere to the parking regulations and park only in designated areas.',
      'Rule 2: No alterations to the exterior of homes without prior written approval from the HOA board.',
      'Rule 3: Quiet hours are from 10 PM to 7 AM. Please be mindful of noise levels during these times.',
      'Rule 4: Trash and recycling bins should be stored out of sight when not in use, and only placed at the curb on the day of collection.',
      'Rule 5: Pets must be kept on a leash when outside. Owners are responsible for cleaning up after their pets.'
    ];

    let y = yPosition + 10; // Adjust the position after the title

    generalRules.forEach((rule) => {
      const text = doc.splitTextToSize(rule, 180); // Wrap text to fit within the page (180px wide)
      text.forEach((line: string | string[], index: any) => {
        if (y + 10 > 280) {
          doc.addPage();
          y = 20; // Reset Y position to top of the new page
        }
        doc.text(line, 20, y);
        y += 10;
      });
    });

    // Fines & Penalties Section
    doc.setFont('Arial', 'normal');
    doc.setFontSize(14);
    doc.text('Fines & Penalties:', 20, y + 10);
    const fines = [
      'Parking Violations: $50 per incident',
      'Unauthorized Exterior Modifications: $200 per violation',
      'Noise Violations: $25 for the first offense, $50 for subsequent offenses',
      'Improper Trash Disposal: $30 per incident',
      'Pet Violations (Leash Law): $25 per offense'
    ];

    y += 20;
    fines.forEach((fine) => {
      const text = doc.splitTextToSize(fine, 180); // Wrap text to fit within the page (180px wide)
      text.forEach((line: string | string[], index: any) => {
        if (y + 10 > 280) {
          doc.addPage();
          y = 20; // Reset Y position to top of the new page
        }
        doc.text(line, 20, y);
        y += 10;
      });
    });

    // Save the PDF
    doc.save('hoa-bylaws.pdf');
  }
}