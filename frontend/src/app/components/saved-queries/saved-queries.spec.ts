import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedQueries } from './saved-queries';

describe('SavedQueries', () => {
  let component: SavedQueries;
  let fixture: ComponentFixture<SavedQueries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedQueries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedQueries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
