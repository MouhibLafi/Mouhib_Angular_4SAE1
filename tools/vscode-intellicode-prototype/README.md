# IntelliCode API Examples — Prototype extension

This prototype registers a hover provider on `javascript`, `typescript` and `python`. The hover displays a short note and a link `See Real World Examples From GitHub`.

Clicking the link triggers the `extension.showExamples` command which opens an untitled editor populated with mocked examples.

How to run

1. From the `tools/vscode-intellicode-prototype` folder run `npm install`.
2. Run `npm run compile` to compile TypeScript to `out/`.
3. Open the folder in VS Code and press F5 to run the extension in a new Extension Development Host.
