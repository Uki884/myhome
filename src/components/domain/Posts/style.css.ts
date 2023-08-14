import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  maxWidth: 1280,
  padding: "120px 60px",
  display: "flex",
  margin: '0 auto',
  gap: 40,
  "@media": {
    "screen and (max-width: 480px)": {
      padding: "0 16px",
    },
  },
  height: '100vh',
});

export const date = style({
  fontSize: 12,
  textAlign: 'center',
  lineHeight: '150%',
  position: 'absolute',
  bottom: 16,
  right: 16,
})

export const title = style({
  fontSize: 24,
  padding: 16
});

export const section = style({
  margin: '24px 0px',
})

export const image = style({
  width: "100%",
  height: "200px",
  objectFit: "contain",
  borderBottom: "1px solid #eaeaea",
  padding: 14,
  "@media": {
    "screen and (max-width: 480px)": {
      height: 160,
    },
  },
});