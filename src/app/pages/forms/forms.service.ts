
export interface HOAForm {
  title: string;
  description: string;
  fileUrl: string;
}

export const dummyForms: HOAForm[] = [
  {
    title: 'Architectural Change Request',
    description: 'Submit changes for exterior modifications or landscaping.',
    fileUrl: 'assets/forms/architectural-change-request.pdf',
  },
{
    title: 'Pet Registration',
    description: 'Register your pet with the HOA for safety and compliance.',
    fileUrl: 'assets/forms/pet-registration.pdf',
},
];