import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Menubar],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Wimbledon Village HOA';

  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: '/calendar' },
    { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: '/forms' },
    { label: 'Meeting Minutes', icon: 'pi pi-fw pi-book', routerLink: '/meeting-minutes' },
    { label: 'Governance', icon: 'pi pi-fw pi-shield', routerLink: '/governance' },
  ]

  redirectToHome() {
    window.location.href = '/home';
  }
}
