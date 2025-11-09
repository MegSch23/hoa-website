
export interface HOAForm {
  title: string;
  description: string;
  fileUrl: string;
}

export const dummyForms: HOAForm[] = [
  {
    title: 'Architectural Change Request',
    description: 'Submit changes for exterior modifications or landscaping. <br> Note: This form has been updated as of January 2025. Do not use older versions. <br><br><a href="assets/forms/architectural-specifications.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-700 hover:text-blue-900 font-medium underline">View Architectural Specifications (PDF)</a>',
    fileUrl: 'assets/forms/architectural-change-request.pdf',
  },
{
    title: 'Cat Registration',
    description: 'Register your cat with the HOA for safety and compliance.',
    fileUrl: 'assets/forms/cat-registration.pdf',
},
];