import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphVisualizer } from './graph-visualizer';

describe('GraphVisualizer', () => {
  let component: GraphVisualizer;
  let fixture: ComponentFixture<GraphVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
