/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import svgr from 'vite-plugin-svgr';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig(({ mode }) => ({
    base: '/sudoku/',
    build: {
        target: browserslistToEsbuild(),
    },
    plugins: [
        react(),
        // The compiler's generated memo-cache branches map back to source
        // lines as phantom coverage gaps, so it stays out of test builds.
        ...(mode === 'test'
            ? []
            : [
                  babel({
                      presets: [reactCompilerPreset()],
                  }),
              ]),
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
                'src/index.tsx',
                'src/App.tsx',
                'src/GlobalStyles.ts',
                'src/vite-env.d.ts',
                'src/@types/**',
                'src/theming/**',
                'src/components/Buttons/**',
                'src/components/Cells/DigitCell.tsx',
                'src/components/DifficultyBlock/**',
                'src/components/GeneratorsBlock/**',
                'src/components/Grids/DigitsGrid.tsx',
                'src/components/Header/**',
                'src/components/Modal/**',
                'src/components/WinBanner/**',
                'src/hooks/**',
                'src/constants/**',
                'src/context/AppContext.tsx',
                'src/context/mainReducer.ts',
                'src/context/state.ts',
                'src/context/types.ts',
                'src/utils/svgHelper.ts',
            ],
            reporter: ['text', 'html'],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
}));
