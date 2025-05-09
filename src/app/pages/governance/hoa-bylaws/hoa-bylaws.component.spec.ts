import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaBylawsComponent } from './hoa-bylaws.component';

describe('HoaBylawsComponent', () => {
  let component: HoaBylawsComponent;
  let fixture: ComponentFixture<HoaBylawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoaBylawsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoaBylawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
