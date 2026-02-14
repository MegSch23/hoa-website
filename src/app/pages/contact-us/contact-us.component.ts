import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

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

  BACKEND_EMAIL_URL = environment.BACKEND_EMAIL_URL;

  isSubmitting = false;
  submitted = false;
  errorMessage = '';

  async onSubmit(form: any) {
    if (form.invalid) return;

    const siteKey = environment.RECAPTCHA_SITE_KEY;
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
      const response = await fetch(this.BACKEND_EMAIL_URL, {
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
