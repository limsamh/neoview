import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(false);

    constructor() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.darkMode.set(savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.darkMode.set(prefersDark);
        }

        // Apply theme effect
        effect(() => {
            const isDark = this.darkMode();
            console.log('Theme effect running. isDark:', isDark);
            if (isDark) {
                document.documentElement.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    toggleTheme() {
        console.log('Toggling theme. Current:', this.darkMode());
        this.darkMode.update(d => !d);
    }
}
