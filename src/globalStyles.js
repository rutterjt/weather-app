import { createGlobalStyle } from 'styled-components';

const CSSReset = createGlobalStyle`
  :root {
    box-sizing: border-box;
    font-size: 18px;
    line-height: 1.5;

    --x-padding: 1.5rem;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Nunito, sans-serif;
    font-weight: 800;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    background: transparent;
    border: none;
    line-height: inherit;
    font-family: inherit;
    font-size: 100%;
    color: inherit;
    font-weight: inherit;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    :root {
      --x-padding: 2rem;
    }
  }
`;

export default CSSReset;
