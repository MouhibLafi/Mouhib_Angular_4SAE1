# Visual Studio IntelliCode — API Usage Examples (summary & guide)

This document summarizes the IntelliCode "API Usage Examples" feature, explains how to use it, and provides a small prototype and a mock backend you can use to explore the behaviour locally.

## Summary

IntelliCode API Usage Examples surfaces real-world code snippets from public GitHub repositories that show how a particular API or function is used. When supported, the feature appears in the hover window for a function call and provides a link labelled "See Real World Examples From GitHub". Clicking the link opens a results view showing grouped example usages and a highlighted API usage.

The feature currently supports Python, JavaScript and TypeScript (including JSX/TSX).

## How it works (high level)

- A mapping is created from function names to code snippets by scanning public GitHub repositories.
- When you hover a function call in the editor the extension sends only the function name(s) to the web service which returns example snippets for supported APIs.
- The results view groups examples and includes a link back to the GitHub source for each snippet.

Privacy note: only public repository data and public function names are used. The feature does not send your private or workspace-local function names to the service.

## What's included in this repository

- `tools/vscode-intellicode-prototype/` — a minimal VS Code extension prototype that registers a hover provider and a command to open mocked example snippets in a new untitled editor.
- `tools/backend/` — a tiny mock Express server that returns example snippets. It's intentionally small and mockable; it includes guidance on how to call the GitHub Search API if you want to expand it.

## Quick start

1. Prototype extension

   - Open `tools/vscode-intellicode-prototype` in VS Code.
   - Run `npm install` then `npm run compile`.
   - Press F5 to launch the Extension Development Host. Open a `.js`, `.ts`, or `.py` file, hover a function call and click the "See Real World Examples From GitHub" link in the hover.

2. Backend (mock)

   - Open `tools/backend`.
   - Run `npm install` then `npm start` to run the mock server on port 4000.
   - The endpoint `GET /examples?q=FUNCTION_NAME` returns JSON with mocked example usage entries.

## Extending this prototype

- Replace the extension's hard-coded example payload with a call to the provided mock backend, or your own search service.
- To build a production-grade indexer, use the GitHub Search API and implement safe rate-limiting and caching. Do not index private repos without explicit consent.

## Feedback and next steps

If you want, I can:

- Expand the prototype to call the mock backend with the hovered symbol and show grouped results.
- Add a small UI panel showing grouped examples rather than an untitled editor.
- Provide an example GitHub-indexing script (with opt-in token and rate limits) to populate example data.

Tell me which of the above you want next.
