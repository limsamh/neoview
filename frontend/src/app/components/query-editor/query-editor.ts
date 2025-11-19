import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-query-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './query-editor.html',
  styleUrls: ['./query-editor.css']
})
export class QueryEditorComponent {
  @Input() query: string = `SELECT ?item ?itemLabel WHERE {
  ?item wdt:P31 wd:Q146.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
} LIMIT 10`;
  @Input() queryName: string = '';
  @Input() description: string = '';

  @Output() runQuery = new EventEmitter<string>();
  @Output() saveQuery = new EventEmitter<{ name: string, query: string, description: string }>();

  onRun() {
    this.runQuery.emit(this.query);
  }

  onSave() {
    if (this.queryName && this.query) {
      this.saveQuery.emit({
        name: this.queryName,
        query: this.query,
        description: this.description
      });
    }
  }
}
