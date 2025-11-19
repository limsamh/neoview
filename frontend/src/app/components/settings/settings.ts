import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SettingsData {
  endpoint: string;
  useLocal: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent {
  endpoint: string = 'https://query.wikidata.org/sparql';
  useLocal: boolean = false;

  selectedFile: File | null = null;
  uploading: boolean = false;
  uploadSuccess: string = '';
  uploadError: string = '';

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsData,
    private apiService: ApiService
  ) {
    if (data) {
      this.endpoint = data.endpoint;
      this.useLocal = data.useLocal;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    this.uploadSuccess = '';
    this.uploadError = '';
  }

  onUpload() {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.uploadSuccess = '';
    this.uploadError = '';

    this.apiService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.uploading = false;
        this.uploadSuccess = res.message;
        this.useLocal = true; // Auto-switch to local
      },
      error: (err) => {
        this.uploading = false;
        this.uploadError = err.error?.detail || 'Upload failed';
      }
    });
  }

  onSave() {
    this.dialogRef.close({
      endpoint: this.endpoint,
      useLocal: this.useLocal
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
