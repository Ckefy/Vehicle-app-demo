import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCardTileComponent } from './driver-card-tile.component';

describe('DriverCardComponent', () => {
  let component: DriverCardTileComponent;
  let fixture: ComponentFixture<DriverCardTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCardTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
