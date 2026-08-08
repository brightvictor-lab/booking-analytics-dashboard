import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool that runs the app in dev and bundles it for production.
// The react() plugin lets Vite understand JSX (the HTML-in-JavaScript React uses).
export default defineConfig({
  plugins: [react()],
})
