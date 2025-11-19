import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryEditorComponent } from './components/query-editor/query-editor';
import { GraphVisualizerComponent } from './components/graph-visualizer/graph-visualizer';
import { SavedQueriesComponent } from './components/saved-queries/saved-queries';
import { ResultTableComponent } from './components/result-table/result-table';
import { ApiService, SavedQuery } from './services/api';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SettingsComponent } from './components/settings/settings';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    QueryEditorComponent,
    GraphVisualizerComponent,
    SavedQueriesComponent,
    ResultTableComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  graphData: any;
  viewMode: 'graph' | 'table' = 'graph';

  selectedQueryString: string = '';
  selectedQueryName: string = '';
  selectedQueryDescription: string = '';

  // Data Source Configuration
  endpoint: string = 'https://query.wikidata.org/sparql';
  useLocal: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    public themeService: ThemeService
  ) { }

  onRunQuery(query: string) {
    this.apiService.runQuery(query, this.endpoint, this.useLocal).subscribe({
      next: (data) => {
        this.graphData = data;
      },
      error: (err) => {
        console.error('Query failed', err);
        alert('Query failed: ' + (err.error?.detail || err.message));
      }
    });
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
      data: { endpoint: this.endpoint, useLocal: this.useLocal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.endpoint = result.endpoint;
        this.useLocal = result.useLocal;
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onSaveQuery(data: { name: string, query: string, description: string }) {
    this.apiService.saveQuery(data).subscribe({
      next: (saved) => {
        alert('Query saved!');
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Save failed: ' + err.message);
      }
    });
  }

  onSelectQuery(query: SavedQuery) {
    this.selectedQueryString = query.query;
    this.selectedQueryName = query.name;
    this.selectedQueryDescription = query.description || '';
  }
}
