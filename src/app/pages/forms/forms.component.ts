import { Component } from '@angular/core';
import { dummyForms, HOAForm } from './forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, FormsModule],
  templateUrl: './forms.component.html',
})
export class FormsComponent {
  forms: HOAForm[] = dummyForms;

  searchTerm = '';

    get filteredForms() {
    return this.forms.filter(form =>
      form.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
