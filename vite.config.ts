/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: '/sudoku/',
    plugins: [
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        svgr(),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'src/react-app-env.d.ts',
                'src/index.tsx',
                'src/App.tsx',
                'src/GlobalStyles.ts',
                'src/vite-env.d.ts',
                'src/@types/**',
                'src/theming/**',
                'src/components/**',
                'src/hooks/**',
                'src/constants/**',
                'src/context/AppContext.tsx',
                'src/context/mainReducer.ts',
                'src/context/state.ts',
                'src/context/types.ts',
                'src/utils/svgHelper.ts',
            ],
            reporter: ['text', 'html'],
            thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
        },
    },
});
