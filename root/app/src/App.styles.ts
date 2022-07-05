import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';

export const GlobalStyle = createGlobalStyle<ThemeProps<DefaultTheme>>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    overflow-x: hidden;
    ${({ theme }: ThemeProps<DefaultTheme>): FlattenSimpleInterpolation => css`
      background: ${theme.palette.gray['50']};
      color: ${theme.palette.gray['900']};
    `}
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    text-align: left;
  }

  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: bolder;
  }

  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }

  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):hover {
    color: inherit;
    text-decoration: none;
  }

  figure {
    margin: 0 0 1rem;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
  }

  th {
    text-align: inherit;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  button {
    border-radius: 0;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  select {
    word-wrap: normal;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  button:not(:disabled),
  [type='button']:not(:disabled),
  [type='reset']:not(:disabled),
  [type='submit']:not(:disabled) {
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }

  input[type='radio'],
  input[type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  ::-webkit-file-upload-button {
    font: inherit;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
`;

export const AppStyled = styled.div`
  text-align: center;
`;

export const AppWalletButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
