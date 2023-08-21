import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body {
    font-family: Noto Sans + JP, serif;
    background: #fafafafa;
    margin: 0;
    color: #333333;
  }

  .markdown-body {
    padding: 0 40px;
    letter-spacing: 0.1rem;
    img {
      object-fit: contain;
      height: 100%;
    }
    @media screen and (max-width: 480px) {
      padding: 0;
    }
  }
`;