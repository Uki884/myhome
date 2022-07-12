import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  maxWidth: 1280,
  margin: "40px auto",
  paddingTop: "2.5rem",
  padding: "0 60px",
  display: 'flex',
  gap: 40,
  flexWrap: 'wrap',
  minHeight: 'calc(100vh - 80px)'
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
});