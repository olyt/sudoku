import 'styled-components';
import { IPalette } from './palettes';

type TBreakpoint = `${number}px`;

declare module 'styled-components' {
    export interface DefaultTheme extends IPalette {
        breakpoints: {
            [Key: string]: TBreakpoint;
        };
    }
}
