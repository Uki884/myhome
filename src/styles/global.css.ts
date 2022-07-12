import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  fontFamily: "Noto Sans+JP, serif",
  background: '#FAFAFAFA',
});

globalStyle(".markdown-body", {
  padding: 40,
  "@media": {
    "screen and (max-width: 480px)": {
      padding: "20px",
    },
  },
});