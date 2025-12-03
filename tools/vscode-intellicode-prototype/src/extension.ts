import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const provider: vscode.HoverProvider = {
    provideHover(document: vscode.TextDocument, position: vscode.Position) {
      const range = document.getWordRangeAtPosition(position);
      if (!range) {
        return undefined;
      }
      const word = document.getText(range);

      const md = new vscode.MarkdownString();
      md.appendText('IntelliCode API Usage Examples\n\n');
      md.appendText('Click the link below to see real-world examples from GitHub.');
      md.appendMarkdown('\n\n[See Real World Examples From GitHub](command:extension.showExamples)');
      // Allow command links
      md.isTrusted = true;

      return new vscode.Hover(md, range);
    }
  };

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(['javascript', 'typescript', 'python'], provider)
  );

  const disposable = vscode.commands.registerCommand('extension.showExamples', async () => {
    const examples = [
      {
        repo: 'microsoft/some-repo',
        file: 'src/example.js',
        snippet: `// Example usage\nconst result = myApi.call('arg1');\nconsole.log(result);`
      },
      {
        repo: 'community/lib',
        file: 'lib/usage.ts',
        snippet: `// Another example\nimport { myApi } from 'lib';\nmyApi.doSomething(42);`
      }
    ];

    const content = examples.map((e, i) => `--- Example ${i + 1} ---\nRepository: ${e.repo}\nFile: ${e.file}\n\n${e.snippet}`).join('\n\n');

    const doc = await vscode.workspace.openTextDocument({content, language: 'javascript'});
    await vscode.window.showTextDocument(doc, {preview: false});
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
