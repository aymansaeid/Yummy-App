import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "finalproject.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

let httpsConfig = false; // Default to HTTP if certificate generation fails

try {
    // Check if the certificate files exist
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        // Attempt to generate the certificate
        const result = child_process.spawnSync('dotnet', [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
        ], { stdio: 'inherit' });

        if (result.status !== 0) {
            console.warn("Failed to generate HTTPS certificate. Falling back to HTTP.");
        }
    }

    // If certificate files are now available, set up HTTPS
    if (fs.existsSync(certFilePath) && fs.existsSync(keyFilePath)) {
        httpsConfig = {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        };
    }
} catch (error) {
    console.warn("Error setting up HTTPS. Falling back to HTTP.", error);
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:7011';

// Export Vite configuration
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false, // Disable certificate verification for proxy requests
            },
        },
        port: 5173,
        https: httpsConfig, // Use HTTPS if available, otherwise fallback to HTTP
    },
});
