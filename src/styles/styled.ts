import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body {
    font-family: Noto Sans + JP, serif;
    background: #fafafafa;
    margin: 0;
  }

  .markdown-body {
    padding: 40px;
    @media screen and (max-width: 480px) {
      padding: 0;
    }
  }
`;