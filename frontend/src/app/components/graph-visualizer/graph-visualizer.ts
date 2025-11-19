import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-graph-visualizer',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './graph-visualizer.html',
  styleUrls: ['./graph-visualizer.css']
})
export class GraphVisualizerComponent implements OnChanges, AfterViewInit {
  @Input() data: any;
  @ViewChild('networkContainer') networkContainer!: ElementRef;

  private network: Network | undefined;

  ngAfterViewInit() {
    if (this.data) {
      this.renderGraph();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data && this.networkContainer) {
      this.renderGraph();
    }
  }

  private renderGraph() {
    if (!this.data || !this.data.results || !this.data.results.bindings) {
      return;
    }

    const bindings = this.data.results.bindings;
    const nodes = new DataSet<any>();
    const edges = new DataSet<any>();
    const nodeIds = new Set<string>();

    bindings.forEach((binding: any) => {
      const uris = Object.keys(binding).filter(k => binding[k].type === 'uri');

      // Add nodes
      uris.forEach(key => {
        const value = binding[key];
        if (!nodeIds.has(value.value)) {
          let label = value.value;
          // Try to find a label variable (e.g. itemLabel for item)
          const labelKey = key + 'Label';
          if (binding[labelKey]) {
            label = binding[labelKey].value;
          }

          nodes.add({ id: value.value, label: label });
          nodeIds.add(value.value);
        }
      });

      // Add edges
      if (uris.length >= 2) {
        for (let i = 0; i < uris.length - 1; i++) {
          // Simple linear connection between variables in the row
          edges.add({ from: binding[uris[i]].value, to: binding[uris[i + 1]].value });
        }
      }
    });

    const data = { nodes, edges };
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: {
          size: 12,
          face: 'Tahoma'
        }
      },
      edges: {
        width: 0.15,
        color: { inherit: 'from' },
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.5
        }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 150 }
      }
    };

    if (this.network) {
      this.network.destroy();
    }
    this.network = new Network(this.networkContainer.nativeElement, data, options);
  }
}
