import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  maxWidth: 1280,
  margin: "0px auto",
  paddingTop: '2.5rem',
});

export const image = style({
  width: '100%',
  height: '400px',
  objectFit: 'contain'
})