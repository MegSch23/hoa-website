import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormsComponent } from './pages/forms/forms.component';
import { GovernanceComponent } from './pages/governance/governance.component';
import { HoaBylawsComponent } from './pages/governance/hoa-bylaws/hoa-bylaws.component';
import { BoardMeetingMinutesComponent } from './pages/governance/board-meeting-minutes/board-meeting-minutes.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'calendar', component: CalendarComponent, title: 'Calendar'},
    {path: 'forms', component: FormsComponent, title: 'Forms'},
    {path: 'governance', component: GovernanceComponent, title: 'Governance'},
    {path: 'governance/hoa-bylaws', component: HoaBylawsComponent, title: 'HOA Bylaws'},
    {path: 'governance/hoa-meeting-minutes', component: BoardMeetingMinutesComponent, title: 'HOA Meeting Minutes'},
    {path: '**', redirectTo: 'home'}, // Redirect to home for any unknown routes

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}