"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    const provider = {
        provideHover(document, position) {
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
    context.subscriptions.push(vscode.languages.registerHoverProvider(['javascript', 'typescript', 'python'], provider));
    const disposable = vscode.commands.registerCommand('extension.showExamples', () => __awaiter(this, void 0, void 0, function* () {
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
        const doc = yield vscode.workspace.openTextDocument({ content, language: 'javascript' });
        yield vscode.window.showTextDocument(doc, { preview: false });
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map