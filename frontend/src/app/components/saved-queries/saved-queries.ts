import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, SavedQuery } from '../../services/api';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-saved-queries',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './saved-queries.html',
  styleUrls: ['./saved-queries.css']
})
export class SavedQueriesComponent implements OnInit {
  queries: SavedQuery[] = [];
  @Output() selectQuery = new EventEmitter<SavedQuery>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadQueries();
  }

  loadQueries() {
    this.apiService.getSavedQueries().subscribe(queries => {
      this.queries = queries;
    });
  }

  onSelect(query: SavedQuery) {
    this.selectQuery.emit(query);
  }
}
