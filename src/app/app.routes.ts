import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormsComponent } from './pages/forms/forms.component';
import { MeetingMinutesComponent } from './pages/meeting-minutes/meeting-minutes.component';
import { GovernanceComponent } from './pages/governance/governance.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'calendar', component: CalendarComponent, title: 'Calendar'},
    {path: 'forms', component: FormsComponent, title: 'Forms'},
    {path: 'meeting-minutes', component: MeetingMinutesComponent, title: 'Meeting Minutes'},
    {path: 'governance', component: GovernanceComponent, title: 'Governance'},
    {path: '**', redirectTo: 'home'}, // Redirect to home for any unknown routes

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}