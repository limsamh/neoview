import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './result-table.html',
  styleUrls: ['./result-table.css']
})
export class ResultTableComponent implements OnChanges {
  @Input() data: any;

  headers: string[] = [];
  rows: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.processData();
    }
  }

  private processData() {
    if (!this.data || !this.data.head || !this.data.head.vars || !this.data.results || !this.data.results.bindings) {
      this.headers = [];
      this.rows = [];
      return;
    }

    this.headers = this.data.head.vars;
    this.rows = this.data.results.bindings;
  }

  getValue(row: any, header: string): string {
    if (row[header]) {
      return row[header].value;
    }
    return '';
  }
}
