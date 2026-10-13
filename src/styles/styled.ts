import styled from 'styled-components/native';
import { Theme } from './theme';

export { styled };
export { ThemeProvider } from 'styled-components/native';

// Hook tipado para acessar o tema nos componentes
export { useTheme } from 'styled-components/native';

// Declaração de módulo para tipar o DefaultTheme
declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
