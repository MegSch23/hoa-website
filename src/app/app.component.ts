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
    { label: 'Communications', icon: 'pi pi-fw pi-comment', routerLink: '/communications' },
    { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: '/forms' },
    
    { label: 'Governance', icon: 'pi pi-fw pi-shield', items: [
      { label: 'Governance Home', icon: 'pi pi-fw pi-book', routerLink: '/governance' },
      { label: 'Board Meeting Minutes', icon: 'pi pi-fw pi-file', routerLink: '/governance/hoa-meeting-minutes' },
      { label: 'HOA Bylaws', icon: 'pi pi-fw pi-hammer', routerLink: '/governance/hoa-bylaws' },
    ] },
  ]

  redirectToHome() {
    window.location.href = '/home';
  }
}
