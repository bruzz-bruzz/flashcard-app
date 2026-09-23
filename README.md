# Flashcard App (flashcard-v2)

A simple browser-based flashcard app built with Vite + React + TypeScript.

Features
- Load flashcards from a `.txt` or `.json` file.
- Shuffle, navigate, and reveal answers.
- Configurable keyboard keybinds stored in cookies.
- Offline Support: Can be used without an internet connection after the first load.


File formats
- TXT: plain-text file with alternating lines for question and answer. Example:

  Question 1
  Answer 1
  Question 2
  Answer 2

- JSON: object mapping questions to answers, e.g. `{ "What is 2+2?": "4" }`.

Prerequisites
- Node.js 16+ (recommended 18+)
- npm or yarn

Setup (frontend)

1. Open a terminal and enter the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
# yarn
```

3. Run the dev server:

```bash
npm run dev
# or
# yarn dev
```

Build for production

```bash
cd frontend
npm run build
```

Usage
- Open the app in the browser (Vite dev URL).
- Click the file input to load a `.txt` or `.json` of flashcards.
- Use the on-screen controls or configured keybinds to navigate and reveal answers.
- Open "Config" to change keybinds; values are saved in cookies.

Important files
- `frontend/src/components/App.tsx` — main UI and logic for handling files, cards, and keybinds.
- `frontend/package.json` — scripts and dependencies.

Contributing
- Feel free to open PRs or issues on the repository.

License
- MIT
