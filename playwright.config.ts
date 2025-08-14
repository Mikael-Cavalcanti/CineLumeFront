import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Configuração simplificada do Playwright para demonstração
 */
export default defineConfig({
  testDir: './tests',
  
  /* Configurações básicas */
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'line',
  
  /* Configurações do navegador */
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  /* Apenas Chrome para demonstração */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false, // Mostra o navegador
      },
    },
  ],
});