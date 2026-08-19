# CodeEaseKit for VS Code

CodeEaseKit brings the CodeEaseKit JavaScript utility library directly into Visual Studio Code.

## Features

- Command Palette developer utilities
- Right-click validation and text tools
- JavaScript/TypeScript IntelliSense for CodeEaseKit utilities
- Ready-to-use CodeEaseKit snippets
- OTP, password and random ID generation with clipboard support

## Commands

Open the Command Palette with `Ctrl+Shift+P` and search for `CodeEaseKit`.

- CodeEaseKit: Validate Email
- CodeEaseKit: Validate URL
- CodeEaseKit: Generate OTP
- CodeEaseKit: Generate Password
- CodeEaseKit: Generate Random ID
- CodeEaseKit: Capitalize Selected Text
- CodeEaseKit: Remove Duplicate Lines

## Right-click tools

Select text in the editor and right-click to access CodeEaseKit email validation, URL validation, capitalization and duplicate-line removal.

## Snippets

In JavaScript, TypeScript, JSX or TSX files, type:

- `cek-import`
- `cek-email`
- `cek-otp`
- `cek-password`
- `cek-json`
- `cek-clamp`

## Development

```bash
cd vscode-extension
npm install
```

Open the `vscode-extension` folder in VS Code and press `F5` to launch an Extension Development Host.

## Packaging

```bash
npm run package
```

This creates a `.vsix` package that can be installed locally or prepared for publishing to the Visual Studio Marketplace.

## Core library

The extension uses the public `codeeasekit` npm package as its utility engine.

## License

MIT
