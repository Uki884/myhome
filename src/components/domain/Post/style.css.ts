import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  maxWidth: 1280,
  padding: "120px 60px",
  margin: "0 auto",
  gap: 40,
  "@media": {
    "screen and (max-width: 480px)": {
      padding: "0 16px",
    },
  },
  minHeight: "100vh",
  position: 'relative'
});

export const date = style({
  fontSize: '1rem',
  textAlign: 'center',
  lineHeight: '150%',
  fontWeight: 300,
})

export const title = style({
  fontSize: "3rem",
  textAlign: "center",
  lineHeight: "200%",
  "@media": {
    "screen and (max-width: 480px)": {
      fontSize: "2rem",
      padding: '0 8px'
    },
  },
});

export const titleWrapper = style({
  borderBottom: "solid 1px #eaeaea",
});

export const tags = style({
  fontSize: 12,
  textAlign: 'center',
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'center',
  gap: 6
})

export const tag = style({
  fontSize: 12,
  border: '1px solid #5c93bb2b',
  borderRadius: '2.5em',
  padding: '0 14px',
  cursor: 'pointer'
});

export const section = style({
  margin: "24px 0px",
  padding: "0 60px 60px 0",
  "@media": {
    "screen and (max-width: 480px)": {
      padding: "0 16px",
    },
  },
});

export const image = style({
  width: "100%",
  height: "400px",
  objectFit: "contain",
  marginBottom: 20,
  "@media": {
    "screen and (max-width: 480px)": {
      height: "200px",
    },
  },
});