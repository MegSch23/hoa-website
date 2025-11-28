import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      // 1. Get the reCAPTCHA token
      const recaptchaToken = await recaptcha.execute(siteKey, { action: 'contact_us' });

      // 2. Send token + form data to your Render backend
      const response = await fetch('https://hoa-website-backend.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken, formData: this.formData })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Server error');
      }

      // 3. Success
      this.submitted = true;
      form.resetForm();
    } catch (error: any) {
      console.error('Email send failed:', error);
      this.errorMessage = error.message || 'Something went wrong. Please try again later.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
