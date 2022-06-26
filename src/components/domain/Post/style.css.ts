import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  maxWidth: 1280,
  margin: "0px auto",
  paddingTop: '2.5rem',
});

export const date = style({
  fontSize: '1rem',
  textAlign: 'center',
  lineHeight: '150%'
})


export const title = style({
  fontSize: "3rem",
  textAlign: "center",
  lineHeight: "200%",
  borderBottom: "solid 1px #eaeaea",
});

export const section = style({
  margin: '24px 0px',
})

export const image = style({
  width: '100%',
  height: '400px',
  objectFit: 'contain'
})