# Contributing to Topdo

Thanks for your interest in contributing.

## Development Setup

1. Install dependencies:
   - Node.js 18+
   - pnpm 10+
   - Rust stable
   - Xcode Command Line Tools
2. Install packages:
   ```bash
   pnpm install
   ```
3. Run app in dev mode:
   ```bash
   pnpm tauri dev
   ```

## Pull Request Guidelines

1. Create a branch from `main`.
2. Keep PR scope focused and include clear description.
3. Include screenshots for UI changes.
4. Verify:
   - App starts successfully.
   - Main flows (create task, switch status, settings save) still work.
5. Open PR to `main`.

## Commit Message

Use concise prefixes such as:
- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `chore:`

