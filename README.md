# EVAA profit calculator

- [Web version of profit calculator](https://evaa-test-task.netlify.app/)
- [Telegram app](https://t.me/evaa_tma_bot/evaa_app)
- [Telegram bot](t.me/evaa_tma_bot)

## Prerequisites

Before running the frontend, ensure you have the following installed:

- Node.js
- NPM

## Recommended VS Code Settings

```json
{
  // Files
  "files.trimTrailingWhitespace": true,
  "files.autoSave": "onFocusChange",
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,

  // Tailwind
  "tailwindCSS.classAttributes": ["className", ".*CLASSES"],

  "files.associations": {
    "*.css": "tailwindcss"
  },

  "editor.quickSuggestions": {
    "strings": "on"
  },

  // Editor
  "editor.codeActionsOnSave": { "source.fixAll": "explicit" },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2
}
```

## Recommended VS Code Extensions

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Getting Started

To run the frontend, follow these steps:

1. Clone this repository.
2. Install dependencies by running `npm i`.
3. Create `.env` file using `.env.example` as a template.
4. Run the app by executing `npm run dev`.

The app should now be running at http://localhost:5173/.

## Scripts

- `test:playwright` - run playwright tests.
- `dev` - run the development server.
- `lint` - lint code with ESLint.
- `build` - build project.
