import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src/'),
            '@assets': resolve(__dirname, "./src/_assets"),
            '@helpers': resolve(__dirname, "./src/_helpers"),
            '@services': resolve(__dirname, "./src/_services"),
            '@utils': resolve(__dirname, "./src/_utils"),
            '@components': resolve(__dirname, "./src/components/"),
            '@pages': resolve(__dirname, "./src/pages/"),
            '@admin': resolve(__dirname, "./src/pages/admin/"),
            '@public': resolve(__dirname, "./src/pages/public"),
            '@user': resolve(__dirname, "./src/pages/user"),
            '@auth': resolve(__dirname, "./src/pages/auth"),
            '@img': resolve(__dirname, "./public/img"),
        },
    },
})
