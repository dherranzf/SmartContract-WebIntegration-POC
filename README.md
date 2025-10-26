# CriptoMoonToken Project

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   - VITE_CONTRACT_ADDRESS
   - VITE_BASE_CHAIN_ID
3. Run the app:
   ```bash
   npm run dev
   ```

## Structure
- `src/components`: UI components
- `src/styles`: CSS files
- `src/hooks`: Custom React hooks
- `src/services`: Blockchain/API logic
- `src/walletUtils.js`: Wallet connection logic
- `src/mintUtils.js`: Minting logic
- `src/networkUtils.js`: Network switching logic

## Linting & Formatting
- ESLint and Prettier are recommended for code quality.

## Testing
- Add tests in `src/__tests__` or `src/tests`.