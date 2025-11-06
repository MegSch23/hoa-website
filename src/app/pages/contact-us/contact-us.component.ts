import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
formData = {
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitted = false;
  errorMessage = '';

async onSubmit(form: any) {
  if (form.invalid) return;

  const siteKey = '6LfDnAIsAAAAADOwdJL08KlRfoMPcp7t93Vnxkhk'; 
  const recaptcha = (window as any).grecaptcha;

  if (!recaptcha || !recaptcha.execute) {
    this.errorMessage = 'reCAPTCHA failed to load. Please refresh and try again.';
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = '';

  try {
    const recaptchaToken = await recaptcha.execute(siteKey, { action: 'contact_us' });

    const toEmail =
      this.formData.reason === 'Property Management'
        ? 'meganlschmidt23@gmail.com'
        : 'meganschmidt23@aol.com';

    const templateParams = {
      ...this.formData,
      to_email: toEmail,
      'g-recaptcha-response': recaptchaToken
    };

    await emailjs.send(
      'service_md9t9ca',
      'template_sdo35dm',
      templateParams,
      'hal3yAiB1Fdm8fAmi'
    );

    this.submitted = true;
    form.resetForm();
  } catch (error) {
    console.error('Email send failed:', error);
    this.errorMessage = 'Something went wrong. Please try again later.';
  } finally {
    this.isSubmitting = false;
  }
}

}
