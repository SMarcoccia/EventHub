import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src/'),
            '@components': resolve(__dirname, "./src/components/"),
            '@pages': resolve(__dirname, "./src/pages/"),
            '@utils': resolve(__dirname, "./src/utils"),
            '@admin': resolve(__dirname, "./src/pages/admin/"),
            '@public': resolve(__dirname, "./src/pages/public"),
            '@user': resolve(__dirname, "./src/pages/user"),
        },
    },
})
