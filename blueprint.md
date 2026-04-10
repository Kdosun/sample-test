# Blueprint: English Word Memorization App

## Project Overview
This project is a modern, framework-less English word memorization app. It allows users to input a list of words and then displays them one by one in a random order. A full cycle is completed when all words have been shown exactly once.

## Features & Implementation Detail
- **Word Input:** A simple and intuitive interface to add new English words to the session list.
- **Random Cycle Display:** Words are shuffled and shown one by one. No word repeats until the current cycle of all words is complete.
- **Modern UI/UX:**
  - Built with **Web Components** for encapsulation.
  - **OKLCH** color spaces for vibrant, consistent colors.
  - **Container Queries** for component-level responsiveness.
  - Smooth transitions and a premium "lifted" feel using layered drop shadows.
- **Progress Tracking:** Shows how many words have been seen out of the total in the current cycle.
- **Local State:** Words are stored in memory for the current session (future expansion to database/localStorage).

## Current Implementation Plan
1.  **Project Setup**:
    - Clear existing boilerplate and set up a clean structure.
2.  **Web Components**:
    - `word-memorizer`: The main component that manages word input, storage, and display logic.
3.  **Styling**:
    - Implement a global theme with `:root` variables using OKLCH.
    - Use `@container` for the component's responsiveness.
    - Add a subtle background texture and elegant shadows.
4.  **JavaScript Logic**:
    - Fisher-Yates shuffle algorithm for the "cycle" queue.
    - State management for the current word index and total count.
5.  **Verification**:
    - Ensure words don't repeat until the cycle is complete.
    - Test responsiveness on mobile and desktop.

## Project Outline
- `index.html`: Entry point and main container.
- `style.css`: Global styles, themes, and base layout.
- `main.js`: Web Component definitions and app logic.
- `blueprint.md`: This documentation.
