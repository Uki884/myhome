import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body {
    font-family: Noto Sans + JP, serif;
    background: #fafafafa;
    margin: 0;
    color: #333333;
  }

  a {
    color: #333333;
    text-decoration: none;
  }

  .markdown-body {
    padding: 40px;
    @media screen and (max-width: 480px) {
      padding: 0;
    }
  }
`;