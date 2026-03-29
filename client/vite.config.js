import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT ?? 5173),
            proxy: {
                '/api': {
                    target: env.VITE_SERVER_URL ?? 'http://localhost:5000',
                    changeOrigin: true,
                },
                '/socket.io': {
                    target: env.VITE_SERVER_URL ?? 'http://localhost:5000',
                    ws: true,
                },
            },
        },
        build: {
            sourcemap: true,
        },
    };
});
