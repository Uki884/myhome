import { css } from "@emotion/react";

export const globalStyles = css`
  html, body {
    font-family: Noto Sans+JP, serif;
    background: #FAFAFAFA;
  }

  .markdown-body {
    padding: 40px;
    @media screen and (max-width: 480px) {
      padding: 20px;
    }
  }
`;