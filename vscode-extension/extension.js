'use strict';

const vscode = require('vscode');
const {
  validateEmail,
  isURL,
  generateOTP,
  generateRandomId,
  generatePassword,
  capitalize,
  removeDuplicates
} = require('codeeasekit');

function selectedText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) return '';
  return editor.document.getText(editor.selection);
}

async function replaceSelection(transform) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showWarningMessage('CodeEaseKit: Select some text first.');
    return;
  }
  const value = editor.document.getText(editor.selection);
  await editor.edit((builder) => builder.replace(editor.selection, transform(value)));
}

async function copyGenerated(label, value) {
  await vscode.env.clipboard.writeText(String(value));
  vscode.window.showInformationMessage(`CodeEaseKit: ${label} copied to clipboard — ${value}`);
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('codeeasekit.validateEmail', async () => {
      const value = selectedText() || await vscode.window.showInputBox({ prompt: 'Enter an email address to validate' });
      if (!value) return;
      const valid = validateEmail(value.trim());
      vscode.window.showInformationMessage(`CodeEaseKit: ${valid ? '✓ Valid' : '✗ Invalid'} email address`);
    }),

    vscode.commands.registerCommand('codeeasekit.validateURL', async () => {
      const value = selectedText() || await vscode.window.showInputBox({ prompt: 'Enter a URL to validate' });
      if (!value) return;
      const valid = isURL(value.trim());
      vscode.window.showInformationMessage(`CodeEaseKit: ${valid ? '✓ Valid' : '✗ Invalid'} URL`);
    }),

    vscode.commands.registerCommand('codeeasekit.generateOTP', async () => {
      const input = await vscode.window.showInputBox({ prompt: 'OTP length', value: '6' });
      if (input === undefined) return;
      const length = Number(input);
      if (!Number.isInteger(length) || length < 1 || length > 32) {
        vscode.window.showErrorMessage('CodeEaseKit: OTP length must be between 1 and 32.');
        return;
      }
      await copyGenerated('OTP', generateOTP(length));
    }),

    vscode.commands.registerCommand('codeeasekit.generatePassword', async () => {
      const input = await vscode.window.showInputBox({ prompt: 'Password length', value: '16' });
      if (input === undefined) return;
      const length = Number(input);
      if (!Number.isInteger(length) || length < 8 || length > 128) {
        vscode.window.showErrorMessage('CodeEaseKit: Password length must be between 8 and 128.');
        return;
      }
      await copyGenerated('Password', generatePassword(length));
    }),

    vscode.commands.registerCommand('codeeasekit.generateRandomId', async () => {
      const input = await vscode.window.showInputBox({ prompt: 'Random ID length', value: '12' });
      if (input === undefined) return;
      const length = Number(input);
      if (!Number.isInteger(length) || length < 1 || length > 128) {
        vscode.window.showErrorMessage('CodeEaseKit: ID length must be between 1 and 128.');
        return;
      }
      await copyGenerated('Random ID', generateRandomId(length));
    }),

    vscode.commands.registerCommand('codeeasekit.capitalizeSelection', () =>
      replaceSelection((value) => capitalize(value))
    ),

    vscode.commands.registerCommand('codeeasekit.removeDuplicateLines', () =>
      replaceSelection((value) => removeDuplicates(value.split(/\r?\n/)).join('\n'))
    )
  );

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
    {
      provideCompletionItems() {
        const utilities = [
          ['validateEmail', 'Validate an email address'],
          ['validatePhone', 'Validate a phone number'],
          ['validatePassword', 'Validate password strength'],
          ['isEmpty', 'Check whether a value is empty'],
          ['isURL', 'Validate a URL'],
          ['generateOTP', 'Generate a numeric OTP'],
          ['generateRandomId', 'Generate an alphanumeric ID'],
          ['generatePassword', 'Generate a secure password'],
          ['formatBytes', 'Format bytes as KB, MB, GB and more'],
          ['formatCurrency', 'Format a currency amount'],
          ['formatDate', 'Format a date'],
          ['capitalize', 'Capitalize text'],
          ['sleep', 'Wait asynchronously'],
          ['clamp', 'Clamp a number to a range'],
          ['removeDuplicates', 'Remove duplicate array values'],
          ['safeJSONParse', 'Safely parse JSON with a fallback']
        ];

        return utilities.map(([name, detail]) => {
          const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
          item.detail = `CodeEaseKit — ${detail}`;
          item.documentation = new vscode.MarkdownString(`Provided by **CodeEaseKit**.\n\n${detail}.`);
          return item;
        });
      }
    }
  );

  context.subscriptions.push(completionProvider);
}

function deactivate() {}

module.exports = { activate, deactivate };
