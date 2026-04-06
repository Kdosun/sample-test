# Blueprint: Lotto Generator with Light/Dark Mode

## Project Overview
This project is a simple, modern Lotto Number Generator built with vanilla HTML, CSS, and JavaScript. It adheres to Baseline web standards and uses modern CSS features like CSS Variables and OKLCH color spaces.

## Features & Implementation Detail
- **Lotto Generation:** Uses `Math.random` to generate unique numbers (1-45).
- **Modern UI:** Styled with CSS Variables for theme consistency.
- **Theme Switching:** Supports light and dark modes with persistent user preferences.
- **Analytics:** Integrated Google Analytics (gtag.js) for visitor tracking.
- **Responsive Layout:** Works on various screen sizes.

## Current Implementation Plan
1.  **CSS Theming**:
    - Define `:root` with light theme variables.
    - Define `[data-theme="dark"]` with dark theme variables.
    - Use `oklch()` for vibrancy and `transition` for smooth theme changes.
2.  **Toggle Component**:
    - Add a `<button id="theme-toggle">` in `index.html`.
3.  **JavaScript Logic**:
    - Implement `initTheme()` and `toggleTheme()` in `main.js`.
    - Persist theme preference in `localStorage`.
4.  **Deployment**:
    - Commit all changes to the Git repository.

## Project Outline
- `index.html`: Main structure and UI components.
- `style.css`: All styles, including theme definitions.
- `main.js`: Lotto logic and theme switching logic.
- `blueprint.md`: This file, documenting project state and plans.
